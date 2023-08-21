import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ListUserInfoTemplate from "../templates/ListUserInfoTemplate";
import { UserInfo } from "../type/velmelazo";

const ListUserInfo = () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const ui = {
    name: "",
    furigana: "",
    student_id: "",
    grade: 0,
    mailaddress: "",
    position: 0,
    experience: 0,
  };
  const [userInfo, setUserInfo] = React.useState<UserInfo>(ui);

  const handleChangeUserInfo = () => {
    navigate("/home/change/userinfo", {
      state: {
        preName: userInfo.name,
        preFurigana: userInfo.furigana,
        preStudent_id: userInfo.student_id,
        preGrade: userInfo.grade,
        preMailaddress: userInfo.mailaddress,
        prePosition: userInfo.position,
        preExperience: userInfo.experience,
      },
    });
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:18000/home/userinfo/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);
  return (
    <ListUserInfoTemplate
      userInfoChange={{ userInfo: userInfo, handle: handleChangeUserInfo }}
    />
  );
};

export default ListUserInfo;
