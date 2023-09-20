import { Player, ControlBar, Shortcut, BigPlayButton } from 'video-react';
import "./MainEvent.css"
import React, { useEffect, useState } from 'react'; 

function evaluateSize(width, height): Size {
  if ((width / height) > (16 / 9)) {
    return { width: width, height: width * 9 / 16 }
  } else {
    return { height: height, width: height * 16 / 9 }
  }
}

interface Size {
  width: number;
  height: number;
}

function Background() {

  // The size of the window
  const [size, setSize] = useState<Size>({ width: window.innerWidth, height: window.innerHeight });
  let trueSize: Size = evaluateSize(size.width, size.height)

  const [videoLoaded, setVideoLoaded] = React.useState(false);

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    const overlay = document.getElementsByClassName("dark-overlay")[0]
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;

    setSize({
      width: width,
      height: height,
    });

    trueSize = evaluateSize(width, height)
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);

    const videoElement = (document.getElementsByClassName("video-react-video")[0] as HTMLVideoElement)
    if (videoElement) videoElement.onloadeddata = () => { setVideoLoaded(true) }

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dark-overlay">
      <div style={{ overflow: "hidden", display: 'flex', zIndex: -1, position: "absolute", height: "100%", width: "100%" }}>
        <div style={{display: videoLoaded?'block':'none'}}>
          <Player
            playsInline
            src={"https://www.googleapis.com/drive/v3/files/1sd-gbMmLxouUm7E6SilYhiAiTpVHWMsQ?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&alt=media"}
            //src={"https://drive.google.com/uc?export=download&id=1EfI7TFRj3UFAH4FUATT5fCEAMpTJ5fqj"}
            autoPlay loop muted
            fluid={false}
            height={trueSize.height}
            width={trueSize.width}
          >
            <ControlBar disableCompletely={true} />
            <Shortcut clickable={false} dblclickable={false} />
            <BigPlayButton className="big-play-button" />
          </Player>
        </div>
        <img alt="Background" style={{display: videoLoaded?'none':'block', height: trueSize.height, width: trueSize.width}} src='https://i.imgur.com/ITfd9oG.jpg'></img>
      </div>
    </div>
  );
}

export default Background