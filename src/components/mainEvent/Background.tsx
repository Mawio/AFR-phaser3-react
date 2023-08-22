import { Player, ControlBar, Shortcut, BigPlayButton } from 'video-react';
import "./MainEvent.css"
import React, { useEffect, useState } from 'react';

function evaluateSize(width, height) : Size {
  if((width / height) > (16/9)) {
    return {width: width, height: width*9/16}
  } else {
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
    const overlay = document.getElementsByClassName("dark-overlay")[0]
    const width = overlay.clientWidth;
    const height = overlay.clientHeight

    setSize({
      width: width,
      height: height,
    });
    
    trueSize = evaluateSize(width, height)
  };

  // Listening for the window resize event
  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dark-overlay">
      <div style={{overflow:"hidden", display:'flex', zIndex:-1, position: "absolute", height: "100%", width: "100%"}}>
        <Player
          playsInline
          src={"https://www.googleapis.com/drive/v3/files/1sd-gbMmLxouUm7E6SilYhiAiTpVHWMsQ?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&alt=media"}
          autoPlay loop muted
          fluid={false}
          height={trueSize.height}
          width={trueSize.width}
          poster={"https://i.imgur.com/1Uyxnrn.jpg"}
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