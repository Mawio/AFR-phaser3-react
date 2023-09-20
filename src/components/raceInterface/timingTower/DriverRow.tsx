import Typography from '@mui/material/Typography';
import NumberedSquare from '../../NumberedSquare'

function Animate({ children, on }) {
    if (on.position < on.previousPosition)
        return <div className="row-up" key={on.position}>{children}</div>
    else if (on.position > on.previousPosition) {
        return <div className="row-down" key={on.position}>{children}</div>
    } else {
        return <div>{children}</div>
    }
}

function DriverRow(props) {

    const timingInformation = props.driver.position > 1 ? isNaN(Number(props.driver.gap)) ? "" : Number(props.driver.gap).toFixed(3) : "Leader"

    return (
        <Animate on={props.driver}>
            <div style={{ alignItems: 'center', display: "flex", flexDirection: "row" }}>
                <div style={{ alignItems: 'center', display: "flex", flexDirection: "row", position: "relative", background: "rgba(232, 241, 250, 0.71)", height: props.height, width: 175, borderLeft: "solid 1px #073763" }}>
                    <NumberedSquare
                        number={props.driver.position}
                        color="#133663"
                        size={26}
                    ></NumberedSquare>
                    <Typography fontSize={"24px"} color={"#133663"} marginLeft={3}>{props.driver.name} </Typography>
                </div>
                <div style={{ alignItems: 'center', display: "flex", flexDirection: "row", position: "relative", background: "rgba(207, 226, 243, 0.71)", height: props.height, width: 130, borderRight: "solid 1px #073763" }}>
                    <Typography marginLeft={3}> {timingInformation} </Typography>
                </div>
            </div>
        </Animate>
    )
}

export default DriverRow