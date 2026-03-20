import { createTheme } from '@mui/material/styles';

const colorTheme = createTheme({
    palette: {
        primary: { main: '#005259', contrastText: '#ffffff' },
        // secondary: { main: '#bcef5b' },
        background: {
            default: '#ffffff',
        },
    },
});


export default colorTheme;
