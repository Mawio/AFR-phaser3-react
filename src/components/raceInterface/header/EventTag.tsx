import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store"

function EventTag() {

    const [name, year, track] = useSelector((state: RootState) => [state.race.name, state.race.year, state.race.track] )

    return (
        <div className="race-interface-box" style={{color:"#073763", display: "flex", alignItems: "center", flexDirection: "row", marginLeft: "32px", marginTop:"23px", height:"48px", width:"681px"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "baseline"}}>
                <Typography marginLeft={"10px"} fontFamily={"Montserrat"} fontSize={28} fontWeight={900}>{name}</Typography>
                <Typography marginLeft={"13px"} fontFamily={"Montserrat"} fontSize={21} fontWeight={500} color={"#073763"}>{year}</Typography>
                <Typography marginLeft={"10px"} fontFamily={"Montserrat"} fontSize={21} fontWeight={500} color={"#073763"}>{track}</Typography>
            </div>
        </div>
    );
}

export default EventTag