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
        setUserObj(getCompressedUser(user));
      } else {
        setIsAuth(false);
        setUserObj(null);
      }
      setIsinit(true);
    });
  }, []);

  const onRefreshUser = () => {
    setUserObj(getCompressedUser(authService.currentUser));
  };

  // 리액트의 가상돔은 크기가 큰 오브젝트를 비교하는데 시간이 걸리면 힘들어한다.
  // 그래서 일부러 큰 오브젝트를 작게 만들어 업데이트를 하도록 했다.

  const getCompressedUser = (user) => {
    return {
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    };
  };

  return (
    <>
      {isInit ? (
        <AppRouter
          isAuth={isAuth}
          userObj={userObj}
          onRefreshUser={onRefreshUser}
        ></AppRouter>
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
