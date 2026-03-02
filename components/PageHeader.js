import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

export default function PageHeader({ title, text, showSubscriber, showCustomer }) {
  return (
    <>
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {text}
          </Typography>
          <Stack justifyContent="flex-end" direction="row" spacing={1}>
            {showSubscriber && <Chip label="Subscriber" color="primary" />}
            {showCustomer && <Chip label="Customer" color="secondary" />}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
