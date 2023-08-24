import { useEffect, useState } from "react";
import "./AnimatedLogo.css"

function AnimatedLogo(props) {
    const AFR_logo = require('../../assets/AFRlogo.png');

    return (
        <>
            <img className="centered" alt={"AFR Logo"} src={AFR_logo} style={{ transform: "translate(-50%,-50%) scale(" + (props.zoom * 0.2) + ")" }} />
            <svg
                style={{ transform: "translate(-50%,-50%) scale(" + (props.zoom * 2) + ")" }}
                className="centered"
                width="29.343887mm"
                height="13.241855mm"
                viewBox="0 0 1081.4406 488.01549"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <defs
                    id="defs1" />
                <path
                    id="outline"
                    fill="none"
                    stroke="#83a7c9"
                    strokeWidth="30"
                    d="m 253.84005,0.49999999 c 0,0 2,0 2,0 4.19,7.00000001 10.94,9.56000001 18,13.25000001 0,0 27,14.75 27,14.75 4.2,2.38 9.1,4.2 12.1,8.1 0,0 25.76,45.9 25.76,45.9 0,0 42.84,77 42.84,77 0,0 25.3,45 25.3,45 0,0 0,-147 0,-147 0,0 0,-31 0,-31 0,-2.54 -0.44,-9.55 1.02,-11.4 1.57,-1.98 5.68,-1.6 7.98,-1.6 0,0 441,0 441,0 0,0 12,0.91 12,0.91 21.7,1.49 42.43,6.58 62,16.36 0,0 28,17.3 28,17.3 23.3,13.41 41.26005,19.86 62.00005,38.6 26.08,23.57 45.94,66.44 46,101.83 0,0 0,19 0,19 -0.3,25.37 -12.74,57.58 -27.43,78 -5.72,7.95 -11.08,13.47 -18.57,19.72 -2.76,2.3 -8.26,5.54 -8.62,9.29 -0.23,2.46 3.72,11.18 4.81,13.99 0,0 12.61,32 12.61,32 0,0 35.4,87 35.4,87 3.66,9.07 14.37,32.09 15.8,39.87 0,0 -92.00005,0 -92.00005,0 0,0 -7,0 -7,0 0,0 -22,-11.62 -22,-11.62 0,0 -24,-13.03 -24,-13.03 0,0 -11.35,-5.8 -11.35,-5.8 0,0 -8.42,-17.42 -8.42,-17.42 0,0 -19.54,-44 -19.54,-44 0,0 -12.99,-29 -12.99,-29 0,0 -6.7,-17 -6.7,-17 0,0 -34,0 -34,0 0,0 0,138 0,138 0,0 -91,0 -91,0 -10.69,-0.02 -15.86,-4.42 -25,-9.58 0,0 -21,-11.42 -21,-11.42 -5.94,-3.38 -12.05,-7.6 -19,-8 0,0 0,-139 0,-139 0,0 -123,0 -123,0 0,0 0,168 0,168 0,0 -109,0 -109,0 -10.19,-0.02 -14.27,-3.66 -23,-8.58 0,0 -26,-14.2 -26,-14.2 0,0 -9,-4.86 -9,-4.86 -3.06,-1.3 -5.51,-1.02 -7.68,-3.65 0,0 -16.32,-27.71 -16.32,-27.71 -7.06,-12.27 -6.26,-12.98 -16,-13 0,0 -133,0 -133,0 -9.95,0.02 -8.8,0.66 -17.4,15 0,0 -24.2,40 -24.2,40 -2.26,3.77 -7.94,14.87 -11.58,16.4 -1.72,0.72 -4.91,0.6 -6.82,0.6 0,0 -95.999998,0 -95.999998,0 -10.86,-0.02 -14.73,-3.73 -24,-9 0,0 -24,-13.25 -24,-13.25 -8.22,-4.32 -9.3,-6.66 -19.0000001,-6.75 0,0 30.7000001,-56 30.7000001,-56 0,0 62,-112 62,-112 0,0 108.439998,-196 108.439998,-196 z" />
            </svg>
        </>
    )
}

export default AnimatedLogo