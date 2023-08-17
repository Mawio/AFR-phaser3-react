import { Outlet } from "react-router";
import useGoogleSheets from "use-google-sheets";
import ErrorPage from "./ErrorPage";
import Database from "Database";

function Root() {
    const { data, loading, error } = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsOptions: [{ id: 'flags' }, { id: 'races' }]
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <ErrorPage />;
    }

    Database.parseFlags(data[0].data)
    Database.parseRaces(data[1].data)

    return (
        <Outlet />
    );
}

export default Root