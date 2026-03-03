'use client';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { CircularProgress, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material';

const PieChart = dynamic(
  () => import('@mui/x-charts/PieChart').then((module) => module.PieChart ?? module.default ?? module),
  {
    ssr: false,
    loading: () => null,
  }
);

const fetcher = (url) => fetch(url).then((res) => res.json());
const baseApiUrl = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '');


export default function UserTypePieChart({ filters }) {
  const theme = useTheme();


  const query = new URLSearchParams(filters).toString();
  const { data, error, isLoading } = useSWR(`${baseApiUrl}/api/analytics/user-type-distribution?${query}`, fetcher);

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography variant="body1" color="error">Failed to load user type data.</Typography>;
  }

  const USER_TYPE_COLORS = {
    Subscriber: theme.palette.primary.main,
    Customer: theme.palette.secondary.main,
    Unknown: theme.palette.grey[400],
  };

  const ORDER = ['Subscriber', 'Customer'];

  const normalizedData = [...data].sort(
    (a, b) => ORDER.indexOf(a._id) - ORDER.indexOf(b._id)
  );

  const seriesData = [
    {
      data: normalizedData.map((d) => ({
        id: d._id,
        value: d.count,
        label: d._id || 'Unknown',
        color: USER_TYPE_COLORS[d._id] || USER_TYPE_COLORS.Unknown,
      })),
    },
  ];

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        User Type Distribution
      </Typography>
      <PieChart series={seriesData} height={200} />
    </Box>
  );
}
