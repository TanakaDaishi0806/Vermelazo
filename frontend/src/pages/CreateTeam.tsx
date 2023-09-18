import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import CreateTeamTemplate from "../templates/CreateTeamTemplate";

const CreateTeam = () => {
  const navigate = useNavigate();
  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, participant_num } = state;
  const [teamNum, setTeamNum] = useState("");
  const [teamNumEmpty, setTeamNumEmpty] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);

  const handleTeamNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamNum(event.target.value);
    handleTeamNumEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleTeamNumEmptyChange = (teamNumValue: string) => {
    if (
      teamNumValue === "" ||
      parseInt(teamNumValue) > participant_num ||
      parseInt(teamNumValue, 10) <= 1
    ) {
      setTeamNumEmpty(true);
      console.log(parseInt(teamNumValue) > participant_num);
      console.log(participant_num);
    } else {
      setTeamNumEmpty(false);
      console.log(parseInt(teamNumValue) > participant_num);
      console.log(participant_num);
    }
  };
  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handleCreateTeamDataSubmit = () => {
    navigate("/admin/team/create/loading", {
      state: {
        club_match_id: club_match_id,
        team_num: teamNum,
        participant_num: participant_num,
      },
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
