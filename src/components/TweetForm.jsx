import { dbService, storageService } from "firebaseConfig";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const TweetForm = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onChange = (e) => {
    const { value } = e.target;

    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";

    if (attachment) {
      const ref = storageService.ref().child(`${userObj.uid}/${uuid()}`);
      const response = await ref.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      uid: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("tweets").add(tweetObj);

    setTweet("");
    setAttachment(null);
  };

  const onChangeFile = (e) => {
    const { files } = e.target;

    const myFile = files[0];

    if (!myFile) return;

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.target;

      setAttachment(result);
    };

    reader.readAsDataURL(myFile);
  };

  const onClearAttachment = () => setAttachment(null);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={tweet}
          onChange={onChange}
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          name=""
          id=""
          onChange={onChangeFile}
        />

        <input type="submit" value="Tweet" />

        {attachment && (
          <div>
            <img src={attachment} alt="tweet_image" width={50} height={50} />
            <button onClick={onClearAttachment}>clear</button>
          </div>
        )}
      </form>
    </>
  );
};

export default TweetForm;
