import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/Store"

function WeatherTag() {

    const information = useSelector((state: RootState) => state.race.weather.information)
    const temperature = useSelector((state: RootState) => state.race.weather.temperature)
    const trackTemperature = useSelector((state: RootState) => state.race.weather.trackTemperature)

    return (
        <div className="race-interface-box" style={
            { color: "#073763", display: "flex", alignItems: "center", flexDirection: "row", marginLeft: "auto", marginRight: "32px", marginTop: "23px", height: "46px", width: "fit-content"}
        }>
            <Typography marginLeft={"10px"} marginRight={"36px"} fontFamily={"Montserrat"} fontSize={21} fontWeight={600} color={"#073763"}> {information} </Typography>
            <Typography marginLeft={"auto"} marginRight={"10px"} fontFamily={"Montserrat"} fontSize={20} fontWeight={600} color={"#073763"}> {temperature} °C ({trackTemperature} °C) </Typography>
        </div>
    );
}

export default WeatherTag