'use client';

import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { useTheme } from '@mui/material';

export default function MainNav({
  hasSidebar = false,
  drawerWidth = 0,
  onMenuClick,
}) {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: { lg: hasSidebar ? `${drawerWidth}px` : 0 },
        width: {
          lg: hasSidebar ? `calc(100% - ${drawerWidth}px)` : '100%',
        },
        backgroundColor: 'white',
      }}
    >
      <Toolbar>

        {/* 🍔 mobile only */}
        {hasSidebar && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{
              display: { lg: 'none' },
              mr: 2,
              color: 'black',
              '&:hover': {
                backgroundColor: 'white'
              }

            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Logo */}
        <Box sx={{ display: 'flex', gap: 2, mr: 'auto' }}>
          <Link href="/" legacyBehavior passHref>
            <Typography variant="h6" component='a' sx={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: theme.palette.primary.main
            }}>
              PedalNYC
            </Typography>
          </Link>
        </Box>

        {/* Nav links */}
        <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
          {[
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/about', label: 'About' },
          ].map((link) => (
            <Link key={link.href} href={link.href} passHref legacyBehavior>
              <Typography
                component="a"

                sx={{
                  color: 'black', // 🔹 link color
                  textDecoration: 'none', // 🔹 remove underline
                  fontWeight: 'bold',
                  fontSize: '14px',
                  '&:hover': {
                    color: theme.palette.secondary.dark, // 🔹 hover color
                  },
                }}
              >
                {link.label}
              </Typography>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar >
  );
}
