import React from 'react';
import Layout from '@/components/Layout';
import { Toolbar, Box, Container, Typography, Button, Stack, Divider } from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const AboutPage = () => {
  const theme = useTheme();
  return (
    <Layout>
      <Box component="main" sx={{ width: '100%' }}>
        {/* HERO SECTION */}
        <Toolbar /> {/* ← perfect AppBar offset */}

        <Box
          sx={{
            width: '100%',
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: theme.custom.gradients.hero,
            color: 'white',
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
                Discover NYC CitiBike Trends
              </Typography>
              <Typography variant="body1">
                PedalNYC transforms raw CitiBike trip data into meaningful insights. With our interactive dashboard, you can analyze trips by <strong>birth year</strong>, <strong>time</strong>, and <strong>duration</strong> to uncover trends, patterns, and habits of riders across New York City.
                Whether you are curious about how usage varies by age, the busiest start stations, or peak riding times, PedalNYC makes it easy to explore and visualize.
              </Typography>
            </Box>

            <Divider />

            {/* Section 2: How It Works */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                How to Explore
              </Typography>
              <Stack spacing={1} component="ul" sx={{ pl: 3 }}>
                <Typography component="li">
                  Use the <strong>filter panel</strong> to narrow trips by birth year, trip duration, or specific times to focus on the data that matters to you.
                </Typography>
                <Typography component="li">
                  Visualize trends with interactive charts, including user types, trip durations, and most popular start stations.
                </Typography>
                <Typography component="li">
                  Examine individual trips in the <strong>trips table</strong>, paginate through thousands of records easily.
                </Typography>
              </Stack>
            </Box>

            <Divider />

            {/* Section 3: Who It's For */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Who Can Benefit
              </Typography>
              <Typography variant="body1">
                PedalNYC is ideal for students, researchers, urban planners, cycling enthusiasts, or anyone interested in exploring real-world NYC CitiBike data.
                No setup or coding is required — simply filter, visualize, and discover insights instantly.
              </Typography>
            </Box>

            {/* Section 4: Why It Matters */}
            <Divider />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Why It Matters
              </Typography>
              <Typography variant="body1">
                Understanding CitiBike usage helps reveal city mobility trends, popular commuting patterns, and rider preferences.
                With PedalNYC, you can gain insights that inform research, improve urban planning, or simply satisfy your curiosity about cycling in NYC.
              </Typography>
            </Box>

            {/* CTA */}
            <Box sx={{ mt: 4 }}>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                size="large"
                sx={{ fontWeight: 'bold' }}
              >
                Explore the Dashboard
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box >
    </Layout >
  );
};

export default AboutPage;