import "./MainEvent.css"
import React, { useEffect, useState } from 'react';
import Background from './Background';
import MainTag from './MainTag';

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
      <MainTag zoom={zoom} />
    </>
  );
}

export default MainEvent