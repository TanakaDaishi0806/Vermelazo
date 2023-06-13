import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import ChangeClubMatchTemplate from "../templates/ChangeClubMatchTemplate";

const ChangeClubMatch = () => {
  const location = useLocation();
  const { state } = location;
  const {
    club_match_id,
    preYear,
    preMonth,
    preDay,
    preVoteYear,
    preVoteMonth,
    preVoteDay,
    preTitle,
  } = state;
  console.log(club_match_id);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [date, setDate] = useState<Date | null>(() => {
    if (preYear && preMonth && preDay) {
      const year = parseInt(preYear, 10);
      const month = parseInt(preMonth, 10);
      const day = parseInt(preDay, 10);

      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month - 1, day);
      }
    }
    return null;
  });

  const [dateEmpty, setDateEmpty] = useState(false);
  const [voteDate, setVoteDate] = useState<Date | null>(() => {
    if (preVoteYear && preVoteMonth && preVoteDay) {
      const year = parseInt(preVoteYear, 10);
      const month = parseInt(preVoteMonth, 10);
      const day = parseInt(preVoteDay, 10);

      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month - 1, day);
      }
    }
    return null;
  });
  const [voteDateEmpty, setVoteDateEmpty] = useState(false);
  const [title, setTitle] = useState<string>(preTitle || "");
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleDateChange = (dateValue: Date | null) => {
    setDate(dateValue);
    handleDateEmptyChange(dateValue);
  };
  const handleDateEmptyChange = (dateValue: Date | null) => {
    if (dateValue === null) {
      setDateEmpty(true);
    } else {
      setDateEmpty(false);
    }
  };
  const handleVoteDateChange = (voteDateValue: Date | null) => {
    setVoteDate(voteDateValue);
    handleVoteDateEmptyChange(voteDateValue);
  };
  const handleVoteDateEmptyChange = (voteDateValue: Date | null) => {
    if (voteDateValue === null) {
      setVoteDateEmpty(true);
    } else {
      setVoteDateEmpty(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    handleTitleEmptyChange(event.target.value);
  };

  const handleTitleEmptyChange = (titleValue: string) => {
    if (titleValue === "") {
      setTitleEmpty(true);
    } else {
      setTitleEmpty(false);
    }
  };

  const handleChangeDateSubmit = () => {
    if (date && voteDate) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const vote_year = voteDate.getFullYear();
      const vote_month = voteDate.getMonth() + 1;
      const vote_day = voteDate.getDate();
      axios
        .put(
          `http://localhost:18000/admin/clubmatchs/${club_match_id}`,
          {
            year,
            month,
            day,
            vote_year,
            vote_month,
            vote_day,
            title,
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
        });
    }
  };
  return (
    <ChangeClubMatchTemplate
      changeClubMatchInfo={{
        date: date,
        voteDate: voteDate,
        title: title,
        dateEmpty: dateEmpty,
        voteDateEmpty: voteDateEmpty,
        titleEmpty: titleEmpty,
        inputError: inputError,
        setInputError: setInputError,
        handleDateChange: handleDateChange,
        handleVoteDateChange: handleVoteDateChange,
        handleTitleChange: handleTitleChange,
        handleChangeDateSubmit: handleChangeDateSubmit,
      }}
    />
  );
};

export default ChangeClubMatch;
