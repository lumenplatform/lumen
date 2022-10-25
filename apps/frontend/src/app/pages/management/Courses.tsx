import {
  BookOnlineOutlined,
  EditOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import {
  Button,
  Chip,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  Skeleton,
  Stack,
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
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { createContext } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../styles.css';
import { getOrgCourses, search } from '../../api';

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

type Params = {
  searchQuery?: string;
  publishStatus: string;
};

const queryParams = new URLSearchParams(window.location.search);

const defaultParams: Params = {
  searchQuery: queryParams.has('query') ? queryParams.get('query')! : undefined,
  publishStatus: 'ALL',
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
  const { params, setParams } = React.useContext(paramsContext);

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="status-select-small">Status</InputLabel>
        <Select
          labelId="status-select-small"
          id="status-select-small"
          label="Status"
          defaultValue="ALL"
          onChange={(e) => {
            setParams({ ...params, publishStatus: e.target.value });
          }}
        >
          <MenuItem value={'ALL'}>All</MenuItem>
          <MenuItem value={'PUBLISHED'}>Published</MenuItem>
          <MenuItem value={'UNPUBLISHED'}>Unpublished</MenuItem>
          <MenuItem value={'DRAFT '}>Draft</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function NoResults(props: any) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <SchoolOutlinedIcon fontSize="large" />
      <Typography variant="h6">No Courses Found </Typography>
    </Stack>
  );
}

export default function Users() {
  const [showFilter, setShowFilter] = React.useState(false);
  const [params, setParams] = React.useState(defaultParams);
  const theme = useTheme();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data, isError, isLoading, isRefetching, isRefetchError, refetch } =
    useQuery('search-courses', () =>
      getOrgCourses(params.searchQuery, params.publishStatus)
    );

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
    setParams((prevState: Params) => ({
      ...prevState,
      searchQuery: queryParams.has('query') ? queryParams.get('query')! : '',
    }));
    console.log(params);
  }, [location]);

  React.useEffect(() => {
    refetch();
  }, [params]);

  const draftChip = (status: string) => {
    // const j = {.PUBLISHED};
    if (status == 'PUBLISHED') {
      return (
        <Chip label={status} color="success" size="medium" variant="outlined" />
      );
    } else
      return (
        <Chip label={status} color="warning" size="medium" variant="outlined" />
      );
  };

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
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center">
        <BookOnlineOutlined />
        <Typography ml={1} variant="h6">
          Your Courses
        </Typography>
        <Box flex={'1 1 0'}></Box>
        <Button
          variant="contained"
          disableElevation
          onClick={() => navigate('/manage/new-course')}
        >
          New Course
        </Button>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: 2,
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
        <paramsContext.Provider value={{ params, setParams }}>
          <ResponsiveDrawer />
        </paramsContext.Provider>
      </Box>

      <Grid>
        {isLoading || isError || !data || isRefetchError || isRefetching ? (
          [...Array(1).keys()].map((_) => (
            <Stack spacing={1}>
              <Skeleton width={800} height={40} />
            </Stack>
          ))
        ) : data.length > 0 ? (
          <TableContainer>
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
                          justifyContent: 'center',
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
                            navigate(`/manage/courses/${row.courseId}/edit`);
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
                    colSpan={4}
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
  );
}
