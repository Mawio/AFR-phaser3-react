import { Typography } from '@mui/material';
import Background from './Background';
import "./MainEvent.css"
import React, { useEffect, useState } from 'react';

// Create an interface for the size of the window
interface Size {
  width: number;
  height: number;
}

function MainEvent() {

  const [size, setSize] = useState<Size>({width: window.innerWidth, height: window.innerHeight});

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setSize({
      width: width,
      height: height,
    });
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
      <div id='main-event-tag' style={{zoom: size.width / 1920}}>
        <Typography color={'white'} fontSize={"70px"} textAlign={"center"}> British Grand Prix </Typography>
      </div>
    </>
  );
}

export default MainEvent