import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

const navLinks = [
  { label: 'Trips', href: '/trips' },
  { label: 'About', href: '/about' },
];

export default function MainNav() {
  return (
    <>
      <AppBar position="sticky" color="default" elevation={2}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
              <Link href="/" passHref legacyBehavior>
                <Typography
                  component="a"
                  variant="h6"
                  sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none' }}
                >
                  PedalNYC
                </Typography>
              </Link>
              <Stack direction="row" spacing={1}>
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} passHref legacyBehavior>
                    <Button component="a" variant="text" color="inherit" sx={{ textTransform: 'none' }}>
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
