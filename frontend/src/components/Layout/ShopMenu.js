import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CampaignIcon from '@mui/icons-material/Campaign';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import mallLogo from '../../assets/logo_white.png'; // Adjust the path to your logo image


const ShopMenu = () => {
    const location = useLocation(); // Track the current route

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/shopProfile' },
        { text: 'Update Profile', icon: <AccountCircleIcon />, path: '/updateShopProfile' },
        { text: 'Set Promotion', icon: <CampaignIcon />, path: '/addpromotions' },
        { text: 'All Promotions', icon: <ListAltIcon />, path: '/allpromo' },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#1c1c1c',
                    color: '#ffffff',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 64,
                    backgroundColor: '#282828',
                    marginBottom: '1rem',
                }}
            >
                <img 
                    src={mallLogo} // Path to your logo image
                    alt="Mall Logo"
                    style={{
                        width: '50px', // Set desired width
                        height: '50px', // Set desired height
                        marginRight: '16px', // Space between logo and title
                    }}
                />
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Serendib Plaza</Typography>
            </Box>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        component={Link}
                        to={item.path}
                        key={item.text}
                        sx={{
                            backgroundColor: location.pathname === item.path ? '#f2f2f2' : 'inherit',  // Grey color for active item
                            color: location.pathname === item.path ? '#000000' : '#ffffff',
                            '&:hover': {
                                backgroundColor: '#f2f2f2',  // Grey color on hover
                                color: '#000000',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: location.pathname === item.path ? '#000000' : '#ffffff' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default ShopMenu;
