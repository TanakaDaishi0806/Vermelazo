import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BaseButton from "./BaseButton";

type Props = {
  homeUrl: string;
};

const ToHomeButton: React.FC<Props> = ({ homeUrl }) => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <BaseButton
        baseButton={{
          buttonText: "ホームに戻る",
          onClick: () => {
            navigate(homeUrl);
          },
          width: "150px",
          height: "50px",
          mt: "30px",
          mb: "50px",
        }}
      />
    </Grid>
  );
};

export default ToHomeButton;
