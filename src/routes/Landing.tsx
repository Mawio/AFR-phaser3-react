import EventSelector from "components/EventSelector";
import { useLoading } from "components/LoadingContext";
import MainEvent from "components/mainEvent/MainEvent";
import React from "react";

function Landing() {

    const { setLoading } = useLoading();

    setLoading(false)

    return (
        <div>
            <MainEvent />
            <EventSelector />
        </div>
    );
}

export default Landing