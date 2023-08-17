import { Typography } from '@mui/material';
import Background from './Background';
import "./MainEvent.css"
import React, { useEffect, useState } from 'react';

function MainEvent() {

  const [zoom, setZoom] = useState<number>(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    setZoom(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));
  };

  // Listening for the window resize event
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return (
    <>
      <Background />
      <div id='main-event-tag' style={{zoom: zoom}}>
        <Typography color={'white'} fontSize={"70px"} textAlign={"center"}> British Grand Prix </Typography>
      </div>
    </>
  );
}

export default MainEvent