import React, { useState } from "react";

import Popup from "../../components/Popup/Popup";

import { useLogin } from "../../hooks";

import PopUp from "../../models/types/PopUp";

import styles from "./Auth.module.scss";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage: React.FC = () => {
  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });
  const login = useLogin();

  const handleLogin = async (email: string, password: string) => {
    try {
      login(email, password);
    } catch (error) {
      setPopup({ isOpen: true, message: error.message });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
    }
  };

  return (
    <div className={styles.Auth}>
      {popup.isOpen && <Popup message={popup.message}></Popup>}
      <AuthForm login={handleLogin}></AuthForm>
    </div>
  );
};

export default AuthPage;
