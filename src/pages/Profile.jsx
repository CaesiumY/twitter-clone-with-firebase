import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "firebaseConfig";
import Tweet from "components/Tweet";

const Profile = ({ userObj, onRefreshUser }) => {
  const [myTweets, setMyTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName || userObj.email.split("@")[0]
  );
  const history = useHistory();

  const onSignOut = async () => {
    await authService.signOut();
    history.push("/");
  };

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

    console.log(tweetData);

    setMyTweets(tweetData);
  };

  useEffect(() => {
    getMyTweets();
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setNewDisplayName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });

      onRefreshUser();
    }
  };

  return (
    <>
      <p>{userObj.displayName || userObj.email.split("@")[0]}'s Profile</p>
      <form onSubmit={onSubmit}>
        <input type="text" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onSignOut}>Log Out</button>

      {myTweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetObj={tweet}
          isOwner={tweet.uid === userObj.uid}
        ></Tweet>
      ))}
    </>
  );
};

export default Profile;
