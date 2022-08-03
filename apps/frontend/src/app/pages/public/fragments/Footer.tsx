import {
  Box, Container,
  Divider, Link, Stack, Typography,
  useTheme
} from '@mui/material';


export function Footer() {
  const theme = useTheme();

  const FooterLink = ({ text, link }: { text: string; link: string; }) => {
    return (
      <Link
        href={link}
        style={{
          color: 'white',
          display: 'block',
          marginBottom: 2,
        }}
        underline="hover"
      >
        <span>{text}</span>
      </Link>
    );
  };

  return (
    <Box
      sx={{
        background: theme.palette.primary.main,
        color: 'white',
        px: 2,
        py: 4,
      }}
    >
      <Container>
        <Stack direction={'row'} spacing={5}>
          <Stack>
            <FooterLink text="Teach on Lumen" link="/teach" />
            <FooterLink text="Downloads" link="/desktop/" />
            <FooterLink text="About us" link="#" />
            <FooterLink text="Contact us" link="#" />
          </Stack>
          <Stack>
            <FooterLink text="Terms" link="/terms/" />
            <FooterLink text="Privacy policy" link="/terms/" />
          </Stack>
          <Box style={{ flexGrow: 1 }}></Box>
          <Stack textAlign={'right'}>
            <Typography
              fontWeight={700}
              lineHeight="1"
              color="white"
              fontSize="2.5rem"
            >
              Lumėn
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ my: 2 }}></Divider>
        <Typography> © 2022 Lumen. All rights Reserved</Typography>
      </Container>
    </Box>
  );
}
