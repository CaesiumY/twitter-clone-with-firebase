import React, { useEffect, useState } from "react";
import { dbService } from "firebaseConfig";
import Tweet from "components/Tweet";
import ProfileForm from "components/ProfileForm";

const Profile = ({ userObj, onRefreshUser }) => {
  const [myTweets, setMyTweets] = useState([]);

  useEffect(() => {
    const getMyTweets = async () => {
      const tweets = await dbService
        .collection("tweets")
        .where("uid", "==", userObj.uid)
        .orderBy("createdAt")
        .get();

      const tweetData = tweets.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyTweets(tweetData);
    };

    getMyTweets();
  }, [userObj]);

  return (
    <div className="container">
      <ProfileForm
        userObj={userObj}
        onRefreshUser={onRefreshUser}
      ></ProfileForm>

      {myTweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetObj={tweet}
          isOwner={tweet.uid === userObj.uid}
        ></Tweet>
      ))}
    </div>
  );
};

export default Profile;
