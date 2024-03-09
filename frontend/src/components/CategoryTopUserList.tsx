import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { CategoryTopUser } from "../type/velmelazo";
import TextItem from "../parts/TextItem";
import BaseButton from "../parts/BaseButton";

const CategoryTopUserList = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [resisterAwardUser, setResisterAwardUser] = React.useState<number[]>(
    []
  );
  const [resisterAwardID, setResisterAwardID] = React.useState<number[]>([]);
  const [categoryTopUser, setCategoryTopUser] = React.useState<
    CategoryTopUser | undefined
  >();

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/award/categorytop`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCategoryTopUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });
  }, []);

  const handleMom = (id: number, value: number) => () => {
    const currentIndex = resisterAwardID.indexOf(id);
    const newResisterAwardID = [...resisterAwardID];
    const newResisterAwardUser = [...resisterAwardUser];

    if (currentIndex === -1 && resisterAwardID.length < 1) {
      newResisterAwardID.push(id);
      newResisterAwardUser.push(value);
    } else {
      newResisterAwardID.splice(currentIndex, 1);
      newResisterAwardUser.splice(currentIndex, 1);
    }
    console.log(newResisterAwardID);
    console.log(newResisterAwardUser);

    setResisterAwardID(newResisterAwardID);
    setResisterAwardUser(newResisterAwardUser);
  };

  const customList = (items: CategoryTopUser | undefined) =>
    items === undefined ? (
      <div></div>
    ) : (
      <Paper sx={{ width: 250 }}>
        <List dense component="div" role="list">
          <ListItem
            key={items.all_top_user_id}
            role="listitem"
            onClick={handleMom(1, items.all_top_user_id)}
            sx={{ height: "40px", px: "0px", py: "0px" }}
          >
            <ListItemIcon>
              <Checkbox
                checked={resisterAwardID.indexOf(1) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `${items.all_top_user_id}`,
                }}
              />
            </ListItemIcon>
            <ListItemText
              id={`${items.all_top_user_id}`}
              primary={
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ fontsize: "40px", textAlign: "right" }}>
                      全体：
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ fontsize: "40px", textAlign: "center" }}>
                      {items.all_top_user_name}
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
          <ListItem
            key={items.gk_top_user_id}
            role="listitem"
            onClick={handleMom(2, items.gk_top_user_id)}
            sx={{ height: "40px", px: "0px", py: "0px" }}
          >
            <ListItemIcon>
              <Checkbox
                checked={resisterAwardID.indexOf(2) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `${items.gk_top_user_id}`,
                }}
              />
            </ListItemIcon>
            <ListItemText
              id={`${items.gk_top_user_id}`}
              primary={
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ fontsize: "40px", textAlign: "right" }}>
                      GK：
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ fontsize: "40px", textAlign: "center" }}>
                      {items.gk_top_user_name}
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
          <ListItem
            key={items.df_top_user_id}
            role="listitem"
            onClick={handleMom(3, items.df_top_user_id)}
            sx={{ height: "40px", px: "0px", py: "0px" }}
          >
            <ListItemIcon>
              <Checkbox
                checked={resisterAwardID.indexOf(3) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `${items.df_top_user_id}`,
                }}
              />
            </ListItemIcon>
            <ListItemText
              id={`${items.df_top_user_id}`}
              primary={
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ fontsize: "40px", textAlign: "right" }}>
                      DF：
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ fontsize: "40px", textAlign: "center" }}>
                      {items.df_top_user_name}
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
          <ListItem
            key={items.of_top_user_id}
            role="listitem"
            onClick={handleMom(4, items.of_top_user_id)}
            sx={{ height: "40px", px: "0px", py: "0px" }}
          >
            <ListItemIcon>
              <Checkbox
                checked={resisterAwardID.indexOf(4) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `${items.of_top_user_id}`,
                }}
              />
            </ListItemIcon>
            <ListItemText
              id={`${items.of_top_user_id}`}
              primary={
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ fontsize: "40px", textAlign: "right" }}>
                      OF：
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ fontsize: "40px", textAlign: "center" }}>
                      {items.of_top_user_name}
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
          <ListItem
            key={items.goal_top_user_id}
            role="listitem"
            onClick={handleMom(5, items.goal_top_user_id)}
            sx={{ height: "40px", px: "0px", py: "0px" }}
          >
            <ListItemIcon>
              <Checkbox
                checked={resisterAwardID.indexOf(5) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `${items.goal_top_user_id}`,
                }}
              />
            </ListItemIcon>
            <ListItemText
              id={`${items.goal_top_user_id}`}
              primary={
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={4}>
                    <Typography sx={{ fontsize: "40px", textAlign: "right" }}>
                      得点：
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ fontsize: "40px", textAlign: "center" }}>
                      {items.goal_top_user_name}
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
        </List>
      </Paper>
    );

  const handleToResisterAward = () => {
    let tempAwardName = "";
    const currentDate = new Date();
    let tempYear = currentDate.getFullYear();

    if (currentDate.getMonth() + 1 >= 1 && currentDate.getMonth() + 1 <= 3) {
      tempYear = currentDate.getFullYear() - 1;
    }

    if (resisterAwardID[0] === 1) {
      tempAwardName = `${tempYear}年度年間最優秀選手`;
    } else if (resisterAwardID[0] === 2) {
      tempAwardName = `${tempYear}年度年間最優秀GK`;
    } else if (resisterAwardID[0] === 3) {
      tempAwardName = `${tempYear}年度年間最優秀DF`;
    } else if (resisterAwardID[0] === 4) {
      tempAwardName = `${tempYear}年度年間最優秀OF`;
    } else if (resisterAwardID[0] === 5) {
      tempAwardName = `${tempYear}年度年間得点王`;
    }
    navigate("/admin/award/resister", {
      state: {
        user_id: resisterAwardUser[0],
        temp_award_name: tempAwardName,
      },
    });
  };

  const handleToDeleteAward = () => {
    navigate("/admin/award/delete");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Grid
          container
          alignItems="center"
          sx={{ ml: "50px", mt: "50px", mb: "50px" }}
        >
          <TextItem textItemInfo={{ itemText: "Category of Top" }} />
        </Grid>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          {customList(categoryTopUser)}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid xs={2}></Grid>
          <Grid
            item
            xs={4}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <BaseButton
              baseButton={{
                buttonText: "削除",
                onClick: handleToDeleteAward,
                width: "80px",
                height: "40px",
                mt: "40px",
                mb: "100px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <BaseButton
              baseButton={{
                buttonText: "登録",
                onClick: handleToResisterAward,
                width: "80px",
                height: "40px",
                mt: "40px",
                mb: "100px",
              }}
            />
          </Grid>
          <Grid xs={2}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CategoryTopUserList;
