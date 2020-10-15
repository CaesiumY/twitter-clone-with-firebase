import Tweet from "components/Tweet";
import React, { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

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

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="Tweet" />
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
