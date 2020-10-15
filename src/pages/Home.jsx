import React, { useEffect, useState } from "react";
import { dbService } from "../firebaseConfig";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    const tweetData = await dbService.collection("tweets").get();

    tweetData.forEach((tweetItem) => {
      const tweetObj = {
        id: tweetItem.id,
        ...tweetItem.data(),
      };

      setTweets((prev) => [tweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getTweets();
  }, []);

  const onChange = (e) => {
    const { value } = e.target;

    setTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
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

      {tweets.map((item) => (
        <div key={item.id}>
          <h4>{item.tweet}</h4>
        </div>
      ))}
    </>
  );
};

export default Home;
