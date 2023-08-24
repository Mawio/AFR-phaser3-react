import AnimatedLogo from "components/generic/AnimatedLogo";
import { useEffect, useState } from "react";

export default function LoadingPage() {

  const [size, setSize] = useState<{ width: number, heigth: number }>({ width: window.innerWidth, heigth: window.innerHeight });
  const [zoom, setZoom] = useState<number>(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));

  console.log(size.width + " " + size.heigth + " " + zoom)

  // Listening for the window resize event
  useEffect(() => {
    // This function updates the state thus re-render components
    const resizeHandler = () => {
      setSize({ width: window.innerWidth, heigth: window.innerHeight });
      setZoom(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));
      console.log(size.width + " " + size.heigth + " " + zoom)
    };

    window.addEventListener('resize', resizeHandler);

    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return (
    <div>
      <AnimatedLogo zoom={zoom}/>
    </div>
  );
}