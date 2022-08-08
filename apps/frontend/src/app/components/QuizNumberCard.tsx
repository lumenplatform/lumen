import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function NumberCard() {
  return (
    <Card
      sx={{
        height: 100,
        width: 250,
        margin: 8,
        marginTop: 20,
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="body2" sx={{ paddingBottom: 1 }}>
          Not Answered
        </Typography>

        <Typography variant="body2" sx={{ paddingBottom: 1 }}>
          Marked 0.00 out of 1.00
        </Typography>
      </CardContent>
    </Card>
  );
}
