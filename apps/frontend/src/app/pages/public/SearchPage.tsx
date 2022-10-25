import * as React from 'react';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Button,
  Grid,
  List,
  TextField,
  Typography,
  Checkbox,
  Drawer,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Slider,
  Skeleton,
  Stack,
  Chip,
  Container,
} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { createContext } from 'react';
import CourseCard from '../../components/CourseCard';
import StudentHeader from '../../components/StudentHeader';
import { useQuery } from 'react-query';
import { search } from '../../api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Header } from './fragments/Header';

function updateArray(array: string[] | any[], element: any) {
  const x = [...array];
  x.includes(element) ? x.splice(array.indexOf(element), 1) : x.push(element);
  return x;
}

type Params = {
  searchQuery?: string;
  subjectArea: string[];
  levels: string[];
  language: string[];
  organization?: string;
  price: {
    start?: number;
    end?: number;
  };
};

const queryParams = new URLSearchParams(window.location.search);

const defaultParams: Params = {
  searchQuery: queryParams.has('query') ? queryParams.get('query')! : undefined,
  subjectArea: [],
  levels: [],
  language: [],
  organization: queryParams.has('organization')
    ? queryParams.get('organization')!
    : undefined,
  price: {
    start: undefined,
    end: undefined,
  },
};

const filterContext = createContext<{
  showFilter: boolean;
  setShowFilter: any;
}>({
  showFilter: false,
  setShowFilter: () => {},
});

const paramsContext = createContext<{ params: Params; setParams: any }>({
  params: defaultParams,
  setParams: () => {},
});

function ResponsiveDrawer(props: any) {
  const { showFilter, setShowFilter } = React.useContext(filterContext);
  const { params, setParams } = React.useContext(paramsContext);
  const [price, setPrice] = React.useState<number[]>([0, 100]);
  const [showMore, setShowMore] = React.useState({
    subjects: false,
    levels: false,
    language: false,
  });
  const handleDrawerToggle = () => {
    setShowFilter(!showFilter);
  };

  const subjectsList = [
    'Business',
    'Computer Science',
    'Data Science',
    'Health',
    'Information Technology',
    'Math and Logic',
    'Physical Science and Engineering',
  ];
  const levelsList = ['Beginner', 'Intermediate', 'Expert'];
  const languageList = ['English', 'Sinhala', 'Mandarin', 'Hindi', 'Spanish'];

  const drawer = (
    <List sx={{ mx: { xs: 2, sm: 0 }, mr: { sm: 2 }, mt: { xs: 3 } }}>
      <Typography variant="h6">Filter By</Typography>
      <FormControl component="fieldset" sx={{ mt: 4, display: 'flex' }}>
        <FormLabel component="legend">
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Subject
          </Typography>
        </FormLabel>
        <FormGroup>
          {subjectsList
            .filter((text, index, arr) => showMore.subjects || index < 4)
            .map((text) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() =>
                      setParams((prevState: Params) => ({
                        ...prevState,
                        subjectArea: updateArray(prevState.subjectArea, text),
                      }))
                    }
                  />
                }
                label={text}
              />
            ))}
        </FormGroup>
        <Button
          variant="text"
          onClick={() =>
            setShowMore((prevState) => ({
              ...prevState,
              subjects: !prevState.subjects,
            }))
          }
        >
          {subjectsList.length < 4
            ? ''
            : showMore.subjects
            ? 'Show less'
            : 'Show more'}
        </Button>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 4, display: 'flex' }}>
        <FormLabel component="legend">
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Level
          </Typography>
        </FormLabel>
        <FormGroup>
          {levelsList
            .filter((text, index, arr) => showMore.levels || index < 4)
            .map((text) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() =>
                      setParams((prevState: Params) => ({
                        ...prevState,
                        levels: updateArray(prevState.levels, text),
                      }))
                    }
                  />
                }
                label={text}
              />
            ))}
        </FormGroup>
        <Button
          variant="text"
          onClick={() =>
            setShowMore((prevState) => ({
              ...prevState,
              levels: !prevState.levels,
            }))
          }
        >
          {levelsList.length < 4
            ? ''
            : showMore.levels
            ? 'Show less'
            : 'Show more'}
        </Button>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 4, display: 'flex' }}>
        <FormLabel component="legend">
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Language
          </Typography>
        </FormLabel>
        <FormGroup>
          {languageList
            .filter((text, index, arr) => showMore.language || index < 4)
            .map((text) => (
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() =>
                      setParams((prevState: Params) => ({
                        ...prevState,
                        language: updateArray(prevState.language, text),
                      }))
                    }
                  />
                }
                label={text}
              />
            ))}
        </FormGroup>
        <Button
          variant="text"
          onClick={() =>
            setShowMore((prevState) => ({
              ...prevState,
              language: !prevState.language,
            }))
          }
        >
          {languageList.length < 4
            ? ''
            : showMore.language
            ? 'Show less'
            : 'Show more'}
        </Button>
      </FormControl>

      <FormControl component="fieldset" sx={{ mt: 4, display: 'flex' }}>
        <FormLabel component="legend">
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Price
          </Typography>
        </FormLabel>
        <FormGroup sx={{ px: { xs: 3, sm: 2 } }}>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={[params?.price?.start || 0, params?.price?.end || 100]}
            onChange={(event: Event, newValue: number | number[]) => {
              setPrice(newValue as number[]);
              Array.isArray(newValue) &&
                setParams((current: Params) => ({
                  ...current,
                  price: {
                    ...current.price,
                    start: newValue[0],
                    end: newValue[1],
                  },
                }));
            }}
            valueLabelDisplay="auto"
            marks={[
              {
                value: 0,
                label: '$0',
              },
              {
                value: 100,
                label: '$100',
              },
            ]}
          />
        </FormGroup>
      </FormControl>
    </List>
  );

  return (
    <Box sx={{ position: 'relative', height: '100%', border: 0 }}>
      <Drawer
        variant="temporary"
        open={showFilter}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-root': {
            position: 'absolute',
            border: 0,
          },
          '& .MuiPaper-root': {
            border: 0,
            width: 250,
          },
          display: { xs: 'flex', sm: 'none' },
          border: 0,
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-root': {
            border: 0,
          },
          '& .MuiPaper-root': {
            position: 'relative',
            border: 0,
            pr: 3,
            width: '100%',
          },
          display: { xs: 'none', sm: 'flex' },
          border: 0,
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

function NoResults(props: any) {
  return (
    //Typohraphy with varinat body2

    <Stack direction="row" alignItems="center" spacing={2}>
      <SchoolOutlinedIcon fontSize="large" />
      <Typography variant="h6">No results found for "{props.value}"</Typography>
    </Stack>
  );
}
export default function SearchPage() {
  const [showFilter, setShowFilter] = React.useState(false);
  const [params, setParams] = React.useState(defaultParams);

  const {
    data: courses,
    isLoading,
    isError,
    isRefetchError,
    isRefetching,
    refetch,
  } = useQuery(JSON.stringify(params), () => search(params), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const handleSearchQuery = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    queryParams.set('query', event.target.value);
    navigate(`/courses?${queryParams.toString()}`);
  };
  const handleOrgChipDelete = () => {
    queryParams.delete('organization');
    navigate(`/courses?${queryParams.toString()}`);
  };
  React.useEffect(() => {
    console.log(queryParams.has('query'));
    setParams((prevState: Params) => ({
      ...prevState,
      searchQuery: queryParams.has('query') ? queryParams.get('query')! : '',
      organization: queryParams.has('organization')
        ? queryParams.get('organization')!
        : '',
    }));
    console.log('params', params);
  }, [location]);

  React.useEffect(() => {
    refetch();
  }, [params]);

  return (
    <div >
      <Header />
      <Container >
        <Box sx={{ display: 'flex', margin: '0 auto' }}>
          <Box sx={{ width: { sm: '250px' } }}>
            <paramsContext.Provider value={{ params, setParams }}>
              <filterContext.Provider value={{ showFilter, setShowFilter }}>
                <ResponsiveDrawer />
              </filterContext.Provider>
            </paramsContext.Provider>
          </Box>
          <Box sx={{ flex: 1, mr: { sm: 0, md: 5, lg: 10 } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                mt: 0,
                mb: 4,
                width: { sm: '70%', md: '50%' },
              }}
            >
              <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                label="Search Courses"
                variant="standard"
                fullWidth
                color="primary"
                sx={{ mr: 2 }}
                defaultValue={params.searchQuery}
                value={params.searchQuery}
                onChange={(e) => handleSearchQuery(e)}
              />
              {params.organization && (
                <Chip
                  label={params.organization}
                  variant="outlined"
                  onDelete={handleOrgChipDelete}
                />
              )}
              <Button
                startIcon={<TuneIcon />}
                sx={{ display: { xs: 'flex', sm: 'none' }, px: 3 }}
                onClick={() => setShowFilter(!showFilter)}
              >
                Filters
              </Button>
            </Box>
            <Grid container spacing={2}>
              {isLoading ||
              isError ||
              !courses ||
              isRefetchError ||
              isRefetching ? (
                [...Array(5).keys()].map((_) => (
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Stack spacing={1}>
                      <Skeleton
                        variant="rectangular"
                        width={300}
                        height={100}
                      />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </Stack>
                  </Grid>
                ))
              ) : courses.length > 0 ? (
                courses.map((course: any) => (
                  <Grid item xs={12} sm={6} md={6} lg={4}>
                    <CourseCard key={course.courseId} course={course} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <NoResults value={params.searchQuery} />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
