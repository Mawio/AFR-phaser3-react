import "./MainEvent.css"
import React, { useEffect, useState } from 'react'; 

function evaluateSize(width: number, height: number): Size {
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

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
    // eslint-disable-next-line
  }, []);

  //TODO: Check that the true size isn't replaceable with just 100% width and height

  return (
    <div className="dark-overlay">
      <div style={{ overflow: "hidden", display: 'flex', zIndex: -1, position: "absolute", height: "100%", width: "100%" }}>
        <img alt="Background" style={{display:'block', height: trueSize.height, width: trueSize.width}} src='https://i.imgur.com/ITfd9oG.jpg'></img>
      </div>
    </div>
  );
}

export default Background