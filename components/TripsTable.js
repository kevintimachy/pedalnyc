import {
  CircularProgress,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

export default function TripsTable({
  rows = [],
  isLoading,
  pageIndex,
  rowsPerPage,
  totalTrips,
  onPageChange,
  onRowsPerPageChange,
  onRowClick = () => { },
}) {
  return (
    <Box>
      <TableContainer
        sx={{
          maxHeight: '250px',
        }}
      >
        <Table stickyHeader size="small">
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
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ py: 3 }}
                  >
                    <CircularProgress size={20} />
                    <Typography variant="body2">
                      Loading trips…
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>
            )}

            {!isLoading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No trips found yet.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              rows.map((trip) => {
                const duration =
                  typeof trip?.tripduration === 'number'
                    ? (trip.tripduration / 60).toFixed(2)
                    : '—';

                return (
                  <TableRow
                    key={trip._id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onRowClick(trip._id)}
                  >
                    <TableCell>{trip?.bikeid}</TableCell>
                    <TableCell>
                      {trip['start station name']}
                    </TableCell>
                    <TableCell>
                      {trip['end station name']}
                    </TableCell>
                    <TableCell>{duration}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* FIXED FOOTER */}
      <TablePagination
        component="div"
        count={totalTrips ?? -1}
        page={pageIndex}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
      />
    </Box>
  );
}