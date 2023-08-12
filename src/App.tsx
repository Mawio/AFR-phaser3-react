import Game from "./game/Game";
import UI from "./UI/UI";
import { Provider } from "react-redux";
import useGoogleSheets from 'use-google-sheets';
import { store } from "./store";
import database from "Database"

function App() {
    const { data, loading, error } = useGoogleSheets({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
      sheetsOptions: [{ id: 'flags' }, { id: 'races'}]
    });
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error!</div>;
    }

    database.parseFlags(data[0].data)
    database.parseRaces(data[1].data)
  
    return (
      <Provider store={store}>
        <Game />
        <UI />
      </Provider>
    );
}

export default App;
