'use client';
import '../styles/Home.module.css';
import { Box, Typography, Stack, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import TripsFilterPanel from '@/components/TripsFilterPanel';
import TripsTable from '@/components/TripsTable';
import UserTypePieChart from '@/components/UserTypePieChart';
import TripDurationChart from '@/components/TripDurationChart';
import { useTheme } from '@mui/material';
import TopStartStationsChart from '@/components/TopStartStationsChart';

const fetcher = (url) => fetch(url).then((res) => res.json());
const baseApiUrl = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '');

const defaultFilterState = {
    startDate: '',
    endDate: '',
    minBirthYear: '',
    maxBirthYear: '',
    minDuration: '',
    maxDuration: '',
    usertype: '',
};

export default function Trips() {
    const theme = useTheme();
    const router = useRouter();
    const [pageData, setPageData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalTrips, setTotalTrips] = useState(null);
    const [filters, setFilters] = useState(() => ({ ...defaultFilterState }));
    const [activeFilters, setActiveFilters] = useState({});

    const filterString = useMemo(() => {
        const params = new URLSearchParams();
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                params.append(key, value);
            }
        });
        return params.toString();
    }, [activeFilters]);

    const pageNumber = pageIndex + 1;
    const cacheKey = `/api/trips?page=${pageNumber}&perPage=${rowsPerPage}${filterString ? `&${filterString}` : ''}`;
    const endpoint = `${baseApiUrl || ''}${cacheKey}`;

    const { data, error } = useSWR(endpoint, fetcher);
    const isLoading = !data && !error;

    useEffect(() => {
        if (error) {
            console.error('Trips fetch failed', error);
            return;
        }

        if (!data) {
            return;
        }

        const trips = Array.isArray(data)
            ? data
            : data?.trips ?? data?.data ?? data?.results ?? [];

        setPageData(trips);

        const totalFromApi = data.total

        if (totalFromApi !== null) {
            setTotalTrips(totalFromApi);
        } else {
            setTotalTrips(pageIndex * rowsPerPage + trips.length);
        }

        console.log(data);
    }, [data, error, pageIndex, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPageIndex(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const nextRows = parseInt(event.target.value, 10);
        setRowsPerPage(nextRows);
        setPageIndex(0);
    };

    const handleFilterChange = (key) => (event) => {
        const value = event.target.value;
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleApplyFilters = () => {
        const normalized = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                normalized[key] = value;
            }
        });
        setActiveFilters(normalized);
        setPageIndex(0);
    };

    const handleClearFilters = () => {
        setFilters({ ...defaultFilterState });
        setActiveFilters({});
        setPageIndex(0);
    };

    const activeFiltersCount = Object.keys(activeFilters).length;

    const handleRowClick = (id) => {
        router.push(`/trip/${id}`);
    };

    return (
        <Box sx={{ m: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Explore NYC CitiBike Trips
            </Typography>

            <Stack spacing={3} sx={{ mb: 3 }}>
                <TripsFilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    activeFiltersCount={activeFiltersCount}
                />
            </Stack>

            {/* 🔥 DASHBOARD GRID */}
            <Grid container spacing={3}>

                {/* LEFT SIDE (charts area) */}
                <Grid item xs={12} lg={6}>
                    <Grid container spacing={3}>

                        {/* User Type Pie */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2, height: '100%' }}>
                                <UserTypePieChart filters={filterString} />
                            </Paper>
                        </Grid>

                        {/* Trip Duration */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2, height: '100%' }}>
                                <TripDurationChart filters={filterString} />
                            </Paper>
                        </Grid>

                        {/* Top Stations full width under */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <TopStartStationsChart filters={filterString} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

                {/* RIGHT SIDE (table) */}
                <Grid item xs={12} lg={6}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                        {error ? (
                            <Typography variant="body1" color="error">
                                Failed to load trips. Please try again later.
                            </Typography>
                        ) : (
                            <TripsTable
                                rows={pageData}
                                isLoading={isLoading}
                                pageIndex={pageIndex}
                                rowsPerPage={rowsPerPage}
                                totalTrips={totalTrips}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onRowClick={handleRowClick}
                            />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
