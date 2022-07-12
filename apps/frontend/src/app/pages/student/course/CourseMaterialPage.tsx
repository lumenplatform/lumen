import * as React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useEffect} from 'react'; 
import {
    Box,
    Breadcrumbs,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    useTheme,
    Link,
    Avatar,
    Collapse,
} from '@mui/material';
import { NavLink, Outlet,useParams } from 'react-router-dom';
import StudentHeader from '../../../components/StudentHeader';

const sideBarItems = [
    {
        path: '1',
        label: 'Introduction to partial derivatives',
    },
    {
        path: '2',
        label: 'Second partial derivatives',
    },
    {
        path: '3',
        label: 'The gradient',
    },
    {
        label: 'The Hessian',
        items:
            [{
                path: '4.1',
                label: 'Course Material',
            },
            {
                path: '4.2',
                label: 'Resources',
            },
            {
                path: '4.3',
                label: 'Course Info',
            }
            ]
    },
];

export function CourseNav() {
    return (
        <List>
            {sideBarItems.map((item, index) => {
                if (Object.prototype.hasOwnProperty.call(item, 'items')) {
                    return <CourseNavItemNested sideBarItems={item} index={index} />
                }
                else {
                    return <CourseNavItem sideBarItem={item} index={index} />
                }
            })}
        </List>
    );
}

function CourseNavItem(props: any) {
    const theme = useTheme();
    return (
        <NavLink
            to={props.sideBarItem.path}
            style={{ color: 'unset', textDecoration: 'unset' }}
            end={props.sideBarItem.path === '/manage'}
        >
            {({ isActive }) => (
                <ListItem
                    key={props.sideBarItem.label}
                    disablePadding
                    selected={isActive}
                    style={{
                        color: isActive ? theme.palette.primary.dark : '',
                    }}
                >
                    <ListItemButton>
                        <ListItemText primary={(props.index + 1) + ". " + props.sideBarItem.label} />
                    </ListItemButton>
                </ListItem>
            )}
        </NavLink>
    );
}
function CourseNavItemNested(props: any) {
    const { materialId } = useParams();
    const [open, setOpen] = React.useState(props.sideBarItems.items.some((item: any) => item.path === materialId));
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={(props.index + 1) + ". " + props.sideBarItems.label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout={50} >
                <List component="div" sx={{ p: 0, pl: 1 }}>
                    {props.sideBarItems.items.map((item: any, index: any) => {
                        return (
                            <CourseNavItem sideBarItem={item} index={index} />
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
}

export default function CoursePage(props: any) {
    return (
        <div>
            <StudentHeader />
            <Box sx={{ maxWidth: '1440px', px: 3 }}>
                <Box sx={{ py: 1 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/student">
                            Home
                        </Link>
                        <Link underline="hover" color="inherit" href="/student/">
                            Courses
                        </Link>
                        <Typography color="text.primary">Operating Systems I</Typography>
                        <Link underline="hover" color="inherit" href="/student">
                            Material
                        </Link>
                        <Link underline="hover" color="inherit" href="/student/">
                            Week 1
                        </Link>
                    </Breadcrumbs>
                </Box>
                <Box sx={{ display: 'flex', margin: '0 auto' }}>
                    <Box sx={{ width: '200px' }}>
                        <CourseNav />
                    </Box>
                    <Box sx={{ p: 2, flex: 1, mr: 10 }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
