// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2F89B3',
            light: '#3B50B2'

        },
        secondary: {
            main: '#41D8BF',
            dark: '#225763'
        },
    },
    custom: {
        gradients: {
            hero: 'linear-gradient(135deg, #3B50B2 0%, #41D8BF 100%)',
        },
    },
    shape: {
        borderRadius: 3,
    },

});

export default theme;