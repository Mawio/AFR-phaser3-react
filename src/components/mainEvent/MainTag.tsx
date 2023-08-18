import { Typography } from "@mui/material";
import "./MainEvent.css"

function MainTag(props) {

  return (
    <div className="centered" style={{zoom: props.zoom}}>
        <Typography color={'white'} fontSize={"70px"} textAlign={"center"}> British Grand Prix </Typography>
    </div>
  );
}

export default MainTag