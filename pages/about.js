import React from 'react';
import { Box, Container, Typography, Button, Stack, Divider } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const AboutPage = () => {
  const theme = useTheme();
  return (
    <Box component="main" sx={{ width: '100%' }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          width: '100%',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.custom.gradients.hero,
          color: 'white',
          mt: 0,
        }}
      >
        <Container>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
              About PedalNYC
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: 600 }}>
              PedalNYC lets you explore NYC CitiBike trip data in a simple and interactive way.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* ABOUT CONTENT */}
      <Container sx={{ py: 8 }}>
        <Stack spacing={6}>
          {/* Section 1: Purpose */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              What PedalNYC Does
            </Typography>
            <Typography variant="body1">
              PedalNYC is designed for anyone interested in analyzing NYC CitiBike trip data. Explore trips by filtering data based on <strong>birth year</strong>, <strong>date</strong>, and <strong>trip duration</strong>. This allows you to discover trends, patterns, and interesting facts about how people use CitiBike across the city.
            </Typography>
          </Box>

          <Divider />

          {/* Section 2: How to Use It */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              How to Explore
            </Typography>
            <Stack spacing={1} component="ul" sx={{ pl: 3 }}>
              <Typography component="li">
                Filter trips by <strong>birth year</strong> to see age-related trends in CitiBike usage.
              </Typography>
              <Typography component="li">
                Select specific <strong>dates</strong> to explore trip activity over time.
              </Typography>
              <Typography component="li">
                Sort trips by <strong>duration</strong> to see how long people typically ride.
              </Typography>
            </Stack>
          </Box>

          <Divider />

          {/* Section 3: Who It's For */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Who Can Use It
            </Typography>
            <Typography variant="body1">
              PedalNYC is perfect for students, researchers, cycling enthusiasts, or anyone curious about NYC CitiBike trip data. It's a simple way to explore, filter, and learn from real-world trip records without any complicated setup.
            </Typography>
          </Box>

          {/* CTA */}
          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              href="/trips"
              variant="contained"
              size="large"
              sx={{ fontWeight: 'bold' }}
            >
              Explore Trip Data
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box >
  );
};

export default AboutPage;