import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

export default function TripsFilterPanel({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  activeFiltersCount,
}) {
  return (
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
            onChange={onFilterChange('startDate')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="End Date"
            type="date"
            value={filters.endDate}
            onChange={onFilterChange('endDate')}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Min Birth Year"
            type="number"
            value={filters.minBirthYear}
            onChange={onFilterChange('minBirthYear')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Max Birth Year"
            type="number"
            value={filters.maxBirthYear}
            onChange={onFilterChange('maxBirthYear')}
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
              onChange={onFilterChange('usertype')}
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
            onChange={onFilterChange('minDuration')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Max Duration (secs)"
            type="number"
            value={filters.maxDuration}
            onChange={onFilterChange('maxDuration')}
            fullWidth
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={onApplyFilters}>
          Apply filters
        </Button>
        <Button variant="text" onClick={onClearFilters}>
          Clear filters
        </Button>
        {activeFiltersCount > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
            {`Filter applied (${activeFiltersCount} criteria)`}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
