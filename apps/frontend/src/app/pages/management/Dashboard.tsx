import { Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography, useTheme, Avatar, Divider, Rating } from '@mui/material';
import Box from '@mui/material/Box';
import { Component } from 'react';
import Chart from 'react-apexcharts';
import StatCard from '../../components/StatCard';
import * as React from 'react';

export default function Dashboard() {
  //create array of object containing review, rating, course name,user name, date, course id, user id and user image
  const reviews = [
    { review: 'The instructor was very articulate and the content is very feature rich. I also like the idea of answering open ended questions about data.', rating: '4', courseName: 'Calculas Basics', userName: 'Dariya K.', courseId: 'Course Id', userId: 'User Id', userImage: 'http://www.venmond.com/demo/vendroid/img/avatar/big.jpg', date: '2022-08-01' }
    ,
    { review: 'For anyone starting out as a data analyst, this is a great introduction and is very inspiring. The content was well paced and was accessible.', rating: '5', courseName: 'Machine learning', userName: 'Lisa L.', courseId: 'Course Id', userId: 'User Id', userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaH95MYy4lQdqXKOR2FCcv2KIHRhz7rCj4N8VKm4zbQmfaOU7lU_m_ykDR6sWGMMEKof8&usqp=CAU', date: '2022-08-05' }
    ,
    { review: "Gaining new knowledge and skills through Coursera helped me break out of the mold I'd been in for over a decade. Coursera helped open doors for me.", rating: '4', courseName: 'Key Technologies for Business', userName: 'Loreeli G.', courseId: 'Course Id', userId: 'User Id', userImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZSsRW8ahClgpWbdmk1wKCv_6d5ZNEf_kuZLEmarGpS7KAd8cHuXo9UPSJOy_EESmpu8&usqp=CAU', date: '2022-08-10' }
    ,
    { review: "The Specialization I took blew my mind. Each course was interesting, fun, and motivational, which encouraged me to continue learning.", rating: '4', courseName: 'Python for Everybody', userName: 'Visal K.', courseId: 'Course Id', userId: 'User Id', userImage: 'https://www.bnl.gov/today/body_pics/2017/06/stephanhruszkewycz-hr.jpg', date: '2022-08-11' }
  ];
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <StatCard heading={'New Enrollments'} caption={'Since Last Week'} stat={'+3'} image={'url(https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/stylish/static/media/welcome-bg2-2x-svg.97ed12dc.svg)'} imageSize={'30%'} />
        </Grid>
        <Grid item md={4}>
          <StatCard heading={'Income'} caption={'Since Last Week'} stat={'+$30.00'} image={'url(https://cdn3d.iconscout.com/3d/premium/thumb/income-5706071-4755626.png)'} imageSize={'30%'} />
        </Grid>
        <Grid item md={4}>
          <StatCard heading={'User engagemnet'} caption={'Since Last Week'} stat={'700Hrs'} image={'url(https://ouch-cdn2.icons8.com/-vVVU0ytD19Goilrknwy2AvD8Hdl5hOd0QA_Dfj18ds/rs:fit:256:162/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNzE3/LzQ4NmM0ZmJmLTQ0/MWItNDlkOS05NzE1/LTJmYjgxNzQ5Zjg4/OS5wbmc.png)'} imageSize={'40%'} />
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
            <Typography variant="h6">
              Latest Reviews
            </Typography>
            <List sx={{
              overflow: 'scroll',
              height: '85%',
              position: 'absolute',
              right: 0,
              top: '10%',
              borderRadius: theme.shape.borderRadius,
            }}>
              {reviews.map((review: any) => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={review.userName} src={review.userImage} />
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
                              {review.userName}
                            </Typography>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="caption"
                              color="text.primary"
                            >
                              {" - " + review.courseName}
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
            <ChartX />
            &nbsp;
          </Paper>
        </Grid>
      </Grid>
    </Box >
  );
}

class ChartX extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      options: {
        theme: {
          palette: 'palette5' // upto palette10
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
            return [seriesName, " Total - ", opts.w.globals.series[opts.seriesIndex].reduce((a: number, b: number) => a + b, 0)]
          }
        },

        xaxis: {
          categories: [
            '07/02',
            '07/02',
            '07/02',
            '07/02',
            '07/02',
            '07/02',
            '07/02',
            '07/02',
          ],
        },
      },
      series: [
        {
          name: 'Calculas Basics',
          data: [44, 40, 35, 50, 39, 60, 70, 91],
        },
        {
          name: 'Machine Learning',
          data: [76, 85, 66, 85, 67, 35, 45, 55],
        },
      ],
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
