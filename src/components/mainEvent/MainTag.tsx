import { IconButton, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';
import "./MainEvent.css"

function MainTag(props) {

  const AFR_logo = require('../../assets/AFRlogo.png');

  return (
    <div id='main-tag-div' className="centered" style={{ transform: "translate(-50%,-50%) scale(" + props.zoom + ")" }}>
      <img id={'main-tag-logo'} src={AFR_logo}/>
      <Typography fontWeight={'bold'} width={'max-content'} fontSize={87} fontFamily={'SF Pro Display'} color={'white'} textAlign={"center"} style={{transform: "translateY(-110%)"}}> British Grand Prix </Typography>
      <IconButton component={Link} to={'races/01'} id={'play-icon-button'}>
        <PlayCircleOutlineIcon sx={{color: "white", fontSize: 100}}/>
      </IconButton>
    </div>
  );
}

export default MainTag