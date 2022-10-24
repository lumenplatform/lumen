import * as React from 'react';
import { alpha } from '@mui/system';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Container, Grid, Typography, useTheme } from '@mui/material';

export default function ContactUs() {
  const theme = useTheme();
  return (
    <Grid>
          <Box
              sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  m: 1,
                  width: '100%',
                  height: 300,
                  ml: '80px',
                  // border: 1,
              }}
          >
              <Paper variant="outlined" elevation={0}>
                  <Box sx={{ background: '#afafaf' }}>
                      <Container>
                          <Box sx={{ display: 'flex' }}>
                              <Box
                                  sx={{
                                      flex: 1,
                                      pl: 3,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                  }}
                              >
                                  <Typography variant="h2" fontWeight={600} my={2}>
                                      About
                                  </Typography>
                                  <Typography mb={3}>
                                      Lumėn is a SaaS product for online course providers that
                                      helps them keep control of what paying users can do with
                                      their material and prevent illegal copying, modification,
                                      and distribution of those works.
                                  </Typography>
                              </Box>
                              <Box>
                                  <Box
                                      sx={{
                                          display: 'flex',
                                          alignContent: 'flex-end',
                                          marginLeft: '50%',
                                          position: 'relative',
                                      }}
                                  >
                                      <img
                                          src="/assets/images/aboutUs.jpg"
                                          alt=""
                                          style={{ maxWidth: '70%', alignContent: 'flex-end' }} />
                                  </Box>
                              </Box>
                          </Box>
                      </Container>
                  </Box>
              </Paper>
          </Box>
      </Grid>
      






  );
}
