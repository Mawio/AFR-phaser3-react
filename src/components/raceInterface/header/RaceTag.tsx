import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store"

function RaceTag() {

    const currentLap = useSelector((state: RootState) => state.race.currentLap)
    const totalLaps = useSelector((state: RootState) => state.race.totalLaps)

    return (
        <div className="race-interface-box" style={{
            color: "#073763",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "23px",
            height: "46px",
            width: "fit-content",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)"
        }}>
            <Typography marginX={"10px"} fontFamily={"Montserrat"} fontSize={25} fontWeight={600} color={"#073763"}> Lap {currentLap}/{totalLaps} </Typography>
        </div>
    );
}

export default RaceTag
