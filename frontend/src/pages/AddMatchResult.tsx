import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import AddMatchResultTemplate from "../templates/AddMatchResultTemplate";
import { TeamMember } from "../type/velmelazo";

const AddMatchResult = () => {
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
  } = state;
  const [scoreA, setScoreA] = React.useState("");
  const [scoreB, setScoreB] = React.useState("");
  const [pointGettersA, setPointGettersA] = React.useState<TeamMember[]>([]);
  const [pointGettersB, setPointGettersB] = React.useState<TeamMember[]>([]);
  const [tmpPointGettersA, setTmpPointGettersA] = React.useState<TeamMember[]>(
    []
  );
  const [tmpPointGettersB, setTmpPointGettersB] = React.useState<TeamMember[]>(
    []
  );
  const [teamAMember, setTeamAMember] = React.useState<TeamMember[]>([]);
  const [teamBMember, setTeamBMember] = React.useState<TeamMember[]>([]);
  const [pointA, setPointA] = React.useState<number[]>([]);
  const [pointB, setPointB] = React.useState<number[]>([]);
  const [finishSubmit, setFinishSubmit] = React.useState(false);
  const [pgReceived, setPgReceived] = React.useState(0);
  const [submitError, setSubmitError] = React.useState(false);

  React.useEffect(() => {
    if (score_a !== -1) {
      console.log(club_match_id);
      setScoreA(String(score_a));
    }
    if (score_b !== -1) {
      setScoreB(String(score_b));
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`http://localhost:18000/admin/team/specify/list/${team_id_a}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setTeamAMember(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });
    axios
      .get(`http://localhost:18000/admin/team/specify/list/${team_id_b}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setTeamBMember(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });

    if (pgReceived === 0) {
      axios
        .get(
          `http://localhost:18000/admin/pointgetter/list/${match_id}/${team_id_a}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setTmpPointGettersA(response.data);
          setPgReceived(1);
          axios
            .get(
              `http://localhost:18000/admin/pointgetter/list/${match_id}/${team_id_b}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data);
              setTmpPointGettersB(response.data);
              setPgReceived(1);
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 401) {
                navigate("/adminlogin");
              }
            });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/adminlogin");
          }
        });
    }
  }, []);

  React.useEffect(() => {
    if (teamAMember.length !== 0 && teamBMember.length !== 0) {
      setPointA(Array(teamAMember.length).fill(0));
      setPointB(Array(teamBMember.length).fill(0));
    }
  }, [teamAMember, teamBMember]);

  React.useEffect(() => {
    if (
      pgReceived === 1 &&
      (tmpPointGettersA.length !== 0 || tmpPointGettersB.length !== 0) &&
      pointA.length !== 0 &&
      pointB.length !== 0
    ) {
      const tmpa = [...pointGettersA];
      const newpointa = [...pointA];
      const tmpb = [...pointGettersB];
      const newpointb = [...pointB];

      tmpPointGettersA.map((value) => {
        console.log(value);

        handleFirstPlusPointGetterAChange(value, tmpa, newpointa)();
      });
      setPointGettersA(tmpa);
      setPointA(newpointa);
      tmpPointGettersB.map((value) => {
        handleFirstPlusPointGetterBChange(value, tmpb, newpointb)();
      });
      setPointGettersB(tmpb);
      setPointB(newpointb);
      setPgReceived(2);
    }
  }, [tmpPointGettersA, tmpPointGettersB]);

  React.useEffect(() => {
    console.log(finishSubmit);
    if (finishSubmit) {
      navigate("/admin/match/score", {
        state: { club_match_id: club_match_id },
      });
    }
  }, [finishSubmit]);

  const handleFirstPlusPointGetterAChange =
    (value: TeamMember, tmp: TeamMember[], newpoint: number[]) => () => {
      teamAMember.map((v, index) => {
        if (v.user_id === value.user_id) {
          if (pointGettersA.length < parseInt(scoreA, 10)) {
            value = v;
            tmp.push(value);
            newpoint[index] = newpoint[index] + 1;
          }
        }
      });
    };

  const handlePlusPointGetterAChange = (value: TeamMember) => () => {
    const tmp = [...pointGettersA];
    const newpoint = [...pointA];
    teamAMember.map((v, index) => {
      if (v.user_id === value.user_id) {
        if (pointGettersA.length < parseInt(scoreA, 10)) {
          value = v;
          tmp.push(value);
          newpoint[index] = newpoint[index] + 1;
        }
      }
    });
    console.log(tmp);
    console.log(newpoint);

    setPointGettersA(tmp);
    setPointA(newpoint);
  };
  const handleMinusPointGetterAChange = (value: TeamMember) => () => {
    const tmp = [...pointGettersA];
    const currentIndex = pointGettersA.indexOf(value);
    const newpoint = [...pointA];
    const memberIndex = teamAMember.indexOf(value);

    if (currentIndex !== -1) {
      tmp.splice(currentIndex, 1);
      newpoint[memberIndex] = newpoint[memberIndex] - 1;
    }
    setPointGettersA(tmp);
    setPointA(newpoint);
  };

  const handleFirstPlusPointGetterBChange =
    (value: TeamMember, tmp: TeamMember[], newpoint: number[]) => () => {
      teamBMember.map((v, index) => {
        if (v.user_id === value.user_id) {
          if (pointGettersB.length < parseInt(scoreB, 10)) {
            value = v;
            tmp.push(value);
            newpoint[index] = newpoint[index] + 1;
          }
        }
      });
    };

  const handlePlusPointGetterBChange = (value: TeamMember) => () => {
    const tmp = [...pointGettersB];
    const newpoint = [...pointB];
    teamBMember.map((v, index) => {
      if (v.user_id === value.user_id) {
        if (pointGettersB.length < parseInt(scoreB, 10)) {
          value = v;
          tmp.push(value);
          newpoint[index] = newpoint[index] + 1;
        }
      }
    });
    console.log(tmp);
    console.log(newpoint);
    setPointGettersB(tmp);
    setPointB(newpoint);
  };
  const handleMinusPointGetterBChange = (value: TeamMember) => () => {
    const tmp = [...pointGettersB];
    const currentIndex = pointGettersB.indexOf(value);
    const newpoint = [...pointB];
    const memberIndex = teamBMember.indexOf(value);

    if (currentIndex !== -1) {
      tmp.splice(currentIndex, 1);
      newpoint[memberIndex] = newpoint[memberIndex] - 1;
    }
    setPointGettersB(tmp);
    setPointB(newpoint);
  };

  const handleScoreAChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScoreA(event.target.value);
  };
  const handleScoreBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScoreB(event.target.value);
  };

  const handlesubmit = () => {
    const pointGetters = pointGettersA.concat(pointGettersB);
    if (
      parseInt(scoreA, 10) === pointGettersA.length &&
      parseInt(scoreB, 10) === pointGettersB.length
    ) {
      axios
        .delete(`http://localhost:18000/admin/pointgetter/${match_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          {
            pointGetters.map((value, index) => {
              axios
                .post(
                  `http://localhost:18000/admin/pointgetter/add`,
                  {
                    match_id,
                    club_match_id,
                    team_id: value.team_id,
                    user_id: value.user_id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                )
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error);
                  if (error.response.status === 401) {
                    navigate("/adminlogin");
                  }
                });
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/adminlogin");
          }
        });

      axios
        .put(
          `http://localhost:18000/admin/match/score/add/${match_id}/${club_match_id}`,
          {
            team_id_a,
            team_id_b,
            score_a: parseInt(scoreA, 10),
            score_b: parseInt(scoreB, 10),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setFinishSubmit(true);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/adminlogin");
          }
        });
    } else {
      setSubmitError(true);
    }
  };

  return (
    <AddMatchResultTemplate
      addMatchResultInfo={{
        club_match_id: club_match_id,
        match_id: match_id,
        team_id_a: team_id_a,
        team_id_b: team_id_b,
        team_name_a: team_name_a,
        team_name_b: team_name_b,
        score_a: scoreA,
        score_b: scoreB,
        teamAMember: teamAMember,
        teamBMember: teamBMember,
        pointGetterA: pointGettersA,
        pointGetterB: pointGettersB,
        pointA: pointA,
        pointB: pointB,
        submitError: submitError,
        handleScoreAChange: handleScoreAChange,
        handleScoreBChange: handleScoreBChange,
        handlePlusPointGetterAChange: handlePlusPointGetterAChange,
        handlePlusPointGetterBChange: handlePlusPointGetterBChange,
        handleMinusPointGetterAChange: handleMinusPointGetterAChange,
        handleMinusPointGetterBChange: handleMinusPointGetterBChange,
        handlesubmit: handlesubmit,
      }}
    />
  );
};

export default AddMatchResult;
