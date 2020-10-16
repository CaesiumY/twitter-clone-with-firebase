import Tweet from "components/Tweet";
import React, { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection("tweets").onSnapshot((snapshots) => {
      const tweetData = snapshots.docs.map((snapshot) => ({
        id: snapshot.id,
        ...snapshot.data(),
      }));

      setTweets(tweetData);
    });
  }, []);

  const onChange = (e) => {
    const { value } = e.target;

    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      uid: userObj.uid,
    });

    setTweet("");
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

      {tweets.map((tweetObj) => (
        <Tweet
          key={tweetObj.id}
          tweetObj={tweetObj}
          isOwner={tweetObj.uid === userObj.uid}
        ></Tweet>
      ))}
    </>
  );
};

export default Home;
