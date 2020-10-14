import React, { useState } from "react";
import AppRouter from "route";
import { auth } from "firebaseConfig";

function App() {
  const [isAuth, setIsAuth] = useState(auth.currentUser);
  console.log(isAuth);
  return (
    <>
      <AppRouter isAuth={isAuth}></AppRouter>
      <footer>&copy; {new Date().getFullYear()} FireTwit</footer>
    </>
  );
}

export default App;
