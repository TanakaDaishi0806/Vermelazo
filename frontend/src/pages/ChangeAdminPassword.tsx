import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ChangeAdminPasswordTemplate from "../templates/ChangeAdminPasswordTemplate";

const ChangeAdminPassword = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [password, setPassword] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const navigate = useNavigate();

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

  const handleChangeAdminPassword = () => {
    axios
      .put(
        "http://localhost:18000/admin/password/change",
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/adminlogin");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
        setInputError(true);
      });
  };
  return (
    <ChangeAdminPasswordTemplate
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
        handleChangeAdminPassword: handleChangeAdminPassword,
      }}
    />
  );
};
export default ChangeAdminPassword;
