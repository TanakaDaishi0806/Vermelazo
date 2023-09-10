import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material/Select";
import { useLocation } from "react-router-dom";

import ChangeUserInfoTemplate from "../templates/ChangeUserInfoTemplate";

const ChangeUserInfo = () => {
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const {
    preName,
    preFurigana,
    preStudent_id,
    preGrade,
    preMailaddress,
    prePosition,
    preExperience,
  } = state;
  const [name, setName] = useState(preName);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [furigana, setFurigana] = useState(preFurigana);
  const [furiganaEmpty, setFuriganaEmpty] = useState(false);
  const [student_id, setStudent_id] = useState(preStudent_id);
  const [student_idError, setStudent_idError] = useState(false);
  const [mailaddress, setMailaddress] = useState(preMailaddress);
  const [grade, setGrade] = useState<number>(preGrade);
  const [position, setPosition] = useState<number>(prePosition);
  const [experience, setExperience] = useState<number>(preExperience);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(false);
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

  const handleChangeUserInfo = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/home/userinfo/change`,
        {
          name,
          furigana,
          student_id,
          grade,
          mailaddress,
          position,
          experience,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/home/list/userinfo");
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
    <ChangeUserInfoTemplate
      changeUserInfo={{
        name: name,
        furigana: furigana,
        student_id: student_id,
        mailaddress: mailaddress,
        grade: grade,
        position: position,
        experience: experience,
        nameEmpty: nameEmpty,
        furiganaEmpty: furiganaEmpty,
        student_idError: student_idError,
        inputError: inputError,
        allEmptyError: allEmptyError,
        setInputError: setInputError,
        handleNameChange: handleNameChange,
        handleStudent_idChange: handleStudent_idChange,
        handleFuriganaChange: handleFuriganaChange,
        handleMailaddressChange: handleMailaddressChange,
        handleGradeChange: handleGradeChange,
        handlePositionChange: handlePositionChange,
        handleExperienceChange: handleExperienceChange,
        handleChangeUserInfo: handleChangeUserInfo,
      }}
    />
  );
};
export default ChangeUserInfo;
