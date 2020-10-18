import React, { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";
import Tweet from "components/Tweet";
import TweetForm from "components/TweetForm";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshots) => {
        const tweetData = snapshots.docs.map((snapshot) => ({
          id: snapshot.id,
          ...snapshot.data(),
        }));

        setTweets(tweetData);
      });
  }, []);

  return (
    <>
      <TweetForm userObj={userObj}></TweetForm>
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
