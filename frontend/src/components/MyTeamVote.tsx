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

import { TeamMember } from "../type/velmelazo";
import { MyTeamVoteInfo } from "../type/velmelazo";
import TextItem from "../parts/TextItem";
import BaseButton from "../parts/BaseButton";
import HomeFooter from "./HomeFooter";

type Props = {
  myTeamVoteInfo: MyTeamVoteInfo;
};

const MyTeamVote: React.FC<Props> = ({ myTeamVoteInfo }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [teamMember, setTeamMember] = React.useState<TeamMember[]>([]);
  const [mom, setMom] = React.useState<TeamMember[]>([]);
  const [submitError, setSubmitError] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(myTeamVoteInfo.getUrlMyTeam, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTeamMember(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  const handleMom = (value: TeamMember) => () => {
    const currentIndex = mom.indexOf(value);
    const newMom = [...mom];

    if (currentIndex === -1 && mom.length < 3) {
      newMom.push(value);
    } else {
      newMom.splice(currentIndex, 1);
    }
    console.log(mom);

    setMom(newMom);
  };

  const customList = (items: TeamMember[]) => (
    <Paper sx={{ width: 160 }}>
      <List dense component="div" role="list">
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={index}
              role="listitem"
              onClick={handleMom(value)}
              sx={{ height: "40px", px: "0px", py: "0px" }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={mom.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  const handlesubmit = () => {
    if (mom.length >= 1) {
      mom.map((member) => {
        axios
          .post(
            myTeamVoteInfo.postUrl,
            {
              club_match_id: myTeamVoteInfo.club_match_id,
              match_id: myTeamVoteInfo.match_id,
              user_id: member.user_id,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            navigate(myTeamVoteInfo.toUrl, {
              state: {
                club_match_id: myTeamVoteInfo.club_match_id,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
              navigate("/");
            }
          });
      });
    } else {
      setSubmitError(true);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Grid
          container
          alignItems="center"
          sx={{ ml: "40px", mt: "40px", mb: "10px" }}
        >
          <TextItem textItemInfo={{ itemText: "MYチーム MOM" }} />
          <TextItem textItemInfo={{ itemText: "(3人まで投票可能)" }} />
        </Grid>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          {customList(teamMember)}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          {submitError && (
            <Typography variant="body1" style={{ color: "red" }}>
              最低1人は選択してください。
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <BaseButton
            baseButton={{
              buttonText: "登録",
              onClick: handlesubmit,
              width: "150px",
              height: "50px",
              mt: "30px",
              mb: "100px",
            }}
          />
        </Grid>
      </Grid>
      <HomeFooter footerValue={{ vnum: 0 }} />
    </Grid>
  );
};

export default MyTeamVote;
