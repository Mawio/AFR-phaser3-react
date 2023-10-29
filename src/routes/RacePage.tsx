import React, { useEffect, useState } from "react";
import Race from "components/Race";
import { useParams } from "react-router";
import store from "store/Store";
import Database from "Database";
import { setRace } from "store/features/raceSlice";
import { setDrivers } from "store/features/driversSlice";
import { useLoading } from "components/LoadingContext";

function RacePage() {

    const { raceID } = useParams()

    const url = "https://www.googleapis.com/drive/v2/files?q=title%3D%27" + raceID + "%27+and+%271I9YFGY5UY2RA5r77bbWZZL9wQdw81G1O%27+in+parents&key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&fields=items(id)"
    const [sheetID, setSheetID] = useState("")

    const { setLoading } = useLoading();

    useEffect(() => {

        setLoading(true)

        const getSpreadsheetId = async () => {

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error("")
            }

            const data = await response.json()

            let id : string;

            try{
                id = data["items"][0]["id"]
            } catch(err) {
                throw new Error("Unable to find race number: " + raceID)
            }

            setSheetID(id)

            store.dispatch(setRace(Database.getRace(Number(raceID))))
            store.dispatch(setDrivers(Database.getDrivers(Number(raceID))))
        }

        getSpreadsheetId()
            .catch((err) => {
                throw new Error(err)
            })
    }, [raceID, url]);

    return (
        <>
            {sheetID && <Race sheetID={sheetID} />}
        </>
    );
}

export default RacePage