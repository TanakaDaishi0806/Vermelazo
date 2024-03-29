import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLoginTemplate from "../templates/AdminLoginTemplate";

const AdminLogin = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [student_id, setStudent_id] = useState("");
  const [student_idEmpty, setStudent_idEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin`, {
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
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });
  }, []);

  const handleStudent_idChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudent_id(event.target.value);
    handleStudent_idEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleStudent_idEmptyChange = (student_idValue: string) => {
    if (student_idValue === "") {
      setStudent_idEmpty(true);
    } else {
      setStudent_idEmpty(false);
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
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        student_id,
        password,
      })
      .then((response) => {
        console.log(process.env.REACT_APP_API_URL);
        const accessToken = response.data;
        localStorage.setItem("accessToken", accessToken);
        axios
          .get(`${process.env.REACT_APP_API_URL}/admin`, {
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
          student_id: student_id,
          password: password,
          student_idEmpty: student_idEmpty,
          passwordEmpty: passwordEmpty,
          inputError: inputError,
          allEmptyError: allEmptyError,
          setInputError: setInputError,
          handleStudent_idChange: handleStudent_idChange,
          handlePasswordChange: handlePasswordChange,
          handleLogin: handleLogin,
        }}
      />
    </div>
  );
};

export default AdminLogin;
