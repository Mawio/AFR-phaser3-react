import { Player, ControlBar, Shortcut, BigPlayButton } from 'video-react';
import "./MainEvent.css"

function Background(props) {

  const differences = {widthDifference: 1920-props.dimensions.width, heigthDifference: 1080-props.dimensions.height}

  return (
    <div className="dark-overlay">
      <div style={{overflow:"hidden", display:'flex', zIndex:-1, position: "absolute"}}>
        <Player
          playsInline
          src="https://drive.google.com/uc?export=download&id=1btkqOmFPkwISuagpABcJdTLYdZWoyXYA"
          autoPlay loop muted
          fluid={false}
          height={window.innerHeight}
          width={window.innerWidth}
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