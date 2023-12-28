import Database from "Database";
import Game from "components/raceInterface/Game";
import RaceInterface from "components/raceInterface/RaceInterface";
import useGoogleSheets from "use-google-sheets";
import { useLoading } from "./LoadingContext";
import { useEffect } from "react";

export type PreparsedLaptime = Record<number, number>

function Race(props: {sheetID: string}) {

  if(typeof process.env.REACT_APP_GOOGLE_API_KEY === "undefined") {
    throw new Error("DataRoot: Google API key not found")
  }

  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: props.sheetID,
    sheetsOptions: [{ id: "timing" }]
  });

  const { setLoading } = useLoading()

  useEffect(() => {
    setLoading(loading)
  }, [loading, setLoading])

  if (!error && !loading) {

    Database.parseLapTimes(data[0].data as PreparsedLaptime[])

    return (
      <>
        <Game />
        <RaceInterface />
      </>
    );
  } else {
    return (
      <>
      </>
    )
  }

}

export default Race