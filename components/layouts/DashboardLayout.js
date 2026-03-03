'use client';

import { useState } from 'react';
import {
    Box,
    Drawer,
    CssBaseline,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MainNav from '../MainNav';

const drawerWidth = 280;
const appBarHeight = 64;

export default function DashboardLayout({ sidebar, children }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggle = () => setMobileOpen((prev) => !prev);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />

            <MainNav
                hasSidebar
                drawerWidth={drawerWidth}
                onMenuClick={handleToggle}
            />

            {/* Sidebar */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? mobileOpen : true}
                onClose={handleToggle}
                ModalProps={{
                    keepMounted: true,
                    style: { zIndex: 1500 },
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        px: 2,
                        pb: 2,
                        pt: isMobile ? 2 : `${appBarHeight}px`, // small top padding on mobile
                        overflowY: 'auto',

                    },
                }}
            >
                {sidebar}
            </Drawer>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pt: `${appBarHeight + 16}px`,
                    width: { lg: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}