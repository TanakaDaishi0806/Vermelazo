import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

import AddClubMatchTemplate from "../templates/AddClubMatchTemplate";

const AddClubMatch = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [date, setDate] = useState<Date | null>(null);
  const [dateEmpty, setDateEmpty] = useState(true);
  const [voteDate, setVoteDate] = useState<Date | null>(null);
  const [voteDateEmpty, setVoteDateEmpty] = useState(true);
  const [title, setTitle] = useState("");
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const [pointTimes, setPointTimes] = useState<string>("1");
  const [pointTimesEmpty, setPointTimesEmpty] = useState(false);
  const [type, setType] = useState(1);

  const handleTypeChage = (event: SelectChangeEvent) => {
    setType(Number(event.target.value));
  };

  const handlePointTimesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPointTimes(event.target.value);
    handlePointTimesEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handlePointTimesEmptyChange = (pointTimesValue: string) => {
    if (pointTimesValue === "" || parseInt(pointTimesValue) < 1) {
      setPointTimesEmpty(true);
    } else {
      setPointTimesEmpty(false);
    }
  };

  const handleDateChange = (dateValue: Date | null) => {
    setDate(dateValue);
    handleDateEmptyChange(dateValue);
    handleAllEmptyError();
  };
  const handleDateEmptyChange = (dateValue: Date | null) => {
    if (dateValue === null) {
      setDateEmpty(true);
    } else {
      setDateEmpty(false);
    }
  };
  const handleVoteDateChange = (dateValue: Date | null) => {
    setVoteDate(dateValue);
    handleVoteDateEmptyChange(dateValue);
    handleAllEmptyError();
  };
  const handleVoteDateEmptyChange = (dateValue: Date | null) => {
    if (dateValue === null) {
      setVoteDateEmpty(true);
    } else {
      setVoteDateEmpty(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    handleTitleEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleTitleEmptyChange = (titleValue: string) => {
    if (titleValue === "") {
      setTitleEmpty(true);
    } else {
      setTitleEmpty(false);
    }
  };

  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handleDateSubmit = () => {
    if (date && voteDate) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const vote_year = voteDate.getFullYear();
      const vote_month = voteDate.getMonth() + 1;
      const vote_day = voteDate.getDate();
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/admin`,
          {
            year,
            month,
            day,
            vote_year,
            vote_month,
            vote_day,
            title,
            point_times: parseInt(pointTimes, 10),
            club_match_type: type,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          console.log("success login");
          navigate("/admin");
        })
        .catch((error) => {
          console.log(error);
          console.log(date);
          setInputError(true);
          if (error.response.status === 401) {
            navigate("/adminlogin");
          }
        });
    }
  };
  return (
    <AddClubMatchTemplate
      addClubMatchInfo={{
        date: date,
        voteDate: voteDate,
        title: title,
        pointTimes: pointTimes,
        dateEmpty: dateEmpty,
        voteDateEmpty: voteDateEmpty,
        titleEmpty: titleEmpty,
        pointTimesEmpty: pointTimesEmpty,
        inputError: inputError,
        allEmptyError: allEmptyError,
        type: type,
        setInputError: setInputError,
        handleDateChange: handleDateChange,
        handleVoteDateChange: handleVoteDateChange,
        handleTitleChange: handleTitleChange,
        handlePointTimesChange: handlePointTimesChange,
        handleDateSubmit: handleDateSubmit,
        handleTypeChange: handleTypeChage,
      }}
    />
  );
};

export default AddClubMatch;
