import {Typography} from "@mui/material";

const ModalTitle = ({text}: {text: string}) => {
  return (
    <Typography
      sx={{
        fontFamily: "Nunito",
      }}
      variant="h6"
      component="h2"
    >
      {text}
    </Typography>
  );
}

export default ModalTitle
