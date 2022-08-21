import { Box, Button, Chip, Container, Stack, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated, easings } from '@react-spring/web';
import { InfoOutlined } from '@mui/icons-material';

export function StudentHero() {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles_1 = useSpring({
    loop: { reverse: true },
    from: { x: -10, y: -10 },
    to: { x: 10, y: 10 },
    config: {
      duration: 3000,
      mass: 1,
      tension: 120,
      friction: 20,
      easing: easings.easeInOutSine,
    },
  });

  const styles_2 = useSpring({
    loop: { reverse: true },
    from: { x: -30 },
    to: { x: 50 },
    config: {
      duration: 4000,
      mass: 1,
      tension: 120,
      friction: 20,
      easing: easings.easeInOutSine,
    },
  });

  const styles_3 = useSpring({
    loop: { reverse: true },
    from: { x: -10, y: -10 },
    to: { x: 10, y: 10 },
    config: {
      duration: 2000,
      mass: 1,
      tension: 120,
      friction: 20,
      easing: easings.easeInOutSine,
    },
  });

  const styles_4 = useSpring({
    loop: { reverse: true },
    from: { x: -10, y: -10, rotateZ: 0 },
    to: { x: 10, y: 10, rotateZ: 60 },
    config: {
      duration: 2000,
      mass: 1,
      tension: 120,
      friction: 20,
      easing: easings.easeInOutSine,
    },
  });

  const text = {
    color: '#f5f5f5',
    textShadow:
      '1px 1px 1px #919191,1px 2px 1px #919191,1px 3px 1px #919191,1px 4px 1px #919191,1px 5px 1px #919191,1px 6px 1px #919191,1px 7px 1px #919191,1px 8px 1px #919191,1px 9px 1px #919191,1px 10px 1px #919191,1px 18px 6px rgba(16,16,16,0.4),1px 22px 10px rgba(16,16,16,0.2),1px 25px 35px rgba(16,16,16,0.2),1px 30px 60px rgba(16,16,16,0.4)',
  };

  return (
    <Box sx={{ background: alpha(theme.palette.primary.main, 0.1) }}>
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
            <Box>
              <Chip variant='outlined' icon={<InfoOutlined/>} clickable color='info'   label={'V1.0 Released. See What\'s New'} ></Chip>
            </Box>
            <Typography variant="h2" fontWeight={600} my={3}>
              Learning, Reimagined.
            </Typography>
            <Typography mb={3}>
              Improve to your knowledge, wherever you are.
            </Typography>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="contained"
                // color="secondary"
                disableElevation
                size="large"
                onClick={() => navigate('/student')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/courses')}
              >
                Explore
              </Button>
            </Stack>
          </Box>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                position: 'relative',
              }}
            >
              {/*  
            <animated.img
              src="/assets/images/icon_1.png"
              style={{ ...styles_1, width: '20%', position: 'absolute', right: '12%', top: '15%' }}
              alt=""
            />
            <animated.img
              src="/assets/images/icon_2.png"
              style={{ ...styles_2, width: '16%', position: 'absolute', left: '15%', top: '15%' }}
              alt=""
            />

            <animated.img
              src="/assets/images/icon_3.png"
              style={{ ...styles_3, width: '10%', position: 'absolute', left: '15%', top: '50%', backgroundColor: 'rgba(255, 255, 255,1)', padding: '5px', borderRadius: '10px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }}
              alt=""
            />

            <animated.img
              src="/assets/images/icon_4.png"
              style={{ ...styles_4, width: '16%', position: 'absolute', right: '15%', bottom: '20%' }}
              alt=""
            />
            <animated.div style={{ ...styles_2, width: '16%', position: 'absolute', left: '35%', bottom: '20%' }}>
              <Typography variant="h5" style={text} noWrap>
                E=mc<sup>2</sup>
              </Typography>
            </animated.div>
            */}
              <img
                src="/assets/images/img_1.png"
                alt=""
                style={{ minWidth: '150%' }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
