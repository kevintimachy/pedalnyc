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
    const BUCKET_SIZE = 300; // seconds (5 min)

    // find the highest numeric bucket start
    const lastNumericId = Math.max(
        ...data
            .filter((d) => typeof d._id === "number")
            .map((d) => d._id)
    );

    const dataset = data.map((d) => {
        const isOverflow = typeof d._id !== "number";

        if (isOverflow) {
            return {
                range: `${Math.floor((lastNumericId + BUCKET_SIZE) / 60)}+`,
                trips: d.count,
            };
        }

        // ✅ normal bucket
        return {
            range: `${Math.floor(d._id / 60)}-${Math.floor((d._id + BUCKET_SIZE) / 60)}`,
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