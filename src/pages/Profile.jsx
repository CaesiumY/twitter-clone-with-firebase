import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "firebaseConfig";

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName || userObj.email.split("@")[0]
  );
  const history = useHistory();

  const onSignOut = async () => {
    await authService.signOut();
    history.push("/");
  };

  const getMyTweets = async () => {
    const myTweets = await dbService
      .collection("tweets")
      .where("uid", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(myTweets.docs.map((doc) => doc.data()));
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
    }
  };

  return (
    <>
      <p>Profile</p>
      <form onSubmit={onSubmit}>
        <input type="text" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onSignOut}>Log Out</button>
    </>
  );
};

export default Profile;
