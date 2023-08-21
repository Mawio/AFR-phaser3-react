import { driversSelectors } from '/root/afr/src/store/features/driversSlice'
import { Paper, Stack } from '@mui/material'
import DriverRow from "./DriverRow"
import { useSelector } from 'react-redux';

function TimingTower() {
    const drivers = useSelector(driversSelectors.selectAll)
    const listDrivers = drivers.map(driver =>
        <DriverRow key={driver.id} driver={driver} />
      );
      
      return (
        <Paper style = {{
            position: "absolute",
            margin: 15,
            width: "175px"
        }}>
            <Stack spacing={1}>
              {listDrivers}
            </Stack>
          </Paper>
      );
} 

export default TimingTower