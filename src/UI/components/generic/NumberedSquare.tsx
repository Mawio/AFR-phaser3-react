import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function NumberedSquare(props) {
    return <Box sx={{
        backgroundColor: props.color,
        height: 'fit-content',
        width: 'fit-content'
    }}><Typography align='center' color={'white'} fontSize={30} marginX={1.4}>{props.number}</Typography></Box>
}

export default NumberedSquare