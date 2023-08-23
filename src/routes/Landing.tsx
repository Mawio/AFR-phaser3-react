import EventSelector from "components/EventSelector";
import MainEvent from "components/mainEvent/MainEvent";
import { usePreloading } from "./Root";
import React from "react";

function Landing() {

    if (usePreloading().preloading)
        return (
            <div className={"hidden"}>
                <MainEvent />
                <EventSelector />
            </div>
        );

    return (
        <div>
            <MainEvent />
            <EventSelector />
        </div>
    );
}

export default Landing