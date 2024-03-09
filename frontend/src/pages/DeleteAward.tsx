import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DeleteAwardTemplate from "../templates/DeleteAwardTemplate";
import { AwardInfo } from "../type/velmelazo";

const DeleteAward = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [awardList, setAwardList] = React.useState<AwardInfo[]>([]);
  const [deleteAward, setDeleteAward] = React.useState<number[]>([]);
  const [selectEmpty, setSelectEmpty] = React.useState<boolean>(true);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/award`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAwardList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/admin/award");
        }
      });
  }, []);

  const handleSelectDeleteAward = (value: number) => () => {
    const currentIndex = deleteAward.indexOf(value);
    const newDeleteAward = [...deleteAward];

    if (currentIndex === -1 && deleteAward.length < 1) {
      newDeleteAward.push(value);
      setSelectEmpty(false);
    } else {
      newDeleteAward.splice(currentIndex, 1);
      setSelectEmpty(true);
    }
    console.log(deleteAward);

    setDeleteAward(newDeleteAward);
  };

  const handleDeleteAward = () => {
    if (deleteAward.length !== 0) {
      console.log(deleteAward);
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/admin/award/${deleteAward[0]}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          navigate("/admin/award");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401) {
            navigate("/adminlogin");
          }
        });
    } else {
      navigate("/admin/award");
    }
  };

  return (
    <DeleteAwardTemplate
      deleteAwardInfo={{
        awardList,
        handleSelectDeleteAward,
        deleteAward,
        handleDeleteAward,
        selectEmpty,
      }}
    />
  );
};

export default DeleteAward;
