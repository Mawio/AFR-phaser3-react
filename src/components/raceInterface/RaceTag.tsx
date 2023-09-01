import { Typography } from "@mui/material";
import "./RaceInterface.css"
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store"

function RaceTag() {

    const name = useSelector((state: RootState) => state.race.name)

    return (
        <div className="race-interface-box" style={{left: "32px", top:"23px", height:"48px", width:"681px"}}>
            <Typography>{name}</Typography>
        </div>
    );
}

export default RaceTag