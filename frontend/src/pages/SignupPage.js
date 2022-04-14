import { useState } from "react";

import SignupComponent from "../components/Signup";
import RegisterTOTP from "../components/RegisterTOTP";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

export default function SignupPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onSignUp = (user) => {
    setUser(user);
  };

  const onVerificationSuccess = (accessToken) => {
    saveToken(accessToken);
    navigate("/");
  };

  return (
    <>
      {!user && <SignupComponent onSignUp={(user) => onSignUp(user)} />}
      {user && (
        <RegisterTOTP
          user={user}
          onVerificationSuccess={onVerificationSuccess}
        />
      )}
    </>
  );
}
