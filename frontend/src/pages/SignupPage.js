import { useState } from "react";

import SignupComponent from "../components/Signup";
import RegisterTOTP from "../components/RegisterTOTP";

export default function SignupPage() {
  const [user, setUser] = useState(null);

  const onSignUp = (user) => {
    setUser(user);
  };

  return (
    <>
      {!user && <SignupComponent onSignUp={(user) => onSignUp(user)} />}
      {user && <RegisterTOTP user={user} />}
    </>
  );
}
