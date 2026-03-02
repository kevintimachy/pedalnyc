import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MainNav from './MainNav';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <Box component="main">
        {children}
      </Box >
    </>
  );
}
