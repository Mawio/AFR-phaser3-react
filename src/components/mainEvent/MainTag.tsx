import { Typography } from "@mui/material";
import "./MainEvent.css"

function MainTag(props) {

  const AFR_logo = require('../../assets/AFRlogo.png');

  return (
    <div id='main-tag-div' className="centered" style={{ transform: "translate(-50%,-50%) scale(" + props.zoom + ")" }}>
      <img id={'main-tag-logo'} src={AFR_logo}/>
      <Typography width={'max-content'} variant={'h1'} fontFamily={'SF Pro Display'} color={'white'} textAlign={"center"}> British Grand Prix </Typography>
    </div>
  );
}

export default MainTag