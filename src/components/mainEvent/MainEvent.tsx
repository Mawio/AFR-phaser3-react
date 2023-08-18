import "./MainEvent.css"
import React, { useEffect, useState } from 'react';
import Background from './Background';
import MainTag from './MainTag';

interface Size {
  width: number;
  height: number;
}

function MainEvent() {

  const [size, setSize] = useState<Size>({height: window.innerHeight, width: window.innerWidth});
  let zoom : number = Math.min(window.innerHeight / 1080, window.innerWidth / 1920)

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    setSize({height: window.innerHeight, width: window.innerWidth});
    zoom = Math.min(window.innerHeight / 1080, window.innerWidth / 1920)
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
      <Background dimensions={size}/>
      <MainTag zoom={zoom} />
    </>
  );
}

export default MainEvent