import { Typography } from "@mui/material";

import { TextItemInfo } from "../type/velmelazo";

type Props = {
  textItemInfo: TextItemInfo;
};

const TextItem: React.FC<Props> = ({ textItemInfo }) => {
  return (
    <Typography
      sx={{
        fontSize: "20px",
        borderLeft: "3px solid #888888",
        pl: "8px",
      }}
    >
      {textItemInfo.itemText}
    </Typography>
  );
};

export default TextItem;
