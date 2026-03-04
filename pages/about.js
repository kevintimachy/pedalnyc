'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TripModal from '@/components/TripModal';
import {
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const fetcher = (url) => fetch(url).then((res) => res.json());

const AboutPage = () => {
  const theme = useTheme();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Sample trips state
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch a few trips on mount
  useEffect(() => {
    async function loadTrips() {
      try {
        const data = await fetcher(
          `${process.env.NEXT_PUBLIC_API_URL}/api/trips?page=4&perPage=5`
        );
        setTrips(data.trips ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTrips();
  }, []);

  const handleRowClick = (trip) => {
    setSelectedTrip(trip);
    setModalOpen(true);
  };

  return (
    <Layout>
      <Box component="main" sx={{ width: '100%' }}>
        {/* HERO SECTION */}
        <Toolbar />

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

            {/* Section 2: Sample Trips Table with Modal */}
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Sample Trips
              </Typography>
              {loading ? (
                <CircularProgress />
              ) : trips.length === 0 ? (
                <Typography>No trips found.</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Bike ID</TableCell>
                        <TableCell>Start Station</TableCell>
                        <TableCell>End Station</TableCell>
                        <TableCell>Duration (Minutes)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trips.map((trip) => (
                        <TableRow
                          key={trip._id}
                          hover
                          sx={{ cursor: 'pointer' }}
                          onClick={() => handleRowClick(trip)}
                        >
                          <TableCell>{trip.bikeid}</TableCell>
                          <TableCell>{trip['start station name']}</TableCell>
                          <TableCell>{trip['end station name']}</TableCell>
                          <TableCell>
                            {(trip.tripduration / 60).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>

            <Divider />

            {/* Section 3: How It Works */}
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

            {/* Section 4: CTA */}
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
      </Box>

      {/* TRIP MODAL */}
      <TripModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTrip(null);
        }}
        trip={selectedTrip}
      />
    </Layout>
  );
};

export default AboutPage;