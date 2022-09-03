import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Plan = {
  name: string;
  color: string;
  included: string[];
  description: string;
  onTopOf: string | undefined;
  pricing: { base: number; public: number; private?: number };
};

const plans: Plan[] = [
  {
    name: 'Basic',
    color: 'gray',
    description:
      'Great for Individuals who are just starting out in teaching online courses',
    included: ['DRM Protected Videos', 'PDF Watermarking', 'App Only Courses'],
    onTopOf: undefined,
    pricing: { base: 0, public: 20 },
  },
  {
    name: 'Pro',
    color: 'gold',
    description:
      'Great for Individuals who are just starting out in teaching online courses',
    included: ['Private Courses', 'Video Watermarks', '5 Instructors'],
    onTopOf: 'Basic',
    pricing: { base: 7, public: 20, private: 0.1 },
  },
  {
    name: 'Organization',
    color: 'orange',
    description:
      'Great for Individuals who are just starting out in teaching online courses',
    included: [
      'Unlimited Instructors',
      'Custom Domains',
      'Theme Customizations',
      'SSO',
    ],
    onTopOf: 'Pro',
    pricing: { base: 89, public: 20, private: 0.1 },
  },
];

const PricingCard = (props: { data: Plan }) => {
  const {
    data: { name, color, included, description, pricing, onTopOf },
  } = props;
  const navigate = useNavigate();
  return (
    <Paper sx={{ flexGrow: 1, maxWidth: '350px', overflow: 'hidden' }}>
      <Box sx={{ height: '.5rem', background: color }}></Box>
      <Stack sx={{ px: 3, py: 2, height: '100%' }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" mb={2}>
          {description}
        </Typography>
        <Stack direction={'row'} justifyContent="center" alignItems="center">
          <Typography variant="h4" mb={1} textAlign={'center'} fontWeight={600}>
            ${pricing.base}
          </Typography>
          <Typography>/mo</Typography>
        </Stack>
        {onTopOf && (
          <Typography mt={1} variant="subtitle2">
            Everything in {onTopOf} and,
          </Typography>
        )}
        {!onTopOf && (
          <Typography mt={1} variant="subtitle2">
            What's Included :
          </Typography>
        )}
        <ul style={{ marginTop: '.5rem' }}>
          {included.map((r) => (
            <li>{r}</li>
          ))}
        </ul>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack direction={'row'} justifyContent="space-around">
          <Box style={{ textAlign: 'center' }}>
            <Typography variant="body2"> Public Courses</Typography>
            <Typography variant="h6" lineHeight={1} mt={1}>
              {pricing.public}%
            </Typography>
            <Typography variant="caption"> From Course Fee</Typography>
          </Box>
          {pricing.private && (
            <Box style={{ textAlign: 'center' }}>
              <Typography variant="body2"> Private Courses</Typography>
              <Typography variant="h6" lineHeight={1} mt={1}>
                ${pricing.private}/hr.
              </Typography>
              <Typography variant="caption"> Per Enrollment</Typography>
            </Box>
          )}
        </Stack>
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate('/manage')}
          >
            Choose Plan
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default function Pricing() {
  return (
    <Box>
      <Container sx={{ p: 3, py: 4 }}>
        <Typography variant="h5" fontWeight={600}>
          Flexible Pricing. Per Your Needs
        </Typography>
        <Stack
          direction={'row'}
          justifyContent="space-around"
          mt={3}
          spacing={3}
        >
          {plans.map((r) => (
            <PricingCard data={r} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
