import { usePreloading } from "./Root";
import React, { useEffect, useState } from "react";
import Race from "components/Race";
import { useParams } from "react-router";
import LoadingPage from "./LoadingPage";
import store from "store/Store";
import Database from "Database";
import { setRace } from "store/features/raceSlice";
import { setDrivers } from "store/features/driversSlice";

function RacePage() {

    const { race } = useParams()
    const preloading = usePreloading().preloading

    const url = "https://www.googleapis.com/drive/v2/files?q=title%3D%27" + race + "%27+and+%271I9YFGY5UY2RA5r77bbWZZL9wQdw81G1O%27+in+parents&key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&fields=items(id)"
    const [sheetID, setSheetID] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getSpreadsheetId = async () => {

            if(preloading) return

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("")
            }

            const data = await response.json()
            const id = data["items"][0]["id"]

            if(!id) throw new Error("Unable to find race number: " + race)

            setSheetID(id)

            store.dispatch(setRace(Database.getRace(Number(race))))
            store.dispatch(setDrivers(Database.getDrivers(Number(race))))

            setLoading(false)
        }

        getSpreadsheetId()
            .catch((err) => {
                throw new Error(err)
            })
    }, [race, url, preloading]);

    if (preloading)
        return <></>

    if (loading)
        return <LoadingPage />

    return (
        <Race sheetID={sheetID} />
    );
}

export default RacePage