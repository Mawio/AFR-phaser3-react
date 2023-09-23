import { Box } from "@mui/material";
import EventTag from "./EventTag";
import RaceTag from "./RaceTag";
import WeatherTag from "./WeatherTag";

function Header() {

    return (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <EventTag />
            <RaceTag />
            <WeatherTag />
        </Box>
    );
}

export default Header