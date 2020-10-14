import React, { useEffect, useState } from "react";
import AppRouter from "route";
import { authService } from "firebaseConfig";

function App() {
  const [isInit, setIsinit] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      user ? setIsAuth(true) : setIsAuth(false);

      setIsinit(true);
    });
  }, []);

  return (
    <>
      {isInit ? <AppRouter isAuth={isAuth}></AppRouter> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} FireTwit</footer>
    </>
  );
}

export default App;
