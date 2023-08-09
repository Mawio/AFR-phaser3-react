import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from "../../store"
import { Paper } from '@mui/material'

function TimingTower() {
    const drivers = useSelector((state : RootState) => state.drivers, {
      equalityFn: shallowEqual,
    })
    const listDrivers = drivers.map(driver =>
        <li key={driver.name}>
          {driver.name} {driver.distance}
        </li>
      );
      
      return (
        <Paper style = {{
            position: "absolute",
            margin: 15,
            width: "135px"
        }}>
            <ul>{listDrivers}</ul>
          </Paper>
      );
}

export default TimingTower