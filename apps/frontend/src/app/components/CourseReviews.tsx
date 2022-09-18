import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,

} from '@mui/material';

import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { NavLink, Outlet } from 'react-router-dom';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function CourseReviews(props: any) {
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
    

    <div>

      <Grid container spacing={2} rowSpacing={1}>

        <Grid item xs={5} md={5}>
        </Grid>

        <Grid item xs={3} md={3}>
          <Box sx={{ display: 'flex', margin: '', backgroundColor: 'white', height: '100px', width: '50%', paddingLeft: '8px'}}>
            <h1>4.7</h1>
            <Box sx={{ paddingTop: '20px', paddingLeft: '8px'}}>
              <Rating name="read-only" value={4} readOnly size="small" />
              <div style={{ height: '48px', paddingTop: '' }}> 130 Reviews </div>
            </Box>
          </Box> 
        </Grid> 

        <Grid item xs={4} md={4}>
        </Grid>

{/* ------ */}

        <Grid item xs={0} md={3}>
        </Grid>

        <Grid item xs={12} md={6}>
        <Item>
            <Grid container spacing={2}>
              <Grid item xs={2} md={2}>
                  5 stars                
              </Grid>
              <Grid item xs={8} md={8}> 
                <Box sx={{  mt: '6px' }}>             
                  <LinearProgress variant="determinate" value={75} />  </Box>                
              </Grid>
              <Grid item xs={2} md={2}>             
                75%              
              </Grid>
            </Grid> 
          </Item>

          <Item>
            <Grid container spacing={2}>
              <Grid item xs={2} md={2}>                
                  4 stars              
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ mt: '5px', paddingTop: '3px' }}>
                  <LinearProgress variant="determinate" value={10} />
                </Box>       
              </Grid>
              <Grid item xs={2} md={2}>       
                10%       
              </Grid>
            </Grid> 
          </Item>

          <Item>
          <Grid container spacing={2}>
              <Grid item xs={2} md={2}>                
                  4 stars              
              </Grid>
              <Grid item xs={8} md={8}>  
                <Box sx={{ mt: '6px'}}>        
                  <LinearProgress variant="determinate" value={8} />       
                </Box>    
              </Grid>
              <Grid item xs={2} md={2}>       
                8%       
              </Grid>
            </Grid> 
          </Item>

          <Item>
            <Grid container spacing={2}>
              <Grid item xs={2} md={2}>              
                  2 stars             
              </Grid>
              <Grid item xs={8} md={8}>   
                <Box sx={{ paddingTop: '5px', mt: '3px' }}>              
                  <LinearProgress variant="determinate" value={5} />
                </Box>             
              </Grid>
              <Grid item xs={2} md={2}>                
                5%              
              </Grid>
            </Grid> 
          </Item>

          <Item>
            <Grid container spacing={2}>
              <Grid item xs={2} md={2}>            
                  1 stars       
              </Grid>
              <Grid item xs={8} md={8}>
                <Box sx={{ paddingTop: '5px', mt: '5px' }}>              
                  <LinearProgress variant="determinate" value={2} />
                </Box>                
              </Grid>
              <Grid item xs={2} md={2}>                
                2%                
              </Grid>
            </Grid> 
          </Item>
        </Grid> 

        <Grid item xs={0} md={3}>
        </Grid>  

{/* ------ */}

        <Grid item xs={1} md={1}>
        </Grid>

        <Grid item xs={10} md={10}>
          <Item>
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
          </Item>
        </Grid> 

        <Grid item xs={1} md={1}>
        </Grid>




  </Grid>
         
      



        


      
 
    

    </div>
  );
}
