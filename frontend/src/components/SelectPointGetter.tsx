import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Typography,
} from "@mui/material";

import { SelectPointGetterInfo } from "../type/velmelazo";
import { TeamMember } from "../type/velmelazo";
import TextItem from "../parts/TextItem";

type Props = {
  selectPointGetterInfo: SelectPointGetterInfo;
};

const SelectPointGetter: React.FC<Props> = ({ selectPointGetterInfo }) => {
  const customList = (
    items: TeamMember[],
    checked: TeamMember[],
    defaultErr: boolean,
    point: number[],
    handlePlus: (value: TeamMember) => () => void,
    handleMinus: (value: TeamMember) => () => void
  ) => (
    <div>
      {!defaultErr && (
        <Paper sx={{ width: 160 }}>
          <List dense component="div" role="list">
            {items.map((value, index) => {
              const labelId = `transfer-list-item-${value}-label`;

              return (
                <ListItem
                  key={index}
                  role="listitem"
                  sx={{ height: "40px", px: "0px", py: "0px" }}
                >
                  <Grid item xs={2}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid
                          item
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            sx={{
                              my: 0.5,
                              minWidth: "10px",
                            }}
                            size="small"
                            color="info"
                            onClick={handlePlus(value)}
                          >
                            +
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      direction="column"
                    >
                      <Grid
                        item
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <ListItemText id={labelId} primary={value.name} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={2}>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      direction="column"
                    >
                      <Grid
                        item
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <ListItemText id={labelId} primary={point[index]} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={2}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid
                          item
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            sx={{
                              minWidth: "10px",
                            }}
                            size="small"
                            color="info"
                            onClick={handleMinus(value)}
                          >
                            -
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}
    </div>
  );
  return (
    <Grid container sx={{ mb: "30px", mt: "50px" }}>
      <Grid item xs={4}>
        <Grid container alignItems="center" sx={{ ml: "10px" }}>
          <TextItem textItemInfo={{ itemText: "得点者" }} />
        </Grid>
      </Grid>
      <Grid item xs={8}></Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="center" alignItems="center">
          {customList(
            selectPointGetterInfo.teamAMember,
            selectPointGetterInfo.pointGetterA,
            false,
            selectPointGetterInfo.pointA,
            selectPointGetterInfo.handlePlusPointGetterAChange,
            selectPointGetterInfo.handleMinusPointGetterAChange
          )}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent="center" alignItems="center">
          {customList(
            selectPointGetterInfo.teamBMember,
            selectPointGetterInfo.pointGetterB,
            false,
            selectPointGetterInfo.pointB,
            selectPointGetterInfo.handlePlusPointGetterBChange,
            selectPointGetterInfo.handleMinusPointGetterBChange
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SelectPointGetter;
