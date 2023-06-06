import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLoginTemplate from "../templates/AdminLoginTemplate";

const AdminLogin = () => {
  const [studentID, setStudentID] = useState("");
  const [studentIDEmpty, setStudentIDEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const navigate = useNavigate();

  const handleStudentIDChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentID(event.target.value);
    handleStudentIDEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleStudentIDEmptyChange = (studentIDValue: string) => {
    if (studentIDValue === "") {
      setStudentIDEmpty(true);
    } else {
      setStudentIDEmpty(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    handlePasswordEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handlePasswordEmptyChange = (passwordValue: string) => {
    if (passwordValue === "") {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
    }
  };

  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:18000/login", {
        studentID,
        password,
      })
      .then((response) => {
        console.log(response.data);
        const accessToken = response.data;
        localStorage.setItem("accessToken", accessToken);
        axios
          .get("http://localhost:18000/admin", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            navigate("/admin");
          })
          .catch((error) => {
            console.log(error);
            setInputError(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setInputError(true);
      });
  };
  return (
    <div>
      <AdminLoginTemplate
        loginInfo={{
          studentID: studentID,
          password: password,
          studentIDEmpty: studentIDEmpty,
          passwordEmpty: passwordEmpty,
          inputError: inputError,
          allEmptyError: allEmptyError,
          setInputError: setInputError,
          handleStudentIDChange: handleStudentIDChange,
          handlePasswordChange: handlePasswordChange,
          handleLogin: handleLogin,
        }}
      />
    </div>
  );
};

export default AdminLogin;
