import { Outlet, useOutletContext } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import ErrorPage from "./ErrorPage";
import Database from "Database";
import React, { useEffect } from "react";

type ContextType = { visible: boolean | null };

function Root() {

    const [visible, setVisible] = React.useState(false);
    const [videoLoaded, setVideoLoaded] = React.useState(false);

    useEffect(() => {
        const videoElement = (document.getElementsByClassName("video-react-video")[0] as HTMLVideoElement)
        if(videoElement) videoElement.onloadeddata = () => {setVideoLoaded(true)}
    }, [])

    const { data, loading, error } = useGoogleSheets({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
        sheetsOptions: [{ id: 'flags' }, { id: 'races' }]
    });

    useEffect(() => {
        setVisible(!loading && videoLoaded)
    }, [loading, videoLoaded])

    if (loading || !videoLoaded) {
        return (
            <>
                <Outlet context={{visible} satisfies ContextType}/>
                <div>Loading...</div>
             </>
        )
    }

    if (error) {
        return <ErrorPage />;
    }

    Database.parseFlags(data[0].data)
    Database.parseRaces(data[1].data)

    return (
        <Outlet context={{visible} satisfies ContextType}/>
    );
}

export default Root

export function useVisible() {
    return useOutletContext<ContextType>();
  }