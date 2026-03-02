'use client';
import '../styles/Home.module.css';
import PageHeader from '@/components/PageHeader';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
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

export default function Trips() {
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

    return (
        <Container sx={{ mt: 4 }}>

            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Bike Trips Explorer
            </Typography>

            <Box component={Paper} elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Filter trips
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={filters.startDate}
                            onChange={handleFilterChange('startDate')}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="End Date"
                            type="date"
                            value={filters.endDate}
                            onChange={handleFilterChange('endDate')}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Min Birth Year"
                            type="number"
                            value={filters.minBirthYear}
                            onChange={handleFilterChange('minBirthYear')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Max Birth Year"
                            type="number"
                            value={filters.maxBirthYear}
                            onChange={handleFilterChange('maxBirthYear')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <FormControl fullWidth>
                            <InputLabel id="usertype-label">User Type</InputLabel>
                            <Select
                                labelId="usertype-label"
                                label="User Type"
                                value={filters.usertype}
                                onChange={handleFilterChange('usertype')}
                            >
                                <MenuItem value="">Any</MenuItem>
                                <MenuItem value="Customer">Customer</MenuItem>
                                <MenuItem value="Subscriber">Subscriber</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Min Duration (secs)"
                            type="number"
                            value={filters.minDuration}
                            onChange={handleFilterChange('minDuration')}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Max Duration (secs)"
                            type="number"
                            value={filters.maxDuration}
                            onChange={handleFilterChange('maxDuration')}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleApplyFilters}>
                        Apply filters
                    </Button>
                    <Button variant="text" onClick={handleClearFilters}>
                        Clear filters
                    </Button>
                    {Object.keys(activeFilters).length > 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                            {`Filter applied (${Object.keys(activeFilters).length} criteria)`}
                        </Typography>
                    )}
                </Stack>
            </Box>

            {error ? (
                <Typography variant="body1" color="error">
                    Failed to load trips. Please try again later.
                </Typography>
            ) : (
                <TableContainer component={Paper} elevation={4}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Bike ID</TableCell>
                                <TableCell>Start Station</TableCell>
                                <TableCell>End Station</TableCell>
                                <TableCell>Duration (Minutes)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                            <CircularProgress size={20} />
                                            <Typography variant="body2">Loading trips…</Typography>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            )}
                            {!isLoading && pageData.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No trips found yet.
                                    </TableCell>
                                </TableRow>
                            )}
                            {pageData.map((trip) => {
                                const duration =
                                    typeof trip?.tripduration === 'number'
                                        ? (trip.tripduration / 60).toFixed(2)
                                        : '—';

                                return (
                                    <TableRow
                                        key={trip._id}
                                        hover
                                        sx={{
                                            cursor: 'pointer',
                                            '&:nth-of-type(odd)': { backgroundColor: 'action.hover' },
                                        }}
                                        onClick={() => router.push(`/trip/${trip._id}`)}
                                    >
                                        <TableCell>{trip?.bikeid}</TableCell>
                                        <TableCell>{trip['start station name']}</TableCell>
                                        <TableCell>{trip['end station name']}</TableCell>
                                        <TableCell>{duration}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={totalTrips ?? -1}
                                    page={pageIndex}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 20, 50]}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
}
