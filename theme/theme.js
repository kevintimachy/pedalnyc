// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#36656B',
            light: '#75B06F'
        },
        secondary: {
            main: '#DAD887',
            light: '#F0F8A4'
        },
    },
    custom: {
        gradients: {
            hero: 'linear-gradient(135deg, #75B06F 0%, #F0F8A4 100%)',
        },
    },
});

export default theme;