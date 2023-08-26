import Typography from '@mui/material/Typography';
import NumberedSquare from '../../generic/NumberedSquare'

function Animate({ children, on }) {
    if(on.position < on.previousPosition)
        return <div className="row-up" key={on.position}>{children}</div>
    else if(on.position > on.previousPosition) {
        return <div className="row-down" key={on.position}>{children}</div>
    } else {
        return <div>{children}</div>
    }
  }

function DriverRow(props) {

    return (
    <Animate on={props.driver}>
        <div style={{height: props.height}} className="driver-row">
        <NumberedSquare 
            number = {props.driver.position}
            color = "#133663"
            size = {20}
        ></NumberedSquare>
        <Typography marginLeft={3}>{props.driver.name} {Number(props.driver.totalDistance).toFixed(3)} </Typography>
        </div>
    </Animate>
    )
}

export default DriverRow