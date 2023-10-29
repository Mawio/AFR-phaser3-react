import Database from "Database";
import Game from "components/raceInterface/Game";
import RaceInterface from "components/raceInterface/RaceInterface";
import LoadingPage from "routes/LoadingPage";
import useGoogleSheets from "use-google-sheets";
import { useLoading } from "./LoadingContext";
import { useEffect } from "react";

function Race(props) {

  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: props.sheetID,
    sheetsOptions: [{ id: "timing" }]
  });

  const { setLoading } = useLoading()

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  if (!error && !loading) {

    Database.parseLapTimes(data[0].data)

    return (
      <>
        <Game />
        <RaceInterface />
      </>
    );
  }

}

export default Race