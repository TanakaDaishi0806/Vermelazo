import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import ResultDetailTemplate from "../templates/ResultDetailTemplate";
import { TeamMember } from "../type/velmelazo";
import { EachMatchMomMember } from "../type/velmelazo";

const ResultDetail = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const locate = useLocation();
  const { state } = locate;
  const {
    club_match_id,
    match_id,
    team_id_a,
    team_id_b,
    team_name_a,
    team_name_b,
    score_a,
    score_b,
    is_finish,
    vnum,
    pk_a,
    pk_b,
    url,
    value,
  } = state;
  const [pointGettersA, setPointGettersA] = React.useState<TeamMember[]>([]);
  const [pointGettersB, setPointGettersB] = React.useState<TeamMember[]>([]);
  const [mom, setMom] = React.useState<EachMatchMomMember[]>([]);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/home/pointgetter/list/${match_id}/${team_id_a}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPointGettersA(response.data);
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/home/pointgetter/list/${match_id}/${team_id_b}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            setPointGettersB(response.data);
            axios
              .get(
                `${process.env.REACT_APP_API_URL}/home/mom/eachmatch/${match_id}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              )
              .then((response) => {
                console.log(response.data);
                setMom(response.data);
              })
              .catch((error) => {
                console.log(error);
                if (error.response.status === 401) {
                  navigate("/");
                }
              });
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
              navigate("/");
            }
          });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, [accessToken, match_id, navigate, team_id_a, team_id_b]);

  const handleResultListNavigate = () => {
    console.log(url);
    navigate(url, {
      state: { club_match_id: club_match_id, vnum, is_finish, value },
    });
  };

  return (
    <ResultDetailTemplate
      resultDerailInfo={{
        team_name_a: team_name_a,
        team_name_b: team_name_b,
        score_a: score_a,
        score_b: score_b,
        pointGetterA: pointGettersA,
        pointGetterB: pointGettersB,
        mom: mom,
        is_finish: is_finish,
        vnum: vnum,
        pk_a: pk_a,
        pk_b: pk_b,
        value: value,
        handleResultListNavigate: handleResultListNavigate,
      }}
    />
  );
};

export default ResultDetail;
