import Typography from '@mui/material/Typography';
import NumberedSquare from '../../NumberedSquare'
import { Driver } from 'Database';
import { PropsWithChildren } from 'react';

function Animate(props: PropsWithChildren<{driver: Driver}>) {
    if(typeof props.driver.previousPosition === "number")
    if (props.driver.position < props.driver.previousPosition)
        return <div className="row-up" key={props.driver.position}>{props.children}</div>
    else if (props.driver.position > props.driver.previousPosition) {
        return <div className="row-down" key={props.driver.position}>{props.children}</div>
    } else {
        return <div>{props.children}</div>
    }
}

function DriverRow(props: {driver: Driver, height: number}) {

    const timingInformation = props.driver.position > 1 ? isNaN(Number(props.driver.gap)) ? "" : Number(props.driver.gap).toFixed(3) : "Leader"

    return (
        <Animate driver={props.driver}>
            <div style={{ alignItems: 'center', display: "flex", flexDirection: "row" }}>
                <div style={{ alignItems: 'center', display: "flex", flexDirection: "row", position: "relative", background: "rgba(232, 241, 250, 0.71)", height: props.height, width: 175, borderLeft: "solid 1px #073763" }}>
                    <NumberedSquare
                        number={props.driver.position}
                        color="#133663"
                        size={26}
                    ></NumberedSquare>
                    <Typography fontSize={"24px"} color={"#133663"} marginLeft={3}>{props.driver.name}</Typography>
                </div>
                <div style={{ alignItems: 'center', display: "flex", flexDirection: "row", position: "relative", background: "rgba(207, 226, 243, 0.71)", height: props.height, width: 130, borderRight: "solid 1px #073763" }}>
                    <Typography marginLeft={3}> {timingInformation} </Typography>
                </div>
            </div>
        </Animate>
    )
}

export default DriverRow