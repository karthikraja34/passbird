import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setLoggedIn] = useState(true);

  useEffect(() => {
    (async () => {
      let user = null;

      try {
        user = await Auth.currentAuthenticatedUser();
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        setLoggedIn(false);
      }
    })();
  }, []);

  return (
    <>
      {isAuthenticated && (
        <>
          <Navbar />
          {children}
        </>
      )}
      {!isAuthenticated && <Navigate to="/signin" />}
    </>
  );
}
