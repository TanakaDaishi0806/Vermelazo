import React from "react";
import axios from "axios";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
} from "@mui/material";

import {
  TeamMember,
  ChangeMember,
  TeamMemberListInfo,
} from "../type/velmelazo";
import SelectBox from "../parts/SelectBox";
import BaseButton from "../parts/BaseButton";

type Props = {
  teamMemberListInfo: TeamMemberListInfo;
};

function not(a: readonly TeamMember[], b: TeamMember[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: TeamMember[], b: TeamMember[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const ChangeTeamMemberCard: React.FC<Props> = ({ teamMemberListInfo }) => {
  const defaultTeamLeft = 0;
  const defaultTeamRight = 1;

  const [checked, setChecked] = React.useState<TeamMember[]>([]);
  const [teamNumLeft, setTeamNumLeft] = React.useState(defaultTeamLeft);
  const [teamNumRight, setTeamNumRight] = React.useState(defaultTeamRight);
  const [left, setLeft] = React.useState<TeamMember[]>([]);

  const [right, setRight] = React.useState<TeamMember[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const [defaultLeftErr, setDefaultLeftErr] = React.useState(true);
  const [defaultRightErr, setDefaultRightErr] = React.useState(true);
  const [teamIdList, setTeamIdList] = React.useState<number[]>([]);
  const [firstTeamIdErr, setFirstTeamIdErr] = React.useState(true);
  const [changeMemberList, setChangeMemberList] = React.useState<
    ChangeMember[]
  >([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  React.useEffect(() => {
    setLeft(teamMemberListInfo.teamMemberList[teamNumLeft]);
  }, [teamMemberListInfo.teamMemberList, teamNumLeft]);

  React.useEffect(() => {
    setRight(teamMemberListInfo.teamMemberList[teamNumRight]);
  }, [teamMemberListInfo.teamMemberList, teamNumRight]);

  React.useEffect(() => {
    if (left !== undefined && left.length !== 0) {
      console.log(left);
      setDefaultLeftErr(false);
      teamMemberListInfo.teamMemberList[teamNumLeft] = left;
      teamMemberListInfo.setTeamMemberList(teamMemberListInfo.teamMemberList);
      console.log(teamIdList);
    }
  }, [left]);

  React.useEffect(() => {
    if (right !== undefined && right.length !== 0) {
      setDefaultRightErr(false);
      teamMemberListInfo.teamMemberList[teamNumRight] = right;
      teamMemberListInfo.setTeamMemberList(teamMemberListInfo.teamMemberList);
    }
  }, [right]);

  React.useEffect(() => {
    if (firstTeamIdErr && !defaultRightErr) {
      setFirstTeamIdErr(false);
      const tmp = new Array(teamMemberListInfo.teamMemberList.length);

      teamMemberListInfo.teamMemberList.map((member, index) => {
        tmp[index] = member[0].team_id;
      });

      setTeamIdList(tmp);
    }
  }, [defaultRightErr]);

  const handleTeamNumLeftChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTeamNumLeft(parseInt(event.target.value, 10));
  };

  const handleTeamNumRightChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTeamNumRight(parseInt(event.target.value, 10));
  };

  const handleToggle = (value: TeamMember, items: TeamMember[]) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    let num = 0;
    newChecked.map((mem, index) => {
      const i = items.indexOf(mem);
      if (i !== -1) {
        num++;
      }
    });

    if (currentIndex === -1 && items.length - num >= 2) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    leftChecked.map((member, index) => {
      const newChangeMember: ChangeMember = {
        changeTeamID: teamIdList[teamNumRight],
        userID: member.user_id,
      };
      setChangeMemberList((changeMemberList) => [
        ...changeMemberList,
        newChangeMember,
      ]);
    });
    console.log(changeMemberList);

    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    rightChecked.map((member, index) => {
      const newChangeMember: ChangeMember = {
        changeTeamID: teamIdList[teamNumLeft],
        userID: member.user_id,
      };
      setChangeMemberList((changeMemberList) => [
        ...changeMemberList,
        newChangeMember,
      ]);
    });
    console.log(changeMemberList);
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleChangeTeamMemberSubmit = () => {
    changeMemberList.map((member, index) => {
      axios
        .put(
          `http://localhost:18000/admin/team/change/${teamMemberListInfo.club_match_id}`,
          {
            change_team_id: member.changeTeamID,
            user_id: member.userID,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          teamMemberListInfo.setTeamMemberList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const customList = (items: TeamMember[], defaultErr: boolean) => (
    <div>
      {!defaultErr && (
        <Paper sx={{ width: 150 }}>
          <List dense component="div" role="list">
            {items.map((value, index) => {
              const labelId = `transfer-list-item-${value}-label`;

              return (
                <ListItem
                  key={index}
                  role="listitem"
                  onClick={handleToggle(value, items)}
                  sx={{ height: "40px", px: "0px", py: "0px" }}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ mt: "50px", mb: "50px" }}
    >
      <Grid item xs={6} sx={{ mb: "20px" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <SelectBox
              teamSelectBoxInfo={{
                teamNum: teamMemberListInfo.teamMemberList.length,
                defaultNum: teamNumLeft,
                handleTeamNameSideChange: handleTeamNumLeftChange,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} sx={{ mb: "20px" }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <SelectBox
              teamSelectBoxInfo={{
                teamNum: teamMemberListInfo.teamMemberList.length,
                defaultNum: teamNumRight,
                handleTeamNameSideChange: handleTeamNumRightChange,
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container>{customList(left, defaultLeftErr)}</Grid>
      </Grid>
      <Grid item sx={{ mx: "5px" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            sx={{ my: 0.5, minWidth: "20px" }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5, minWidth: "20px" }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, defaultRightErr)}</Grid>

      <Grid item>
        <BaseButton
          baseButton={{
            buttonText: "変更",
            onClick: handleChangeTeamMemberSubmit,
            width: "150px",
            height: "50px",
            mt: "30px",
            mb: "50px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ChangeTeamMemberCard;
