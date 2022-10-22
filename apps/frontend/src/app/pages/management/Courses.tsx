import { Edit, EditOutlined, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Button,
  Checkbox,
  Chip,
  Collapse,
  Container,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import React from 'react';
import { createContext } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getOrgCourses, search } from '../../api';
import '../../../styles.css'; 

function updateArray(array: string[] | any[], element: any) {
  const x = [...array];
  x.includes(element) ? x.splice(array.indexOf(element), 1) : x.push(element);
  return x;
}

type Params = {
  searchQuery?: string;
  publishStatus: string[];
};

const queryParams = new URLSearchParams(window.location.search);

const defaultParams: Params = {
  searchQuery: queryParams.has('query') ? queryParams.get('query')! : undefined,
  publishStatus: [],
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
  const [showMore, setShowMore] = React.useState({
    stats: false,
  });
  const handleDrawerToggle = () => {
    setShowFilter(!showFilter);
  };

  const statuses = ['PUBLISHED', 'Unpublished'];

  const drawer = (
    <List sx={{ mx: { xs: 2, sm: 0 }, mr: { sm: 2 }, mt: { xs: 3 } }}>
      <Typography variant="h6">Filter By</Typography>
      <FormControl component="fieldset" sx={{ mt: 4, display: 'flex' }}>
        <FormLabel component="legend">
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Status
          </Typography>
        </FormLabel>
        <FormGroup>
        
          {statuses
          .filter((text, index, arr) => showMore.stats || index < 4)
          .map((text) => (
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    setParams((prevState: Params) => ({
                      ...prevState,
                      publishStatusp: updateArray(prevState.publishStatus, text),
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
              subjects: !prevState.stats,
            }))
          }
        >
          {statuses.length < 4
            ? ''
            : showMore.stats
            ? 'Show less'
            : 'Show more'}
        </Button>
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

export default function Users() {
  const [showFilter, setShowFilter] = React.useState(false);
  const [params, setParams] = React.useState(defaultParams);
  const theme = useTheme();

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
    navigate(`/manage/courses?${queryParams.toString()}`);
  };

  React.useEffect(() => {
    console.log(queryParams.has('query'));
    setParams((prevState: Params) => ({
      ...prevState,
      searchQuery: queryParams.has('query') ? queryParams.get('query')! : '',
    }));
    console.log('params', params);
  }, [location]);

  React.useEffect(() => {
    refetch();
  }, [params]);

  const { data } = useQuery('org-courses', () => getOrgCourses());

  const draftChip = (status: string) => (
    <Chip label={status} color="warning" size="small" variant="outlined" />
  );


  return (
    <Container>
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
            <Button
              startIcon={<TuneIcon />}
              sx={{ display: { xs: 'flex', sm: 'none' }, px: 3 }}
              onClick={() => setShowFilter(!showFilter)}
            >
              Filters
            </Button>

            <div className="dropdown">
  <button className="dropbtn">Filter By</button>
  <div className="dropdown-content">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
  </div>
</div>

          </Box>

 

          <Box>
            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h5"
                sx={{ my: theme.spacing(2) }}
                component="div"
              >
                Courses
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/manage/new-course')}
              >
                New Course
              </Button>
            </Stack>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: theme.spacing(3) }}>Course</TableCell>
                    {/* <TableCell>Enrolled</TableCell> */}
                    <TableCell>Price</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ||
                  isError ||
                  !data ||
                  isRefetchError ||
                  isRefetching ? (
                    [...Array(1).keys()].map((_) => <Skeleton width={1000} />)
                  ) : data.length > 0 ? (
                    data.map((row: any) => (
                      <TableRow key={row.title}>
                        <TableCell sx={{ pl: theme.spacing(3) }}>
                          <Typography variant="body2">{row.title}</Typography>
                        </TableCell>
                        {/* <TableCell>{row.price}</TableCell> */}
                        <TableCell>{row.price}$</TableCell>
                        <TableCell>{draftChip(row.status)}</TableCell>
                        <TableCell>
                          <Box
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Button
                              startIcon={<RemoveRedEyeOutlinedIcon />}
                              onClick={() => {
                                navigate(`/manage/courses/${row.courseId}`);
                              }}
                            >
                              View
                            </Button>
                            &nbsp; | &nbsp;
                            <Button
                              startIcon={<EditOutlined />}
                              onClick={() => {
                                navigate(
                                  `/manage/courses/${row.courseId}/edit`
                                );
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                      <NoResults value={params.searchQuery} />
                    </Grid>
                  )}
                </TableBody>
              </Table>

              {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={5}
            page={0}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          /> */}
            </TableContainer>
          </Box>
        </Box>{' '}
      </Box>
    </Container>
  );
}
