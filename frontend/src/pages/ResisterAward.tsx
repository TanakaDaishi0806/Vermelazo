import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ResisterAwardTemplate from "../templates/ResisterAwardTemplate";

const ResisterAward = () => {
  const locate = useLocation();
  const { state } = locate;
  const { user_id, temp_award_name } = state;
  const [resisterAwardUser, setResisterAwardUser] = React.useState<number[]>([
    user_id,
  ]);
  const [awardName, setAwardName] = React.useState(temp_award_name);
  const [awardNameEmpty, setAwardNameEmpty] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleSelectAwardUser = (value: number) => () => {
    const currentIndex = resisterAwardUser.indexOf(value);
    const newResisterAwardUser = [...resisterAwardUser];

    if (currentIndex === -1 && resisterAwardUser.length < 1) {
      newResisterAwardUser.push(value);
    } else {
      newResisterAwardUser.splice(currentIndex, 1);
    }
    console.log(newResisterAwardUser);

    setResisterAwardUser(newResisterAwardUser);
  };

  const handleAwardNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAwardName(event.target.value);
    handleNameEmptyChange(event.target.value);
  };

  const handleNameEmptyChange = (nameValue: string) => {
    if (nameValue === "") {
      setAwardNameEmpty(true);
    } else {
      setAwardNameEmpty(false);
    }
  };

  const handleAwardResister = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/admin/award`,
        {
          award_name: awardName,
          user_id: resisterAwardUser[0],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/admin/award");
      })
      .catch((error) => {
        console.log(error);
        setInputError(true);
      });
  };

  return (
    <ResisterAwardTemplate
      resisterAwardInfo={{
        handleSelectAwardUser,
        resisterAwardUser,
        awardName,
        awardNameEmpty,
        handleAwardNameChange,
        inputError,
        setInputError,
        handleAwardResister,
      }}
    />
  );
};

export default ResisterAward;
