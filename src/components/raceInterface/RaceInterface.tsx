import TimingTower from "./timingTower/TimingTower"
import "./RaceInterface.css"
import Header from "./header/Header";
import Commentary from "./Commentary";

function RaceInterface() {

    return (
        <>
            <Header />
            <TimingTower />
            <Commentary />
        </>
    );
}

export default RaceInterface