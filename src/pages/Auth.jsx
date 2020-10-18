import React from "react";
import AuthForm from "components/AuthForm";
import SocialLogin from "components/SocialLogin";

const Auth = () => {
  return (
    <>
      <AuthForm></AuthForm>
      <div>
        <SocialLogin provider={"google"}></SocialLogin>
        <SocialLogin provider={"github"}></SocialLogin>
      </div>
    </>
  );
};

export default Auth;
