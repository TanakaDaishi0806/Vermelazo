import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import PasswordResetTemplate from "../templates/PasswordResetTemplate";

const PasswordReset = () => {
  const [password, setPassword] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    handlePasswordLengthErrorChange(event.target.value);
    handleAllEmptyError();
  };

  const handlePasswordLengthErrorChange = (passwordValue: string) => {
    if (passwordValue.length >= 8) {
      setPasswordLengthError(false);
    } else {
      setPasswordLengthError(true);
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    handlePasswordError(event.target.value);
  };

  const handlePasswordError = (confirmPasswordValue: string) => {
    if (password === confirmPasswordValue) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    if (confirmPassword.length === 0) {
      setConfirmPasswordEmpty(true);
    } else {
      setConfirmPasswordEmpty(false);
    }
  };

  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handlePasswordReset = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/forgetpassword/resetpassword`, {
        password,
        reset_token: token,
      })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setInputError(true);
        navigate("/passwordreset/message");
      });
  };
  return (
    <PasswordResetTemplate
      changeAdminPassword={{
        password: password,
        confirmPassword: confirmPassword,
        passwordLengthError: passwordLengthError,
        passwordError: passwordError,
        inputError: inputError,
        confirmPasswordEmpty: confirmPasswordEmpty,
        allEmptyError: allEmptyError,
        setInputError: setInputError,
        handlePasswordChange: handlePasswordChange,
        handleConfirmPasswordChange: handleConfirmPasswordChange,
        handleChangeAdminPassword: handlePasswordReset,
      }}
    />
  );
};
export default PasswordReset;
