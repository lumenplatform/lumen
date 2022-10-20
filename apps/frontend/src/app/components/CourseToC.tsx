/* eslint-disable react/no-danger */
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Nav = styled('nav')(({ theme }) => ({
  top: 0,
  order: 1,
  width: 240,
  flexShrink: 0,
  position: 'sticky',
  overflowY: 'auto',
}));

const NavLabel = styled(Typography)(({ theme }) => ({
  marginTop: 2,
  marginBottom: 1,
  paddingLeft: theme.spacing(1.4),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightBold,
  textTransform: 'uppercase',
  letterSpacing: '.08rem',
  color: theme.palette.grey[600],
}));

const NavList = styled(Typography)<{ component: any }>({
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const NavItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'secondary',
})<{ active?: any; secondary?: any }>(({ active, secondary, theme }) => {
  const activeStyles = {
    borderLeftColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      borderLeftColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
  };

  return {
    fontSize: theme.typography.pxToRem(13),
    padding: theme.spacing(0, 1, 0, secondary ? 2.5 : '10px'),
    margin: theme.spacing(0.5, 0, 1, 0),
    borderLeft: `1px solid transparent`,
    boxSizing: 'border-box',
    fontWeight: 600,
    '&:hover': {
      borderLeftColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[400]
          : theme.palette.grey[600],
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[600]
          : theme.palette.grey[200],
    },
    ...(!active && {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[500]
          : theme.palette.text.primary,
    }),
    ...(active && activeStyles),
    '&:active': activeStyles,
  };
});

export default function CourseToC(props: {
  items: { text: string; id: string }[];
  activeItem?: string;
  onChange?: any;
}) {
  const items = props.items;

  const itemLink = (item: any) => (
    <NavItem
      display="block"
      // href={`#${item.hash}`}
      underline="none"
      active={item.active}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </NavItem>
  );

  return (
    <Nav>
      {items.length > 0 ? (
        <React.Fragment>
          <NavLabel gutterBottom>{'Course Contents'}</NavLabel>
          <NavList component="ul">
            {items.map((item, index) => (
              <li key={item.text}>
                {itemLink({ ...item, active: index == 1 })}
              </li>
            ))}
          </NavList>
        </React.Fragment>
      ) : null}
    </Nav>
  );
}
