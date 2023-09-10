import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import CreateTeamTemplate from "../templates/CreateTeamTemplate";

const CreateTeam = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id } = state;
  const [teamNum, setTeamNum] = useState("");
  const [teamNumEmpty, setTeamNumEmpty] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);

  const handleTeamNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamNum(event.target.value);
    handleTeamNumEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleTeamNumEmptyChange = (teamNumValue: string) => {
    if (teamNumValue === "") {
      setTeamNumEmpty(true);
    } else {
      setTeamNumEmpty(false);
    }
  };
  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handleCreateTeamDataSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/admin/team/create`,
        {
          club_match_id,
          team_num: parseInt(teamNum, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/admin/team/change", {
          state: {
            club_match_id,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });
  };

  return (
    <div>
      <CreateTeamTemplate
        createTeamInfo={{
          teamNum: teamNum,
          teamNumEmpty: teamNumEmpty,
          allEmptyError: allEmptyError,
          handleTeamNumChange: handleTeamNumChange,
          handleCreateTeamDataSubmit: handleCreateTeamDataSubmit,
        }}
      />
    </div>
  );
};

export default CreateTeam;
