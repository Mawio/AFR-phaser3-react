import { Outlet, useOutletContext } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Database from "Database";
import React, { useEffect } from "react";

type ContextType = { preloading: boolean | null };

function Root() {

    const [preloading, setPreloading] = React.useState(true);

    const { data, loading, error } = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsOptions: [{ id: 'flags' }, { id: 'races' }, { id: 'results' }]
    });

    useEffect(() => {
        if(!loading && !error) {
            Database.parseFlags(data[0].data)
            Database.parseRaces(data[1].data)
            Database.parseResults(data[2].data)
        }
        setPreloading(loading)
        // eslint-disable-next-line
    }, [loading])

    if (preloading) {
        return (
            <>
                <Outlet context={{preloading: preloading} satisfies ContextType}/>
                <LoadingPage />
            </>
        )
    }

    if (error) {
        return <ErrorPage />;
    }

    return (
        <Outlet context={{preloading: preloading} satisfies ContextType}/>
    );
}

export default Root

export function usePreloading() {
    return useOutletContext<ContextType>();
  }