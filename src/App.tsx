import Race from "./routes/Race";
import { Provider } from "react-redux";
import useGoogleSheets from 'use-google-sheets';
import { store } from "./store/Store";
import database from "Database"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "routes/ErrorPage";

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
      return <ErrorPage />;
    }

    database.parseFlags(data[0].data)
    database.parseRaces(data[1].data)

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Race />,
        errorElement: <ErrorPage />
      },
    ]);
  
    return (
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
}

export default App;