import React from 'react';
import { Box, Paper, Typography, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Stack, Button } from '@mui/material';

export default function TripsFilterPanel({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  activeFiltersCount,
}) {
  // Disable birth year if user selects "Customer"
  const birthYearDisabled = filters.usertype === 'Customer';

  return (
    <Box component={Paper} sx={{ p: 3 }}>
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
        <Grid item xs={12} md={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend">User Type</FormLabel>
            <RadioGroup
              row
              value={filters.usertype}
              onChange={(e) => onFilterChange('usertype')({ target: { value: e.target.value } })}
            >
              <FormControlLabel value="" control={<Radio />} label="Any" />
              <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
              <FormControlLabel value="Subscriber" control={<Radio />} label="Subscriber" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Min Birth Year"
            type="number"
            value={filters.minBirthYear}
            onChange={onFilterChange('minBirthYear')}
            fullWidth
            disabled={birthYearDisabled}
            helperText={birthYearDisabled ? 'Birth year only applies to Subscribers' : ''}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Max Birth Year"
            type="number"
            value={filters.maxBirthYear}
            onChange={onFilterChange('maxBirthYear')}
            fullWidth
            disabled={birthYearDisabled}
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