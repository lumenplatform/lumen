import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseMaterialEditor from '../../../../components/course-builder/CourseMaterialEditor';
import {
  CourseStructure,
  IntendedLearners,
  SetupAndTestVideo,
} from './CoursePlan/CoursePlan';
import {
  CourseLandingPage,
  CourseMessage,
  Pricing,
} from './PublishCourse/PublishCourse';
import { TabPanel } from './TabPanel';
import Chip from '@mui/material/Chip';
import { FilmAndEdit } from './CreateContent/CreateContent';

export default function CourseCreate() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const sections = [
    { component: <CourseLandingPage />, label: 'Course Information' },
    { component: <IntendedLearners />, label: 'Intended Learners' },
    { component: <CourseStructure />, label: 'Course Structure' },
    { component: <SetupAndTestVideo />, label: 'Video Test' },
    { component: <FilmAndEdit />, label: 'Film & Edit' },
    { component: <CourseMaterialEditor />, label: 'Course Material' },
    { component: <Pricing />, label: 'Pricing' },
    { component: <CourseMessage />, label: 'Messages' },
  ];

  return (
    <Box>
      <Toolbar sx={{ borderBottom: 1, borderColor: theme.palette.divider }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/manage/courses')}
          // size="large"
          color="inherit"
        >
          Back to Courses
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: '2rem',
            marginLeft: '8px',
            alignSelf: 'center',
            borderWidth: '1px',
            borderColor: 'black',
          }}
        />
        <Typography mx={3} variant="h6">
          Machine Learning for Dummies
        </Typography>
        <Chip color="warning" label="DRAFT" />
        <Box sx={{ flexGrow: 1 }}></Box>
      </Toolbar>

      <Container sx={{ display: 'flex', py: 2, pb: 3 }}>
        <Box>
          <Typography sx={{ mx: 3, my: 1 }} variant="h4">
            &nbsp;
          </Typography>
          <Tabs
            value={value}
            onChange={(event, newValue: number) => setValue(newValue)}
            sx={{ textAlign: 'right', pt: 2 }}
            orientation="vertical"
          >
            {sections.map(({ label }) => (
              <Tab sx={{ alignItems: 'end' }} label={label} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ flex: 1, px: 2, width: '900px' }}>
          <Typography sx={{ mx: 3, my: 1 }} variant="h4" fontWeight={'bold'}>
            {sections[value].label}
          </Typography>
          {sections.map(({ component }, index) => (
            <TabPanel value={value} index={index}>
              {component}
            </TabPanel>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
