import Database from "Database";
import Game from "components/raceInterface/Game";
import RaceInterface from "components/raceInterface/RaceInterface";
import LoadingPage from "routes/LoadingPage";
import useGoogleSheets from "use-google-sheets";

function Race(props) {

  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: props.sheetID,
    sheetsOptions: [{ id: "timing" }]
  });

  if (loading)
    return <LoadingPage />

  if (!error) {

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