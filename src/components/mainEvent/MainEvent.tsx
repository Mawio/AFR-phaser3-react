import { Typography } from '@mui/material';
import Background from './Background';
import "./MainEvent.css"

function MainEvent() {

  return (
    <>
      <Background />
      <div id='main-event-tag'>
        <Typography color={'white'} fontSize={"70px"} textAlign={"center"}> British Grand Prix </Typography>
      </div>
    </>
  );
}

export default MainEvent