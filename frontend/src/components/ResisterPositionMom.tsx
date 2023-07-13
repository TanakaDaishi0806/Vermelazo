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
import { EachPositionMom } from "../type/velmelazo";
import { PositionMom } from "../type/velmelazo";
import TextItem from "../parts/TextItem";
import BaseButton from "../parts/BaseButton";

type Props = {
  eachPositionMom: EachPositionMom;
};

const ResisterPositionMom: React.FC<Props> = ({ eachPositionMom }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [positionMember, setPositionMember] = React.useState<TeamMember[]>([]);
  const [mom, setMom] = React.useState<TeamMember[]>([]);
  const [defaultMom, setDefaultMom] = React.useState<PositionMom[]>([]);
  const [defaultError, setDefaultError] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(eachPositionMom.getUrlPositionMember, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPositionMember(response.data);
        axios
          .get(eachPositionMom.getUrlPositionMom, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(response.data);
            setDefaultMom(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    console.log(count);
    if (defaultMom.length > eachPositionMom.position - 1 && !defaultError) {
      const dmom: TeamMember = {
        team_id: 0,
        club_match_id: defaultMom[eachPositionMom.position - 1].club_match_id,
        user_id: defaultMom[eachPositionMom.position - 1].user_id,
        name: defaultMom[eachPositionMom.position - 1].name,
        furigana: defaultMom[eachPositionMom.position - 1].furigana,
        position: defaultMom[eachPositionMom.position - 1].position,
        experience: defaultMom[eachPositionMom.position - 1].experience,
      };
      const newMom = [...mom];
      newMom.push(dmom);
      console.log(dmom);
      console.log(newMom[eachPositionMom.position - 1]);
      setMom(newMom);
      setDefaultError(true);
    } else {
      setCount(count + 1);
      if (count >= 1) {
        setDefaultError(true);
      }
    }
  }, [defaultMom]);

  const handleMom = (value: TeamMember) => () => {
    const currentIndex = mom.indexOf(value);
    const newMom = [...mom];

    if (currentIndex === -1 && mom.length < 1) {
      newMom.push(value);
    } else {
      newMom.splice(currentIndex, 1);
      newMom.push(value);
    }
    console.log(mom);

    setMom(newMom);
  };

  const customList = (items: TeamMember[]) => (
    <div>
      {defaultError && (
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
                      checked={
                        mom.length !== 0
                          ? mom[0].user_id === value.user_id
                            ? true
                            : false
                          : false
                      }
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
      )}
    </div>
  );

  const handlesubmit = () => {
    if (mom.length === 1) {
      axios
        .post(
          eachPositionMom.postUrl,
          {
            club_match_id: eachPositionMom.club_match_id,
            position: eachPositionMom.position,
            user_id: mom[0].user_id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          navigate(eachPositionMom.toUrl, {
            state: {
              club_match_id: eachPositionMom.club_match_id,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSubmitError(true);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={4}>
        <Grid container alignItems="center" sx={{ ml: "40px", mt: "40px" }}>
          <TextItem textItemInfo={{ itemText: eachPositionMom.positionText }} />
        </Grid>
      </Grid>
      <Grid item xs={8}></Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          {customList(positionMember)}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          {submitError && (
            <Typography variant="body1" style={{ color: "red" }}>
              OFのMOMを1人選択してください
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

export default ResisterPositionMom;
