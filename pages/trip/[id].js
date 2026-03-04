import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Map from "@/components/Map";

import {
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Box,
    Divider,
    Skeleton,
    Toolbar,
} from "@mui/material";

// ---------------- STATIC PATHS ----------------
export async function getStaticPaths() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trips?page=1&perPage=10`
    );
    const data = await res.json();

    const ids = data.trips.map((trip) => ({
        params: { id: trip._id },
    }));

    return {
        fallback: "blocking",
        paths: ids,
    };
}

// ---------------- STATIC PROPS ----------------
export async function getStaticProps(context) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/trips/${context.params.id}`
    );
    const trip = await res.json();

    return {
        props: { trip },
        revalidate: 60,
    };
}

// ---------------- PAGE ----------------
export default function Trips({ trip }) {
    const router = useRouter();

    if (!trip) {
        return (
            <Container sx={{ mt: 4 }}>
                <Skeleton variant="rectangular" height={300} />
            </Container>
        );
    }

    const durationMinutes =
        typeof trip.tripduration === "number"
            ? (trip.tripduration / 60).toFixed(2)
            : "—";

    const formatTripDate = (value) => {
        if (!value) return "—";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "—";
        return `${date.toLocaleString("en-US", { timeZone: "UTC" })} UTC`;
    };

    const startTime = formatTripDate(trip["start time"]);
    const stopTime = formatTripDate(trip["stop time"]);

    return (
        <Layout>
            <Toolbar />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Bike {trip.bikeid}
                </Typography>

                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {trip["start station name"]} → {trip["end station name"]}
                </Typography>
            </Container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
                <Grid container spacing={4}>
                    {/* LEFT: MAP */}
                    <Grid item xs={12} md={7}>
                        <Card elevation={3} >
                            <CardContent
                                sx={{
                                    p: 0,
                                    height: { xs: 320, md: 420, lg: 500 },
                                }}>
                                <Map trip={trip} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* RIGHT: DETAILS */}
                    <Grid item xs={12} md={5}>
                        <Card elevation={3} >
                            <CardContent>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    mb={2}
                                >
                                    <Typography variant="h6" fontWeight={600}>
                                        Trip Details
                                    </Typography>

                                    <Chip
                                        label={trip.usertype}
                                        color={
                                            trip.usertype === "Subscriber"
                                                ? "primary"
                                                : "secondary"
                                        }
                                        size="small"
                                    />
                                </Box>

                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{ display: "grid", gap: 1.5 }}>
                                    <Typography variant="body2">
                                        <b>Duration:</b> {durationMinutes} minutes
                                    </Typography>

                                    <Typography variant="body2">
                                        <b>Birth Year:</b> {trip["birth year"] ?? "—"}
                                    </Typography>

                                    <Typography variant="body2">
                                        <b>Start Time:</b> {startTime}
                                    </Typography>

                                    <Typography variant="body2">
                                        <b>Stop Time:</b> {stopTime}
                                    </Typography>

                                    <Typography variant="body2">
                                        <b>Bike ID:</b> {trip.bikeid}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container >
        </Layout>
    );
}
