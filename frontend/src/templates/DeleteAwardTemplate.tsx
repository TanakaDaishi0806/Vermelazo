import React from "react";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";
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

import { DeleteAwardInfo } from "../type/velmelazo";
import TextItem from "../parts/TextItem";
import BaseButton from "../parts/BaseButton";
import { AwardInfo } from "../type/velmelazo";
import Maintenance from "../parts/Maintenance";
import { Maximize } from "@mui/icons-material";

type Props = {
  deleteAwardInfo: DeleteAwardInfo;
};

const DeleteAwardTemplate: React.FC<Props> = ({ deleteAwardInfo }) => {
  const customList = (items: AwardInfo[] | null) =>
    items === null ? (
      <div>選択できるアワードがありません</div>
    ) : (
      <Paper sx={{ width: 320 }}>
        <List dense component="div" role="list">
          {items.map((value, index) => {
            return (
              <ListItem
                key={value.award_id}
                role="listitem"
                onClick={deleteAwardInfo.handleSelectDeleteAward(
                  value.award_id
                )}
                sx={{ height: "60px", px: "0px", py: "0px" }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={
                      deleteAwardInfo.deleteAward.indexOf(value.award_id) !== -1
                    }
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": `${value.award_id}`,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={`${value.award_id}`}
                  primary={
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={9}>
                        <Typography
                          sx={{ fontSize: "13px", textAlign: "left" }}
                        >
                          {value.award_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          sx={{ fontSize: "13px", textAlign: "center" }}
                        >
                          {value.user_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );

  return (
    <div>
      <Maintenance />
      <AdminHeader />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <Grid
            container
            alignItems="center"
            sx={{ ml: "40px", mt: "50px", mb: "50px" }}
          >
            <TextItem textItemInfo={{ itemText: "Delete Award" }} />
          </Grid>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            {customList(deleteAwardInfo.awardList)}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center">
            {deleteAwardInfo.selectEmpty &&
              deleteAwardInfo.awardList !== null && (
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="body1" sx={{ color: "red", mt: "20px" }}>
                    消去するアワードを1つ選択してください
                  </Typography>
                </Grid>
              )}
            <Grid
              item
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {deleteAwardInfo.awardList !== null && (
                <BaseButton
                  baseButton={{
                    buttonText: "削除",
                    onClick: deleteAwardInfo.handleDeleteAward,
                    width: "80px",
                    height: "40px",
                    mt: "40px",
                    mb: "100px",
                  }}
                />
              )}
              {deleteAwardInfo.awardList === null && (
                <BaseButton
                  baseButton={{
                    buttonText: "戻る",
                    onClick: deleteAwardInfo.handleDeleteAward,
                    width: "80px",
                    height: "40px",
                    mt: "40px",
                    mb: "100px",
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AdminFooter footerValue={{ vnum: 2 }} />
    </div>
  );
};

export default DeleteAwardTemplate;
