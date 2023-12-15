import { Outlet } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Database from "Database";
import React, { useEffect } from "react";
import { createContext } from 'react';
import { useLoading } from "components/LoadingContext";

export const zoomContext = createContext(1);

export interface PreparsedRace{
    raceID: number, 
    location: string, 
    name: string, 
    series: string, 
    track: string, 
    weather: string, 
    week: string, 
    year: string
}

export interface PreparsedResult{
    raceID: number,
    number: string,
    driver: string,
    q: string,
    team: string,
    tire: string,
    engine: string,
    color1: string,
    color2: string,
}

function DataRoot() {

    const { loading: g_loading, setLoading } = useLoading();

    if(typeof process.env.REACT_APP_GOOGLE_API_KEY === "undefined") {
        throw new Error("DataRoot: Google API key not found")
    }

    if(typeof process.env.REACT_APP_GOOGLE_SHEETS_ID === "undefined") {
        throw new Error("DataRoot: Google Sheets ID not found")
    }

    const { data, loading, error } = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsOptions: [{ id: 'flags' }, { id: 'races' }, { id: 'results' }]
    });

    useEffect(() => {
        if(!loading && !error) {
            Database.parseFlags(data[0].data as { url: string, location: string }[])
            Database.parseRaces(data[1].data as PreparsedRace[])
            Database.parseResults(data[2].data as PreparsedResult[])
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