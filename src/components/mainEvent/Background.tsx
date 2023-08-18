import { Player, ControlBar, Shortcut, BigPlayButton } from 'video-react';
import "./MainEvent.css"
import React, { useEffect, useState } from 'react';

function evaluateSize(width, height) : Size {
  if((width / height) > (16/9)) {
    return {width: width, height: width*9/16}
  } else {
    console.log({height: height, width: height*16/9})
    return {height: height, width: height*16/9}
  }
}

interface Size {
  width: number;
  height: number;
}

function Background() {

  // The size of the window
  const [size, setSize] = useState<Size>({width: window.innerWidth, height: window.innerHeight});
  let trueSize : Size = evaluateSize(size.width, size.height)

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    const width = window.outerWidth;
    const height = window.outerHeight

    setSize({
      width: width,
      height: height,
    });
    
    console.log(evaluateSize(width, height))
    trueSize = evaluateSize(width, height)
    console.log(trueSize.width + "x" + trueSize.height)
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
    <div className="dark-overlay">
      <div style={{overflow:"hidden", display:'flex', zIndex:-1, position: "absolute", height: "100%", width: "100%"}}>
        <Player
          playsInline
          src="https://drive.google.com/uc?export=download&id=1btkqOmFPkwISuagpABcJdTLYdZWoyXYA"
          autoPlay loop muted
          fluid={false}
          height={trueSize.height}
          width={trueSize.width}
        >
          <ControlBar disableCompletely={true} />
          <Shortcut clickable={false} dblclickable={false}/>
          <BigPlayButton className="big-play-button" />
        </Player>
        </div>
      </div>
  );
}

export default Background