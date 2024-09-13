import { useEffect, useState } from "react";
import SignUp from "../../components/SignUp";
import Login from "../../components/Login";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <SignUp />
      <Login />
    </div>
  );
};

export default ModalProvider;
