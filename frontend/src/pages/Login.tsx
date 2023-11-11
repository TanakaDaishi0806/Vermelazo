import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginTemplate from "../templates/LoginTemplate";
import { ClubMatchGetData } from "../type/velmelazo";

const Login = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [student_id, setStudent_id] = useState("");
  const [student_idEmpty, setStudent_idEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [allEmptyError, setAllEmptyError] = useState(true);
  const [clubMatchList, setClubMatchList] = React.useState<ClubMatchGetData[]>(
    []
  );
  const [processOrder, setProcessOrder] = useState(0);
  const navigate = useNavigate();
  const [progressCLubMatchID, setProgressClubMatchID] =
    React.useState<number>(0);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/home`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setClubMatchList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, [accessToken, navigate]);

  React.useEffect(() => {
    if (clubMatchList.length !== 0) {
      const currentTime = new Date();
      {
        clubMatchList.map((clubMatch, index) => {
          const clubMacthStartTime = new Date(
            clubMatch.year,
            clubMatch.month - 1,
            clubMatch.day,
            12,
            0,
            0
          );
          const clubMacthEndTime = new Date(
            clubMatch.year,
            clubMatch.month - 1,
            clubMatch.day,
            18,
            0,
            0
          );
          if (
            clubMacthStartTime <= currentTime &&
            currentTime <= clubMacthEndTime &&
            !clubMatch.is_finish
          ) {
            setProgressClubMatchID(clubMatch.club_match_id);
          }
        });
      }
      setProcessOrder(1);
    }
  }, [clubMatchList]);

  React.useEffect(() => {
    if (processOrder === 1) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/home`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          if (progressCLubMatchID !== 0) {
            localStorage.setItem("pageNum", "1");
            navigate("/home/match/vote/progress", {
              state: {
                club_match_id: progressCLubMatchID,
              },
            });
          }
          if (progressCLubMatchID === 0) {
            localStorage.setItem("pageNum", "0");
            navigate("/home");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/");
          }
        });
    }
  }, [processOrder]);

  const handleStudent_idChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudent_id(event.target.value);
    handleStudent_idEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handleStudent_idEmptyChange = (student_idValue: string) => {
    if (student_idValue === "") {
      setStudent_idEmpty(true);
    } else {
      setStudent_idEmpty(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    handlePasswordEmptyChange(event.target.value);
    handleAllEmptyError();
  };

  const handlePasswordEmptyChange = (passwordValue: string) => {
    if (passwordValue === "") {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
    }
  };

  const handleAllEmptyError = () => {
    setAllEmptyError(false);
  };

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        student_id,
        password,
      })
      .then((response) => {
        console.log(response.data);
        const accessToken = response.data;
        localStorage.setItem("accessToken", accessToken);
        axios
          .get(`${process.env.REACT_APP_API_URL}/home`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            if (progressCLubMatchID !== 0) {
              localStorage.setItem("pageNum", "1");
              localStorage.setItem(
                "progressClubMatchID",
                progressCLubMatchID.toString()
              );
              navigate("/home/match/vote/progress", {
                state: {
                  club_match_id: progressCLubMatchID,
                },
              });
            }
            if (progressCLubMatchID === 0) {
              localStorage.setItem("pageNum", "0");
              console.log(localStorage.getItem("pageNum"));
              navigate("/home");
            }
          })
          .catch((error) => {
            console.log(error);
            setInputError(true);
          });
      })
      .catch((error) => {
        console.log(error);
        setInputError(true);
      });
  };
  return (
    <div>
      <LoginTemplate
        loginInfo={{
          student_id: student_id,
          password: password,
          student_idEmpty: student_idEmpty,
          passwordEmpty: passwordEmpty,
          inputError: inputError,
          allEmptyError: allEmptyError,
          setInputError: setInputError,
          handleStudent_idChange: handleStudent_idChange,
          handlePasswordChange: handlePasswordChange,
          handleLogin: handleLogin,
        }}
      />
    </div>
  );
};

export default Login;
