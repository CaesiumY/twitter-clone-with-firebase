import { authService } from "firebaseConfig";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ProfileForm = ({ userObj, onRefreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName || userObj.email.split("@")[0]
  );

  const history = useHistory();

  const onSignOut = async () => {
    await authService.signOut();
    history.push("/");
  };

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
      <p className="profileName">
        {userObj.displayName || userObj.email.split("@")[0]}'s Profile
      </p>
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          value={newDisplayName}
          onChange={onChange}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span onClick={onSignOut} className="formBtn cancelBtn logOut">
        Log Out
      </span>
    </>
  );
};

export default ProfileForm;
