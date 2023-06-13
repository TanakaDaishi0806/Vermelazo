import React from "react";
import { Button } from "@mui/material";

import { ColorButtonInfo } from "../type/velmelazo";

type Props = {
  colorButton: ColorButtonInfo;
};

const ColorButton: React.FC<Props> = ({ colorButton }) => {
  return (
    <Button
      sx={{
        fontSize: "15px",
        mt: colorButton.mt,
        mb: colorButton.mb,
      }}
      variant="contained"
      color={colorButton.buttonColor}
      onClick={colorButton.onClick}
    >
      {colorButton.buttonText}
    </Button>
  );
};

export default ColorButton;
