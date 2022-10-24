import {
  Edit,
  EditOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Button,
  Checkbox,
  Chip,
  Container,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  List,
  Skeleton,
  Slider,
  Stack,
  SvgIcon,
  TableFooter,
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
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrgCourses, search } from '../../api';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import TablePagination from '@mui/material/TablePagination';
import '../../../styles.css';
import { border } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

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

  const statuses = ['Published', 'Unpublished'];

  const Name = (
    <List sx={{ mx: { xs: 2, sm: 0 }, mr: { sm: 2 }, mt: { xs: 0 } }}>
      <div className="dropdown">
        <Grid>
          <Grid item xs={6} md={8} sx={{ mt: 0 }}>
            <Typography variant="body1" sx={{}}>
              Filter By:
            </Typography>
          </Grid>
          <Grid item xs={6} md={8}>
            <Box>
              <FormControl
                component="fieldset"
                sx={{ mt: -4, display: 'flex', border: 0 }}
              >
                <FormLabel component="legend">
                  <button className="dropbtn">
                    <Typography variant="body1" sx={{}}>
                      Status{' '}
                      <SvgIcon
                        component={ArrowDropDownIcon}
                        sx={{ paddingLeft: '6px' }}
                      />
                    </Typography>
                  </button>
                </FormLabel>

                <FormGroup>
                  <div className="dropdown-content">
                    {statuses
                      .filter(
                        (_text, index, arr) => showMore.stats || index < 4
                      )
                      .map((text) => (
                        <li>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={() =>
                                  setParams((prevState: Params) => ({
                                    ...prevState,
                                    publishStatus: updateArray(
                                      prevState.publishStatus,
                                      text
                                    ),
                                  }))
                                }
                              />
                            }
                            label={text}
                          />
                        </li>
                      ))}
                  </div>
                </FormGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </div>
    </List>
  );

  return <Box sx={{ position: 'right', height: '0%', border: 0 }}>{Name}</Box>;
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const { data } = useQuery('search-courses', () => getOrgCourses());

  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  // const x = (data.length) / 5;

  const handleSearchQuery = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    queryParams.set('query', event.target.value);
    navigate(`/manage/courses?${queryParams.toString()}`);
  };

  const handleOrgChipDelete = () => {
    queryParams.delete('organization');
    navigate(`/manage/courses?${queryParams.toString()}`);
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

  const draftChip = (status: string) => {
    // const j = {.PUBLISHED};
    if (status == 'PUBLISHED') {
      return (<Chip label={status} color="success" size="medium" variant="outlined" />)
    }else return (<Chip label={status} color="warning" size="medium" variant="outlined" />)
  
    
  };

  //Table pagination
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Container>
        <Box sx={{ display: 'flex', margin: '0 auto' }}>
          <Box sx={{ flex: 1, mr: { sm: 0, md: 5, lg: 10 } }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                    sx={{ mr: 3 }}
                    defaultValue={params.searchQuery}
                    value={params.searchQuery}
                    onChange={(e) => handleSearchQuery(e)}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ width: { sm: '250px' } }}>
                  <paramsContext.Provider value={{ params, setParams }}>
                    <filterContext.Provider
                      value={{ showFilter, setShowFilter }}
                    >
                      <Box>
                        <ResponsiveDrawer />
                      </Box>
                    </filterContext.Provider>
                  </paramsContext.Provider>
                </Box>
              </Grid>
            </Grid>

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

            <Grid>
              {isLoading ||
              isError ||
              !data ||
              isRefetchError ||
              isRefetching ? (
                [...Array(1).keys()].map((_) => (
                  <Stack spacing={1}>
                    <Skeleton width={800} height={40} />
                  </Stack>
                ))
              ) : data.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ pl: theme.spacing(3) }}>
                          Course
                        </TableCell>
                        {/* <TableCell>Enrolled</TableCell> */}
                        <TableCell>Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    {/* apply all here */}

                    <TableBody>
                      {(rowsPerPage > 0
                        ? data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((row: any) => (
                        <TableRow key={row.title}>
                          <TableCell sx={{ pl: theme.spacing(3) }}>
                            <Typography variant="body2">{row.title}</Typography>
                          </TableCell>
                          <TableCell>{row.price}$</TableCell>
                          
                            <TableCell>{draftChip(row.status)}</TableCell>
                            {/* <TableCell><Chip label={status} color={status == 'PUBLISHED'?"warning":""} size="small" variant="outlined" /></TableCell> */}
                          
                          <TableCell>
                            <Box
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
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
                      ))}
                    </TableBody>

                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: 'All', value: -1 },
                          ]}
                          colSpan={3}
                          count={data.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
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
