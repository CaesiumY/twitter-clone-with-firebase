import React, { useState } from "react";
import AppRouter from "route";
import { authService } from "firebaseConfig";

function App() {
  const [isAuth, setIsAuth] = useState(authService.currentUser);
  console.log("App -> isAuth", isAuth);
  return (
    <>
      <AppRouter isAuth={isAuth}></AppRouter>
      <footer>&copy; {new Date().getFullYear()} FireTwit</footer>
    </>
  );
}

export default App;
