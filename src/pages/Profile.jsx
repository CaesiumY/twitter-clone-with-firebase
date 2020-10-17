import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "firebaseConfig";

const Profile = ({ userObj }) => {
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

    console.log(myTweets.docs.map((doc) => console.log("docs", doc.data())));
  };

  useEffect(() => {
    getMyTweets();
  });

  return (
    <>
      <p>Profile</p>
      <button onClick={onSignOut}>Log Out</button>
    </>
  );
};

export default Profile;
