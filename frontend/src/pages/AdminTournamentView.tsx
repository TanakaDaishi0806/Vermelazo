import axios from "axios";
import React from "react";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router-dom";

import AdminTournamentViewTemplate from "../templates/AdminTournamentViewTemplate";

const AdminTournamentView = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const locate = useLocation();
  const { state } = locate;
  const { club_match_id, is_finish, vnum } = state;
  const [openTournament, setOpenTournament] = React.useState(false);

  const handleCloseTournament = () => {
    setOpenTournament(false);
  };
  const handleOpenTournament = () => {
    setOpenTournament(true);
  };

  const handleCreateTournament = () => {
    navigate("/admin/create/tournament/loading", {
      state: {
        club_match_id: club_match_id,
        is_finish: is_finish,
        vnum: 0,
      },
    });
  };

  return (
    <AdminTournamentViewTemplate
      adminTournamentViewInfo={{
        tvi: {
          club_match_id: club_match_id,
          vnum: vnum,
          is_finish: is_finish,
          url: "/admin/tournament/view",
        },
        openTournament,
        handleCloseTournament,
        handleOpenTournament,
        handleCreateTournament,
      }}
    />
  );
};

export default AdminTournamentView;
