import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import PublicNavbar from "./PublicNavbar";

export default function PrivateRoute({ children, authenticatedOnly }) {
  const [isAuthenticated, setLoggedIn] = useState(true);

  useEffect(() => {
    (async () => {
      let user = null;

      try {
        user = await Auth.currentAuthenticatedUser();
        console.log("User : ", user);
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

  const componentsToRender = () => {
    if (isAuthenticated && authenticatedOnly) {
      return (
        <>
          <Navbar />
          {children}
        </>
      );
    }

    if (!authenticatedOnly) {
      if (isAuthenticated) {
        return (
          <>
            <Navbar />
            {children}
          </>
        );
      } else {
        return (
          <>
            <PublicNavbar />
            {children}
          </>
        );
      }
    }

    return <Navigate to="/signin" />;
  };

  return <>{componentsToRender()}</>;
}
