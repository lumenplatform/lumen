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
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewCourse, getOrgCoursesById, updateCourse } from '../../../api';
import { TabPanel } from '../../../components/TabPanel';
import CourseMaterialEditor from './course-builder/CourseMaterialEditor';
import { CourseLandingPage } from './sections/CourseLandingPage';
import { CourseMessage } from './sections/CourseMessage';
import { CourseStructure } from './sections/CourseStructure';
import { FilmAndEdit } from './sections/FilmAndEdit';
import { IntendedLearners } from './sections/IntendedLearners';
import { Pricing } from './sections/Pricing';
import { SetupAndTestVideo } from './sections/SetupAndTestVideo';

export default function CourseCreate() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { courseId } = useParams();

  const courseCreateMutation = useMutation(createNewCourse);
  const courseUpdateMutation = useMutation(updateCourse);

  const { data: courseData, isLoading } = useQuery('coures' + courseId, () =>
    getOrgCoursesById(courseId ?? '')
  );

  // Active Tab
  const [value, setValue] = useState(0);

  const methods = useForm({
    defaultValues: {
      title: '',
      description: '',
      language: '',
      level: '',
      subjectArea: '',
      learningOutcome: [''],
      intendedAudience: [''],
      prerequisites: [''],
      price: 10,
      welcomeMessage: '',
      congratsMessage: '',
    },
    mode: 'onBlur',
  });

  const fieldValues = methods.watch();

  useEffect(() => {
    if (courseData) {
      methods.reset(courseData);
    }
  }, [courseData]);

  useEffect(() => {
    methods.reset({
      title: '',
      learningOutcome: [''],
      intendedAudience: [''],
      prerequisites: [''],
      price: 10,
      welcomeMessage: '',
      congratsMessage: '',
    });
  }, []);

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

  if (courseId && !courseData) return null;

  return (
    <FormProvider {...methods}>
      <Box>
        <Toolbar sx={{ borderBottom: 1, borderColor: theme.palette.divider }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/manage/courses')}
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
            {fieldValues['title']}
          </Typography>
          <Chip color="warning" label="DRAFT" />
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button
            variant="contained"
            onClick={() => {
              if (courseId) {
                courseUpdateMutation.mutate(fieldValues);
              } else {
                courseCreateMutation.mutate(fieldValues);
              }
            }}
          >
            Save
          </Button>
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
                <Tab sx={{ alignItems: 'end' }} key={label} label={label} />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ flex: 1, px: 2, width: '900px' }}>
            <Typography sx={{ mx: 3, my: 1 }} variant="h4" fontWeight={'bold'}>
              {sections[value].label}
            </Typography>
            {sections.map(({ component }, index) => (
              <TabPanel value={value} key={index} index={index}>
                {component}
              </TabPanel>
            ))}
          </Box>
        </Container>
        <small>
          <pre>{JSON.stringify(fieldValues, null, 3)}</pre>
        </small>
      </Box>
    </FormProvider>
  );
}
