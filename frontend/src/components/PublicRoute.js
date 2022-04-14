import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Navigate } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";

export default function PublicRoute({ children }) {
  const [isAuthenticated, setLoggedIn] = useState(false);

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
      {isAuthenticated && <Navigate to="/" />}
      {!isAuthenticated && (
        <>
          <PublicNavbar />
          {children}
        </>
      )}
    </>
  );
}
