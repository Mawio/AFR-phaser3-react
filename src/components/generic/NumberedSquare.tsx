import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function NumberedSquare(props) {
    return <Box sx={{
        backgroundColor: props.color,
        height: 'fit-content',
        width: 'fit-content',
        transform: "scale(" + props.size + ")"
    }}><Typography align='center' color={'white'} fontSize={"30px"} marginX={1.4}>{props.number}</Typography></Box>
}

export default NumberedSquare