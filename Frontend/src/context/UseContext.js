import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const SomeComponent = () => {
  const { isLoggedIn, login, logout, userId } = useContext(AuthContext);

  return (
    <div>
      <p>User is {isLoggedIn ? "logged in" : "not logged in"}</p>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login("email@example.com", "password")}>Login</button>
      )}
      {userId && <p>User ID: {userId}</p>}
    </div>
  );
};
