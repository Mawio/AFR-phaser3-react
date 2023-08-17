import { Player, ControlBar, Shortcut, BigPlayButton } from 'video-react';

function Background() {

  return (
    <div className="dark-overlay">
      <div style={{height:"100vh", overflow:"hidden", display:'flex', zIndex:-1, position: "relative"}}>
        <Player
          playsInline
          src="https://drive.google.com/uc?export=download&id=1btkqOmFPkwISuagpABcJdTLYdZWoyXYA"
          autoPlay loop muted
          heigth={"100vh"}
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