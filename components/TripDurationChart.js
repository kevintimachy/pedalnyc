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

function valueFormatter(value) {
    return `${value} min`;
};

export default function TripDurationChart({ filters }) {
    const theme = useTheme();

    const query = new URLSearchParams(filters).toString();
    const { data, error, isLoading } = useSWR(`${baseApiUrl}/api/analytics/duration-distribution?${query}`, fetcher);

    if (isLoading) {
        return <CircularProgress />;
    }
    if (error) {
        return <Typography variant="body1" color="error">Failed to load trip duration data.</Typography>;
    }
    const dataset = data.map((d) => {
        // overflow bucket
        if (d._id === "Other") {
            return {
                range: `${Math.floor(3300 / 60)}+`, // or compute dynamically
                trips: d.count,
            };
        }

        // normal bucket
        return {
            range: `${Math.floor(d._id / 60)}-${Math.floor((d._id + 300) / 60)}`,
            trips: d.count,
        };
    });

    const chartSetting = {
        xAxis: [
            {
                dataKey: 'range',
                label: 'Duration (minutes)',
                valueFormatter,
            }
        ],
        yAxis: [
            {
                dataKey: 'trips',
            }
        ],
        series: [{ dataKey: 'trips', label: 'Trips', color: theme.palette.primary.main }],
        height: 250,
    }

    return (
        <Box>
            <BarChart
                dataset={dataset}
                {...chartSetting}
            />
        </Box>
    );
}