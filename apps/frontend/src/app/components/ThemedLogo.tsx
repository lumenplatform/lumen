import { Typography } from '@mui/material';
import { useTheme } from '@mui/system';

export default function ThemedLogo() {
  const theme = useTheme();
  return (
    <>
      <img
        src="/assets/icons/logo_avatar.png"
        style={{ height: '48px', marginRight: '1rem' }}
        alt=""
      />
      <Typography
        fontWeight={700}
        fontSize="1.5rem"
        sx={{ mr: 2, color: (t) => t.palette.text.primary }}
      >
        Lum<span style={{ color: theme.palette['primary'].main }}>ė</span>n
      </Typography>
    </>
  );
}
