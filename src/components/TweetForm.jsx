import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    if (tweet === "") return;
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
    setAttachment("");
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

  const onClearAttachment = () => setAttachment("");
  return (
    <>
      <form onSubmit={onSubmit} className="tweetForm">
        <div className="tweetInput__container">
          <input
            className="tweetInput__input"
            type="text"
            placeholder="What's on your mind?"
            value={tweet}
            onChange={onChange}
            maxLength={120}
          />

          <input type="submit" value="&rarr;" className="tweetInput__arrow" />
        </div>

        <label htmlFor="attach-file" className="tweetInput__label">
          <span>Add Photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onChangeFile}
          style={{ opacity: 0 }}
        />
        {attachment && (
          <div className="tweetInput__attachment">
            <img
              src={attachment}
              style={{ backgroundImage: attachment }}
              alt={tweet}
            />
            <div className="tweetInput__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default TweetForm;
