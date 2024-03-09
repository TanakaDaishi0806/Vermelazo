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

import { SelectInAllUsersInfo } from "../type/velmelazo";
import { UsersNameInfo } from "../type/velmelazo";

type Props = {
  selectInAllUsersInfo: SelectInAllUsersInfo;
};

const SelectInAllUsers: React.FC<Props> = ({ selectInAllUsersInfo }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [allUsers, setAllUsers] = React.useState<UsersNameInfo[][]>([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/award/allusers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/adminlogin");
        }
      });
  }, []);

  const customList = (items: UsersNameInfo[][]) =>
    items.length === 0 ? (
      <div></div>
    ) : (
      <Grid container item xs={12} sx={{ mt: "30px" }}>
        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          {items[0] === null ? (
            <div></div>
          ) : (
            <Grid item>
              <Grid item sx={{ width: 110, mb: "10px" }}>
                <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
                  GK
                </Typography>
              </Grid>
              <Paper sx={{ width: 110 }}>
                <List dense component="div" role="list">
                  {items[0].map((value, index) => {
                    const labelId = `transfer-list-item-${value.user_id}-label`;

                    return (
                      <ListItem
                        key={index}
                        role="listitem"
                        onClick={selectInAllUsersInfo.handleSelectAwardUser(
                          value.user_id
                        )}
                        sx={{ height: "40px", px: "0px", py: "0px" }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={
                              selectInAllUsersInfo.resisterAwardUser.indexOf(
                                value.user_id
                              ) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={
                            <Typography
                              sx={{ fontSize: "12px", textAlign: "center" }}
                            >
                              {value.name}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          {items[1] === null ? (
            <div></div>
          ) : (
            <Grid item>
              <Grid item sx={{ width: 110, mb: "10px" }}>
                <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
                  DF
                </Typography>
              </Grid>
              <Paper sx={{ width: 110 }}>
                <List dense component="div" role="list">
                  {items[1].map((value, index) => {
                    const labelId = `transfer-list-item-${value.user_id}-label`;

                    return (
                      <ListItem
                        key={index}
                        role="listitem"
                        onClick={selectInAllUsersInfo.handleSelectAwardUser(
                          value.user_id
                        )}
                        sx={{ height: "40px", px: "0px", py: "0px" }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={
                              selectInAllUsersInfo.resisterAwardUser.indexOf(
                                value.user_id
                              ) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={
                            <Typography
                              sx={{ fontSize: "12px", textAlign: "center" }}
                            >
                              {value.name}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Grid
          item
          xs={4}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="left"
        >
          {items[2] === null ? (
            <div></div>
          ) : (
            <Grid item>
              <Grid item sx={{ width: 110, mb: "10px" }}>
                <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
                  OF
                </Typography>
              </Grid>
              <Paper sx={{ width: 110 }}>
                <List dense component="div" role="list">
                  {items[2].map((value, index) => {
                    const labelId = `transfer-list-item-${value.user_id}-label`;

                    return (
                      <ListItem
                        key={index}
                        role="listitem"
                        onClick={selectInAllUsersInfo.handleSelectAwardUser(
                          value.user_id
                        )}
                        sx={{ height: "40px", px: "0px", py: "0px" }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            checked={
                              selectInAllUsersInfo.resisterAwardUser.indexOf(
                                value.user_id
                              ) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={
                            <Typography
                              sx={{ fontSize: "12px", textAlign: "center" }}
                            >
                              {value.name}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
    );

  return (
    <Grid container justifyContent="center" alignItems="center">
      {customList(allUsers)}
    </Grid>
  );
};

export default SelectInAllUsers;
