import { AddLocationOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export function AddButton({ onClick }: { onClick: any; }) {
  return (
    <IconButton
      size="small"
      sx={{
        position: 'absolute',
        right: '100%',
        top: '-1.2rem',
        opacity: 0.2,
        '&:hover': {
          opacity: 1,
        },
      }}
      onClick={onClick}
    >
      <AddLocationOutlined sx={{ transform: 'rotate(-90deg)' }} />
    </IconButton>
  );
}
