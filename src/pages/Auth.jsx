import React from "react";
import AuthForm from "components/AuthForm";
import SocialLogin from "components/SocialLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04aaff"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm></AuthForm>
      <div className="authBtns">
        <SocialLogin provider={"google"}></SocialLogin>
        <SocialLogin provider={"github"}></SocialLogin>
      </div>
    </div>
  );
};

export default Auth;
