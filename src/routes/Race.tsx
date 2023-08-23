import Game from "components/raceInterface/Game";
import RaceInterface from "components/raceInterface/RaceInterface";
import { usePreloading } from "./Root";

function Race() {

  if(usePreloading().preloading) 
    return <></>
  
  
  return (
    <>
      <Game />
      <RaceInterface />
    </>
  );
}

export default Race