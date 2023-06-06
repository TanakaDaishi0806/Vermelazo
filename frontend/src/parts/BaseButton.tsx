import React from "react";
import { Button } from "@mui/material";

import { BaseButtonInfo } from "../type/velmelazo";

type Props = {
  baseButton: BaseButtonInfo;
};

const BaseButton: React.FC<Props> = ({ baseButton }) => {
  return (
    <Button
      sx={{
        fontSize: "15px",
        mt: baseButton.mt,
        mb: baseButton.mb,
        width: baseButton.width,
        height: baseButton.height,
      }}
      variant="contained"
      color="primary"
      onClick={baseButton.onClick}
    >
      {baseButton.buttonText}
    </Button>
  );
};

export default BaseButton;
