import { authService } from "firebaseConfig";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();

  const onSignOut = async () => {
    await authService.signOut();
    history.push("/");
  };

  return (
    <>
      <p>Profile</p>
      <button onClick={onSignOut}>Log Out</button>
    </>
  );
};

export default Profile;
