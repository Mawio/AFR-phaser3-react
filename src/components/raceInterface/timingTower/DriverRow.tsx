import Typography from '@mui/material/Typography';
import NumberedSquare from '../../generic/NumberedSquare'

function DriverRow(props) {

    return <div className="driver-row">
    <NumberedSquare 
        number = {props.driver.position}
        color = "#133663"
        size = "0.6"
    ></NumberedSquare>
    <Typography marginLeft={1}>{props.driver.name} {Number(props.driver.distance).toFixed(3)} </Typography>
    </div>
}

export default DriverRow