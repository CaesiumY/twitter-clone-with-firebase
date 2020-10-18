import { authService } from "firebaseConfig";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log("onSubmit -> data", data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleNewAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="authInput"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Sign In" : "Log In"}
          className="authInput authSubmit"
        />
        <input
          type="checkbox"
          name="isNewAccount"
          id="isNewAccount"
          value="isNewAccount"
          onChange={toggleNewAccount}
          className="authSwitch"
        />
        <label htmlFor="isNewAccount" className="authSwitch__label">
          Already have Account?
        </label>
        {error && <span className="authError">{error}</span>}
      </form>
    </>
  );
};

export default AuthForm;
