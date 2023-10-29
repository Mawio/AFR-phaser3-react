import AnimatedLogo from "components/animatedLogo/AnimatedLogo";
import { useContext } from "react";
import { zoomContext } from "./Root";

export default function LoadingPage() {

  const zoom = useContext(zoomContext)

  return (
    <div>
      <AnimatedLogo zoom={zoom}/>
    </div>
  );
}