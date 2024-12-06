import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, ListItemIcon, Collapse, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Dashboard as DashboardIcon, People as PeopleIcon, BarChart as BarChartIcon } from '@mui/icons-material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import AppleIcon from '@mui/icons-material/Apple';

const Sidebar = () => {
    const [openTeam, setOpenTeam] = React.useState(true);
    const location = useLocation();

    const handleClick = () => {
        setOpenTeam(!openTeam);
    };

    // Helper function to check if the current route matches
    const isSelected = (path) => location.pathname === path;

    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    backgroundColor: '#333', // Dark theme background
                    color: '#fff', // Text color white for contrast
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List sx={{ paddingTop: 0 }}>
                {/* Main Header - Task Planner */}
                <ListItem
                    sx={{
                        backgroundColor: '#444',
                        padding: '20px',
                        color: 'white', // Highlight Task Planner if on homepage
                    }}
                >
                    <ListItemIcon>
                        <AppleIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                            Task Planner
                        </Typography>
                    } />
                </ListItem>
                <Divider />

                {/* Dashboard Menu */}
                <ListItem
                    button
                    component={Link}
                    to="/dashboard"
                    sx={{
                        backgroundColor: isSelected('/dashboard') ? '#ff9800' : 'transparent',
                        color: isSelected('/dashboard') ? 'white' : 'grey',
                        '&:hover': {
                            backgroundColor: '#ff9800a8', // Hover effect for Dashboard
                            color: 'white',
                        },
                    }}
                >
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
                </ListItem>

                {/* Team Menu with Submenu */}
                <ListItem
                    button
                    onClick={handleClick}
                    sx={{
                        backgroundColor: isSelected('/team') ? '#ff9800' : 'transparent',
                        color: isSelected('/team') ? 'white' : 'grey',
                        '&:hover': {
                            backgroundColor: '#ff9800a8', // Hover effect for Team
                            color: 'white',
                        },
                    }}
                >
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Team" />
                    {openTeam ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
                </ListItem>
                <Collapse in={openTeam} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem
                            button
                            component={Link}
                            to="/team"
                            sx={{
                                paddingLeft: '40px',
                                '&:hover': {
                                    backgroundColor: '#ff9800a8', // Hover effect for Team members
                                },
                            }}
                        >
                            <ListItemText primary="Team Member 1" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/team"
                            sx={{
                                paddingLeft: '40px',
                                '&:hover': {
                                    backgroundColor: '#ff9800a8', // Hover effect for Team members
                                },
                            }}
                        >
                            <ListItemText primary="Team Member 2" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/team"
                            sx={{
                                paddingLeft: '40px',
                                '&:hover': {
                                    backgroundColor: '#ff9800a8', // Hover effect for Team members
                                },
                            }}
                        >
                            <ListItemText primary="Team Member 3" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Reports Menu */}
                <Divider />
                <ListItem
                    button
                    component={Link}
                    to="/reports"
                    sx={{
                        backgroundColor: isSelected('/reports') ? '#ff9800' : 'transparent',
                        color: isSelected('/reports') ? 'white' : 'grey',
                        '&:hover': {
                            backgroundColor: '#ff9800a8', // Hover effect for Reports
                            color: 'white',
                        },
                    }}
                >
                    <ListItemIcon>
                        <BarChartIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Reports" sx={{ color: 'white' }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
