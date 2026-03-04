'use client';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import TripsFilterPanel from '@/components/TripsFilterPanel';
import TripsTable from '@/components/TripsTable';
import UserTypePieChart from '@/components/UserTypePieChart';
import TripDurationChart from '@/components/TripDurationChart';
import TopStartStationsChart from '@/components/TopStartStationsChart';
import TripModal from '@/components/TripModal';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

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

export default function Dashboard() {
    const router = useRouter();
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [pageData, setPageData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalTrips, setTotalTrips] = useState(null);
    const [filters, setFilters] = useState({ ...defaultFilterState });
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
    const cacheKey = `/api/trips?page=${pageNumber}&perPage=${rowsPerPage}${filterString ? `&${filterString}` : ''
        }`;
    const endpoint = `${baseApiUrl || ''}${cacheKey}`;

    const { data, error } = useSWR(endpoint, fetcher);
    const isLoading = !data && !error;

    console.log(data);

    useEffect(() => {
        if (!data) return;
        const trips = Array.isArray(data)
            ? data
            : data?.trips ?? data?.data ?? data?.results ?? [];
        setPageData(trips);
        const totalFromApi = data.total;
        setTotalTrips(totalFromApi ?? pageIndex * rowsPerPage + trips.length);
    }, [data, pageIndex, rowsPerPage]);

    const handleChangePage = (event, newPage) => setPageIndex(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPageIndex(0);
    };

    const handleFilterChange = (key) => (event) => {
        setFilters((prev) => ({ ...prev, [key]: event.target.value }));
    };

    const handleApplyFilters = () => {
        const normalized = { ...filters };
        const date = '2016-01-01';
        normalized.startDate = `${date}T${filters.startTime || '00:00'}:00.000+00:00`;
        normalized.endDate = `${date}T${filters.endTime || '23:59'}:59.999+00:00`;
        delete normalized.startTime;
        delete normalized.endTime;
        setActiveFilters(normalized);
        setPageIndex(0);
    };

    const handleClearFilters = () => {
        setFilters({ ...defaultFilterState });
        setActiveFilters({});
        setPageIndex(0);
    };

    const handleRowClick = (trip) => {
        setSelectedTrip(trip);
        setModalOpen(true);
    };

    const activeFiltersCount = Object.keys(activeFilters).length;

    return (
        <DashboardLayout
            sidebar={
                <TripsFilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                    activeFiltersCount={activeFiltersCount}
                />
            }
        >
            <Box sx={{ px: 2, pb: 2 }}>
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" fontWeight={700}>
                        NYC CitiBike Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Analyze trip patterns, rider behavior, and station activity for Jan 1, 2016.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* Top Row: Table 2/3, Pie 1/3 */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ p: 2, height: '100%', overflow: 'hidden' }}>
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
                        </Paper>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Paper sx={{ p: 2, minHeight: 350, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                User Type Distribution
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <UserTypePieChart filters={filterString} />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Bottom Row: Duration & Stations 50/50, same height */}
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                Trip Duration Distribution
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <TripDurationChart filters={filterString} />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                                Top Start Stations
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <TopStartStationsChart filters={filterString} />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
                <TripModal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setSelectedTrip(null);
                    }}
                    trip={selectedTrip}
                />
            </Box>
        </DashboardLayout>
    );
}