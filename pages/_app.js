import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme/theme.js';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SWRConfig
        value={{ fetcher: (...args) => fetch(...args).then((res) => res.json()) }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ThemeProvider>
  );
}
