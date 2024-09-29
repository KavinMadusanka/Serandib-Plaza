import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const UserMenu = () => {
    const location = useLocation();

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/userprofile' },
        { text: 'Update Profile', icon: <AccountCircleIcon />, path: '/updateprofile' },
        { text: 'Wishlist', icon: <FavoriteIcon />, path: '/wishlist' },
        { text: 'Shopping List', icon: <ShoppingBasketIcon />, path: '/cart' },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                zIndex: 1,
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
                            backgroundColor: location.pathname === item.path ? '#f2f2f2' : 'inherit',
                            color: location.pathname === item.path ? '#000000' : '#ffffff',
                            '&:hover': {
                                backgroundColor: '#f2f2f2',
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

export default UserMenu;
