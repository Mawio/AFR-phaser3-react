import { Outlet } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Database from "Database";
import React, { useEffect } from "react";
import { createContext } from 'react';
import { useLoading } from "components/LoadingContext";

export const zoomContext = createContext(1);

function DataRoot() {

    const { loading: g_loading, setLoading } = useLoading();

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
        // eslint-disable-next-line
    }, [loading])

    return (
        <>
            {g_loading && <LoadingPage />}
            {error && <ErrorPage />}
            {!loading && <Outlet />}
        </>
    )
}

export default DataRoot