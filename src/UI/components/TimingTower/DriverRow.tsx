function DriverRow(props) {

    return <span> {props.driver.position} {props.driver.name} {props.driver.distance} </span>;
}

export default DriverRow