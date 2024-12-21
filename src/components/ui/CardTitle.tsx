import Typography from '@mui/material/Typography';


const CardTitle = ({text}: {text:string}) => {
  // return <p className="font-light">{text}</p>;
  return (
    <Typography
      sx={{ flex: "1 1 100%" }}
      variant="h6"
      id="tableTitle"
      component="div"
      padding={2}
    >
      {text}
    </Typography>
  );
}

export default CardTitle
