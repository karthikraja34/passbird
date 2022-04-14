import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "../components/Login";
import RegisterTOTP from "../components/RegisterTOTP";
import VerifyTOTP from "../components/VerifyTOTP";
import { saveToken } from "../utils/auth";

export default function LoginPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onSignIn = (user) => {
    setUser(user);
  };

  const onVerificationSuccess = (accessToken) => {
    saveToken(accessToken);
    navigate("/");
  };

  return (
    <>
      {!user && <Login onSignIn={(user) => onSignIn(user)} />}
      {user && user.challengeName === "MFA_SETUP" && (
        <RegisterTOTP user={user} />
      )}
      {user && user.challengeName === "SOFTWARE_TOKEN_MFA" && (
        <VerifyTOTP user={user} onVerificationSuccess={onVerificationSuccess} />
      )}
    </>
  );
}
