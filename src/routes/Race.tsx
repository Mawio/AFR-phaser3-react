import Game from "components/raceInterface/Game";
import RaceInterface from "components/raceInterface/RaceInterface";
import { usePreloading } from "./Root";
import Database from "../Database";
import { useParams } from 'react-router';
import store from "store/Store";
import { setRace } from "store/features/raceSlice";

function Race() {

  let { race } = useParams()
  store.dispatch(setRace(Database.getRace(Number(race))))

  if (usePreloading().preloading)
    return <></>

  return (
    <>
      <Game />
      <RaceInterface />
    </>
  );

}

export default Race