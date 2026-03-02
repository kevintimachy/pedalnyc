// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#36656B',
        },
        secondary: {
            main: '#75B06F',
        },
    },
    custom: {
        gradients: {
            hero: 'linear-gradient(135deg, #75B06F 0%, #DAD887 100%)',
        },
    },
});

export default theme;