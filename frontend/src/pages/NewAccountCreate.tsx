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
  const [student_id, setStudent_id] = useState("");
  const [student_idError, setStudent_idError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(true);
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

  const handleStudent_idChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudent_id(event.target.value);
    handleStudent_idErrorChange(event.target.value);
    handleAllEmptyError();
  };

  const handleStudent_idErrorChange = (student_idValue: string) => {
    if (student_idValue.length === 8) {
      setStudent_idError(false);
    } else {
      setStudent_idError(true);
    }
  };

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
        student_id,
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
        student_id: student_id,
        password: password,
        confirmPassword: confirmPassword,
        mailaddress: mailaddress,
        grade: grade,
        position: position,
        experience: experience,
        nameEmpty: nameEmpty,
        furiganaEmpty: furiganaEmpty,
        student_idError: student_idError,
        confirmPasswordEmpty: confirmPasswordEmpty,
        passwordLengthError: passwordLengthError,
        passwordError: passwordError,
        inputError: inputError,
        allEmptyError: allEmptyError,
        setInputError: setInputError,
        handleNameChange: handleNameChange,
        handleStudent_idChange: handleStudent_idChange,
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
