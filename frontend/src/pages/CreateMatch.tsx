import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import CreateMatchTemplate from "../templates/CreateMatchTemplate";

const CreateMatch = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  const [matchNum, setMatchNum] = useState("");
  const [matchNumEmpty, setMatchNumEmpty] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);

  const handleMatchNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatchNum(event.target.value);
    handleMatchNumEmptyChange(event.target.value);
    setAllEmptyError(false);
  };

  const handleMatchNumEmptyChange = (value: string) => {
    if (value === "") {
      setMatchNumEmpty(true);
    } else {
      setMatchNumEmpty(false);
    }
  };

  const handleCreateMatchDataSubmit = () => {
    axios
      .post(
        "http://localhost:18000/admin/match/combination/create",
        {
          club_match_id,
          match_num: parseInt(matchNum, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/admin/match/list", {
          state: {
            club_match_id,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CreateMatchTemplate
      createMatchInfo={{
        matchNum: matchNum,
        matchNumEmpty: matchNumEmpty,
        allEmptyError: allEmptyError,
        handleMatchNumChange: handleMatchNumChange,
        handleCreateMatchDataSubmit: handleCreateMatchDataSubmit,
      }}
    />
  );
};

export default CreateMatch;
