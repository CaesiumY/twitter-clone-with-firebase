import React, { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");

  const onChange = (e) => {
    const { value } = e.target;

    setTweet(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("tweet:", tweet);
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
    </>
  );
};

export default Home;
