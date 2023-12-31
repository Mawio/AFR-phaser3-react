import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function NumberedSquare(props: {color: string, number: number, size: number}) {
    return <Box sx={{
        backgroundColor: props.color,
        height: props.size,
        width: props.size,
        position: "relative",
        left: "10px"
    }}><Typography className='centered' align='center' color={'white'} fontSize={"26px"}>{props.number}</Typography></Box>
}

export default NumberedSquare