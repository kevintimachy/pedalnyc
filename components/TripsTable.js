import {
  CircularProgress,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 20, 50];

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
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer >
        <Table stickyHeader aria-label="trips table">
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
                    <TableCell>{trip['start station name']}</TableCell>
                    <TableCell>{trip['end station name']}</TableCell>
                    <TableCell>{duration}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalTrips ?? -1}
          page={pageIndex}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        />
      </TableContainer>
    </Box>
  );
}
