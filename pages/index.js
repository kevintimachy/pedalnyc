import React from 'react';
import { Container, Box, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import Layout from '@/components/Layout';

const PedalNYCHero = () => {
  const theme = useTheme();
  return (
    <Layout>

      <Box
        component="section"
        sx={{
          width: '100%',
          minHeight: '100vh', // almost full viewport height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.custom.gradients.hero,
          color: 'white',
          mt: 0, // start right after navbar
        }}
      >
        <Container>
          <Stack
            direction="column"
            spacing={4}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            {/* Hero Title */}
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
              Explore NYC CitiBike Trips
            </Typography>

            {/* Hero Subtitle */}
            <Typography variant="h6" sx={{ maxWidth: 600 }}>
              Filter trips by time of day, trip duration, user type, and rider birth year to discover patterns in how people use CitiBike in NYC.
            </Typography>

            {/* CTA Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                size="large"
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: theme.palette.secondary.main
                }}
              >
                Search Trips
              </Button>
              <Button
                component={Link}
                href="/about"
                variant="outlined"
                size="large"
                sx={{ fontWeight: 'bold', borderColor: 'white', color: 'white' }}
              >
                Learn More
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default PedalNYCHero;
