import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
          "http://localhost:18000/admin",
          { year, month, day, vote_year, vote_month, vote_day, title },
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
        });
    }
  };
  return (
    <AddClubMatchTemplate
      addClubMatchInfo={{
        date: date,
        voteDate: voteDate,
        title: title,
        dateEmpty: dateEmpty,
        voteDateEmpty: voteDateEmpty,
        titleEmpty: titleEmpty,
        inputError: inputError,
        allEmptyError: allEmptyError,
        setInputError: setInputError,
        handleDateChange: handleDateChange,
        handleVoteDateChange: handleVoteDateChange,
        handleTitleChange: handleTitleChange,
        handleDateSubmit: handleDateSubmit,
      }}
    />
  );
};

export default AddClubMatch;
