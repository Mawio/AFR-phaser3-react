import { useSelector } from 'react-redux'
import { RootState } from "../../store"

function TimingTower() {
    const drivers = useSelector((state : RootState) => state.drivers)
    const listDrivers = drivers.map(driver =>
        <li key={driver.name}>
          {driver.name} {driver.distance}
        </li>
      );
      
      return (
        <div style = {{
            position: "absolute",
            left: 0
        }}>
            <ul>{listDrivers}</ul>
        </div>      
      );
}

export default TimingTower