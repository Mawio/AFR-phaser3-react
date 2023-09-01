import { driversSelectors } from '/root/afr/src/store/features/driversSlice'
import { Stack } from '@mui/material'
import DriverRow from "./DriverRow"
import { useSelector } from 'react-redux';

const TIMING_TOWER_HEIGHT = 700

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function  TimingTower() {
  const drivers = useSelector(driversSelectors.selectAll)

  const rowHeight = clamp(TIMING_TOWER_HEIGHT / drivers.length, 28, 32)

  const listDrivers = drivers.map(driver =>
    <DriverRow key={driver.id} driver={driver} height={rowHeight}/>
  );

  return (
    <div style={{position: "absolute", top: "40px", left: "32px", maxHeight: TIMING_TOWER_HEIGHT}}>
      <Stack spacing={0}>
        {listDrivers}
      </Stack>
    </div>
  );
}

export default TimingTower