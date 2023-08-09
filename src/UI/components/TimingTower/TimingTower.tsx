import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from "@store"
import { Paper, Stack } from '@mui/material'
import DriverRow from "./DriverRow"

function TimingTower() {
    const drivers = useSelector((state : RootState) => state.drivers, {
      equalityFn: shallowEqual,
    })
    const listDrivers = drivers.map(driver =>
        <DriverRow driver={driver} />
      );
      
      return (
        <Paper style = {{
            position: "absolute",
            margin: 15,
            width: "135px"
        }}>
            <Stack spacing={1}>
              {listDrivers}
            </Stack>
          </Paper>
      );
} 

export default TimingTower