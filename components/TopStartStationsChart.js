'use client';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { CircularProgress, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material';

const BarChart = dynamic(
    () => import('@mui/x-charts/BarChart').then((mod) => mod.BarChart ?? mod.default ?? mod),
    { ssr: false, loading: () => null }
);

const fetcher = (url) => fetch(url).then((res) => res.json());
const baseApiUrl = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '');


export default function TopStartStationsChart({ filters }) {
    const theme = useTheme();

    const query = new URLSearchParams(filters).toString();
    const { data, error } = useSWR(`${baseApiUrl}/api/analytics/top-start-stations?${query}`, fetcher);

    if (error) return <Typography color="error">Failed to load chart</Typography>;
    if (!data) return <CircularProgress />;
    console.log(data);


    const dataset = (data ?? []).map((item) => ({
        station: item._id ?? 'Unknown',
        trips: Number(item.count) || 0,
    }));

    const chartSetting = {
        xAxis: [
            {
                label: 'Number of Trips',
            },
        ],
        yAxis: [
            {
                dataKey: 'station',
                scaleType: 'band',

            },
        ],
        series: [
            {
                dataKey: 'trips',
                label: 'Trips',
                valueFormatter: (v) => (v ?? 0).toLocaleString(),
                color: theme.palette.primary.main,
            },
        ],
        height: 250,
    };


    return (
        <Box>
            <BarChart
                dataset={dataset}
                {...chartSetting}
                layout="horizontal"
            />
        </Box>
    );
}