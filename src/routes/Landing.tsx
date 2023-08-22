import EventSelector from "components/EventSelector";
import MainEvent from "components/mainEvent/MainEvent";
import { useVisible } from "./Root";

function Landing() {

    const className = useVisible().visible? "" : "hidden"

    return (
        <div className={className}>
            <MainEvent />
            <EventSelector />
        </div>
    );
}

export default Landing