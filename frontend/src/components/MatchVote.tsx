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
import { MatchVoteInfo } from "../type/velmelazo";
import TextItem from "../parts/TextItem";
import BaseButton from "../parts/BaseButton";

type Props = {
  matchVoteInfo: MatchVoteInfo;
};

const MatchVote: React.FC<Props> = ({ matchVoteInfo }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [teamAMember, setTeamAMember] = React.useState<TeamMember[]>([]);
  const [teamBMember, setTeamBMember] = React.useState<TeamMember[]>([]);
  const [mom, setMom] = React.useState<TeamMember[]>([]);
  const [submitError, setSubmitError] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(matchVoteInfo.getUrlTeamA, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTeamAMember(response.data);
        axios
          .get(matchVoteInfo.getUrlTeamB, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setTeamBMember(response.data);
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
    <Paper sx={{ width: 150 }}>
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
            matchVoteInfo.postUrl,
            {
              club_match_id: matchVoteInfo.club_match_id,
              match_id: matchVoteInfo.match_id,
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
            navigate(matchVoteInfo.toUrl, {
              state: {
                club_match_id: matchVoteInfo.club_match_id,
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
      <Grid item xs={8}>
        <Grid container alignItems="center" sx={{ ml: "20px", mt: "40px" }}>
          <TextItem textItemInfo={{ itemText: "マッチ MOM" }} />
          <TextItem textItemInfo={{ itemText: "(3人まで投票可能)" }} />
        </Grid>
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={12} sx={{ mt: "30px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h6">
                team{matchVoteInfo.team_name_a}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h6">
                team{matchVoteInfo.team_name_b}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: "10px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container justifyContent="center" alignItems="center">
              {customList(teamAMember)}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="center" alignItems="center">
              {customList(teamBMember)}
            </Grid>
          </Grid>
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
              mb: "50px",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MatchVote;
