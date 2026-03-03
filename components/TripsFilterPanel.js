import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
} from '@mui/material';

export default function TripsFilterPanel({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  activeFiltersCount,
}) {
  const birthYearDisabled = filters.usertype === 'Customer';

  return (
    <Box
      component={Paper}
      elevation={0}
      sx={{
        p: 2,
        width: '100%',
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
        Filters
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Vertical stacked layout */}
      <Stack spacing={2}>
        {/* Time filters */}
        <Typography variant="caption" color="text.secondary">
          Trip Start Time
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="From"
            type="time"
            value={filters.startTime}
            onChange={onFilterChange('startTime')}
            sx={{ width: '50%' }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            size="small"
            label="To"
            type="time"
            value={filters.endTime}
            onChange={onFilterChange('endTime')}
            sx={{ width: '50%' }}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        {/* Duration */}
        <Typography variant="caption" color="text.secondary">
          Trip Duration (minutes)
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="Min"
            type="number"
            value={filters.minDuration}
            onChange={onFilterChange('minDuration')}
            fullWidth
          />
          <TextField
            size="small"
            label="Max"
            type="number"
            value={filters.maxDuration}
            onChange={onFilterChange('maxDuration')}
            fullWidth
          />
        </Stack>

        {/* User Type */}
        <FormControl>
          <FormLabel sx={{ fontSize: 12, mb: 0.5 }}>User Type</FormLabel>
          <RadioGroup
            value={filters.usertype}
            onChange={(e) =>
              onFilterChange('usertype')({ target: { value: e.target.value } })
            }
          >
            <FormControlLabel value="" control={<Radio size="small" />} label="Any" />
            <FormControlLabel value="Customer" control={<Radio size="small" />} label="Customer" />
            <FormControlLabel value="Subscriber" control={<Radio size="small" />} label="Subscriber" />
          </RadioGroup>
        </FormControl>

        {/* Birth Year */}
        <Typography variant="caption" color="text.secondary">
          Birth Year
        </Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            size="small"
            label="Min"
            type="number"
            value={filters.minBirthYear}
            onChange={onFilterChange('minBirthYear')}
            fullWidth
            disabled={birthYearDisabled}
          />
          <TextField
            size="small"
            label="Max"
            type="number"
            value={filters.maxBirthYear}
            onChange={onFilterChange('maxBirthYear')}
            fullWidth
            disabled={birthYearDisabled}
          />
        </Stack>

        {/* Actions */}
        <Divider />

        <Stack spacing={1}>
          {activeFiltersCount > 0 && (
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
              {activeFiltersCount} active filters
            </Typography>
          )}

          <Button size="small" variant="outlined" onClick={onClearFilters} fullWidth>
            Clear Filters
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => {
              // Hardcode date to 2016-01-01 when sending to backend
              const payload = {
                ...filters,
                startDate: '2016-01-01',
                endDate: '2016-01-01',
              };
              onApplyFilters(payload);
            }}
            fullWidth
          >
            Apply Filters
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}