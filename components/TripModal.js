// components/TripModal.jsx
'use client';
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
    Grid,
    Chip,
    Divider,
    Box,
} from "@mui/material";
import Map from "@/components/Map";

export default function TripModal({ open, onClose, trip }) {
    if (!trip) return null;

    const formatTripDate = (value) => {
        if (!value) return "—";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "—";
        return `${date.toLocaleString("en-US", { timeZone: "UTC" })} UTC`;
    };

    const durationMinutes =
        typeof trip.tripduration === "number"
            ? (trip.tripduration / 60).toFixed(2)
            : "—";

    const startTime = formatTripDate(trip["start time"]);
    const stopTime = formatTripDate(trip["stop time"]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>
                Bike {trip.bikeid} — {trip["start station name"]} → {trip["end station name"]}
            </DialogTitle>
            <DialogContent dividers>
                <Container sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        {/* LEFT: MAP */}
                        <Grid item xs={12} md={7}>
                            <Card elevation={3}>
                                <CardContent sx={{ p: 0, height: { xs: 320, md: 420, lg: 500 } }}>
                                    <Map trip={trip} />
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* RIGHT: DETAILS */}
                        <Grid item xs={12} md={5}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" mb={2}>
                                        <Typography variant="h6" fontWeight={600}>
                                            Trip Details
                                        </Typography>

                                        <Chip
                                            label={trip.usertype}
                                            color={trip.usertype === "Subscriber" ? "primary" : "secondary"}
                                            size="small"
                                        />
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    <Box sx={{ display: "grid", gap: 1.5 }}>
                                        <Typography variant="body2">
                                            <b>Duration:</b> {durationMinutes} minutes
                                        </Typography>

                                        <Typography variant="body2">
                                            <b>Birth Year:</b> {trip["birth year"] ? trip["birth year"] : "N/A"}
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
                </Container>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
