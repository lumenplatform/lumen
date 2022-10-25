import {
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Rating,
  Typography,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Component } from 'react';
import Chart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { getOrgStats } from '../../api';
import StatCard from '../../components/StatCard';

export default function Dashboard() {
  const theme = useTheme();

  const { data, isLoading } = useQuery('org-stats', getOrgStats);

  if (!data || isLoading) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <StatCard
            heading={'New Enrollments'}
            caption={'Since Last Week'}
            stat={'+ ' + data.enrollment_count}
            image={
              'url(https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/stylish/static/media/welcome-bg2-2x-svg.97ed12dc.svg)'
            }
            imageSize={'30%'}
          />
        </Grid>
        <Grid item md={4}>
          <StatCard
            heading={'Income'}
            caption={'Since Last Week'}
            stat={'+ $' + data.income}
            image={
              'url(https://cdn3d.iconscout.com/3d/premium/thumb/income-5706071-4755626.png)'
            }
            imageSize={'30%'}
          />
        </Grid>
        <Grid item md={4}>
          <StatCard
            heading={'User Engagement'}
            caption={'Since Last Week'}
            stat={data.engagement + ' Hrs'}
            image={
              'url(https://ouch-cdn2.icons8.com/-vVVU0ytD19Goilrknwy2AvD8Hdl5hOd0QA_Dfj18ds/rs:fit:256:162/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzE3/LzQ4NmM0ZmJmLTQ0/MWItNDlkOS05NzE1/LTJmYjgxNzQ5Zjg4/OS5wbmc.png)'
            }
            imageSize={'40%'}
          />
        </Grid>
        <Grid item md={4}>
          {/*           <Paper
            elevation={2}
            sx={{
              borderRadius: 4,
              height: '45%',
              mb: 2,
            }}
          >
            <HeatMapChart />
          </Paper> */}
          <Paper
            elevation={2}
            sx={{
              borderRadius: theme.shape.borderRadius,
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
              p: 3,
            }}
          >
            <Typography variant="h6">Latest Reviews</Typography>
            <List
              sx={{
                overflow: 'scroll',
                height: '85%',
                position: 'absolute',
                right: 0,
                top: '10%',
                borderRadius: theme.shape.borderRadius,
              }}
            >
              {data.reviews.map((review: any) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={review.user.name}
                        src={review.user.picture}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Box>
                            <Typography
                              sx={{ display: 'inline', fontWeight: 600 }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {review.user.name}
                            </Typography>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="caption"
                              color="text.primary"
                            >
                              {' - ' + review.enrollment.course.title}
                            </Typography>
                          </Box>
                          <Rating
                            name="size-small"
                            defaultValue={review.rating}
                            size="small"
                            readOnly
                            sx={{ mr: 0.5 }}
                          />
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="caption"
                            color="text.primary"
                          >
                            {review.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {review.review}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="middle" />
                </>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item md={8}>
          <Paper
            elevation={2}
            sx={{
              borderRadius: theme.shape.borderRadius,
              p: 3,
            }}
          >
            <Typography variant="h6">Enrollments</Typography>
            <ChartX data={data} />
            &nbsp;
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

class ChartX extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      options: {
        theme: {
          palette: 'palette5', // upto palette10
        },
        chart: {
          id: 'basic-bar',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          fontSize: '15em',
          fontWeight: 520,
          markers: {
            width: 10,
            height: 10,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 2,
          },
          formatter: function (seriesName: any, opts: any) {
            return [
              seriesName,
              ' Total - ',
              opts.w.globals.series[opts.seriesIndex].reduce(
                (a: number, b: number) => a + b,
                0
              ),
            ];
          },
        },

        xaxis: {
          categories: props.data.enrollments.dates,
        },
      },
      series: props.data.enrollments.counts,
    };
  }

  override render() {
    return (
      <Chart
        options={this.state['options']}
        series={this.state['series']}
        type="line"
      />
    );
  }
}

function HeatMapChart() {
  const series = [
    {
      name: 'Metric1',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric2',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric3',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric4',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric5',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
    {
      name: 'Metric6',
      data: generateData(18, {
        min: 0,
        max: 90,
      }),
    },
  ];

  const options = {
    dataLabels: {
      enabled: false,
    },
    title: {
      // text: 'HeatMap Chart (Single color)',
    },
  };
  return <Chart options={options} series={series} type="heatmap" />;
}

function generateData(cnt: any, opt: any) {
  return [
    44, 40, 35, 50, 39, 60, 70, 91, 44, 40, 35, 50, 39, 60, 70, 91, 44, 40,
  ];
}
