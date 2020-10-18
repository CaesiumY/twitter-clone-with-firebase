import React from "react";
import { authService, firebaseInstance } from "firebaseConfig";

const SocialLogin = ({ provider }) => {
  const onSocialLogin = async (e) => {
    const { name } = e.target;
    let provider;

    try {
      if (name === "google") {
        provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name === "github") {
        provider = new firebaseInstance.auth.GithubAuthProvider();
      } else {
        alert(`Wrong ${provider} provider!`);
      }
      const data = await authService.signInWithPopup(provider);
      console.log("onSocialLogin -> data", data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button name={provider} onClick={onSocialLogin}>
      Continue with {provider}
    </button>
  );
};

export default SocialLogin;