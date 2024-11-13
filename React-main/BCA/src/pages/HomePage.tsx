import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      {authContext?.user ? (
        <>
          <h1>Welcome, {authContext.user.username + "From - " + authContext.user.organization + " " + authContext.user.place}!</h1>
          <button onClick={authContext.logout}>Logout</button>
        </>
      ) : (
        <>
        <button>
          <NavLink to={"/login"}>Log In</NavLink>
        </button>
        <button>
          <NavLink to={"/register"}>Register</NavLink>
        </button>
        </>
      )}
    </div>
  );
};

export default HomePage;
