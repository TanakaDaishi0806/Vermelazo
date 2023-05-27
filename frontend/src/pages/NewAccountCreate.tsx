import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material/Select";

import NewAccountCreateTemplate from "../templates/NewAccountCreateTemplate";

const NewAccountCreate = () => {
  const [name, setName] = useState("");
  const [nameEmpty, setNameEmpty] = useState(false);
  const [furigana, setFurigana] = useState("");
  const [furiganaEmpty, setFuriganaEmpty] = useState(false);
  const [studentID, setStudentID] = useState("");
  const [studentIDEmpty, setStudentIDEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [mailaddress, setMailaddress] = useState("");
  const [grade, setGrade] = useState<number>(1);
  const [position, setPosition] = useState<number>(1);
  const [experience, setExperience] = useState<number>(0);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    handleNameEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleNameEmptyChange = (nameValue: string) => {
    if (nameValue === "") {
      setNameEmpty(true);
    } else {
      setNameEmpty(false);
    }
  };

  const handleFuriganaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFurigana(event.target.value);
    handleFuriganaEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleFuriganaEmptyChange = (furiganaValue: string) => {
    if (furiganaValue === "") {
      setFuriganaEmpty(true);
    } else {
      setFuriganaEmpty(false);
    }
  };

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
  };

  const handleMailaddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMailaddress(event.target.value);
  };

  const handleGradeChange = (event: SelectChangeEvent<string>) => {
    setGrade(parseInt(event.target.value, 10));
  };

  const handlePositionChange = (event: SelectChangeEvent<string>) => {
    setPosition(parseInt(event.target.value, 10));
  };

  const handleExperienceChange = (event: SelectChangeEvent<string>) => {
    setExperience(parseInt(event.target.value, 10));
  };

  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handleNewAccountCreate = () => {
    axios
      .post("http://localhost:18000/register", {
        name,
        studentID,
        password,
        grade,
        mailaddress,
        position,
        furigana,
        experience,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setInputError(true);
      });
  };
  return (
    <NewAccountCreateTemplate
      newAccountInfo={{
        name: name,
        furigana: furigana,
        studentID: studentID,
        password: password,
        confirmPassword: confirmPassword,
        mailaddress: mailaddress,
        grade: grade,
        position: position,
        experience: experience,
        nameEmpty: nameEmpty,
        furiganaEmpty: furiganaEmpty,
        studentIDEmpty: studentIDEmpty,
        passwordEmpty: passwordEmpty,
        passwordError: passwordError,
        inputError: inputError,
        allEmptyError: allEmptyError,
        setInputError: setInputError,
        handleNameChange: handleNameChange,
        handleStudentIDChange: handleStudentIDChange,
        handleFuriganaChange: handleFuriganaChange,
        handlePasswordChange: handlePasswordChange,
        handleConfirmPasswordChange: handleConfirmPasswordChange,
        handleMailaddressChange: handleMailaddressChange,
        handleGradeChange: handleGradeChange,
        handlePositionChange: handlePositionChange,
        handleExperienceChange: handleExperienceChange,
        handleNewAccountCreate: handleNewAccountCreate,
      }}
    />
  );
};
export default NewAccountCreate;
