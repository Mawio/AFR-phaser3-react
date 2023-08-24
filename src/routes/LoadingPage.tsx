import AnimatedLogo from "components/generic/AnimatedLogo";
import { useEffect, useState } from "react";

export default function LoadingPage() {

  const [zoom, setZoom] = useState<number>(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));

  // Listening for the window resize event
  useEffect(() => {
    // This function updates the state thus re-render components
    const resizeHandler = () => {
      setZoom(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));
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