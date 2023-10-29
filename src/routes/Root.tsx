import React, { useEffect, useState } from "react";
import { createContext } from 'react';
import { LoadingProvider } from "../components/LoadingContext";
import DataRoot from "./DataRoot";

export const zoomContext = createContext(1);

function Root() {

    const [zoom, setZoom] = useState<number>(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));

    // Listening for the window resize event
    useEffect(() => {
        // This function updates the state thus re-render components
        const resizeHandler = () => {
            setZoom(Math.min(window.innerHeight / 1080, window.innerWidth / 1920));
        };

        window.addEventListener('resize', resizeHandler);

        // Cleanup function
        // Remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);

    return (
        <LoadingProvider>
            <zoomContext.Provider value={zoom}>
                <DataRoot />
            </zoomContext.Provider>
        </LoadingProvider>
    )
}

export default Root