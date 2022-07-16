import { Grid, Paper, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import StatCard from '../../components/StatCard';
import { alpha } from '@mui/system';
import { Component } from 'react';
import Chart from 'react-apexcharts';

export default function Dashboard() {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Paper
            elevation={4}
            sx={{
              height: '150px',
              background:
                'url(https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/stylish/static/media/welcome-bg2-2x-svg.97ed12dc.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'right',
              backgroundSize: '160px 170px',
              p: 3,
              borderRadius: 4,
            }}
          >
            <Typography variant="h6"> New Enrollments</Typography>
            <Typography
              fontWeight="700"
              fontSize={'2rem'}
              color={theme.palette.success.main}
            >
              +3
            </Typography>
            <Typography variant="caption">Since last week</Typography>
          </Paper>
        </Grid>
        <Grid item md={3}>
          <StatCard></StatCard>
        </Grid>
        <Grid item md={3}>
          <StatCard></StatCard>
        </Grid>
        <Grid item md={3}>
          <StatCard></StatCard>
        </Grid>
        <Grid item md={4}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              height: '45%',
              mb: 2,
            }}
          >
            <HeatMapChart />
          </Paper>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              height: '50%',
            }}
          >
            &nbsp;
          </Paper>
        </Grid>
        <Grid item md={8}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              pt: 1,
            }}
          >
            <ChartX />
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
        chart: {
          id: 'basic-bar',
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
          name: 'series-1',
          data: [44, 40, 35, 50, 39, 60, 70, 91],
        },
      ],
    };
  }

  override render() {
    return (
      <Chart
        options={this.state['options']}
        series={this.state['series']}
        type="bar"
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

  var options = {
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
