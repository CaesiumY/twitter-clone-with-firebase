import React, { useEffect, useState } from "react";
import AppRouter from "route";
import { authService } from "firebaseConfig";

function App() {
  const [isInit, setIsinit] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
        setUserObj(user);
      } else {
        setIsAuth(false);
      }
      setIsinit(true);
    });
  }, []);

  return (
    <>
      {isInit ? (
        <AppRouter isAuth={isAuth} userObj={userObj}></AppRouter>
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} FireTwit</footer>
    </>
  );
}

export default App;
