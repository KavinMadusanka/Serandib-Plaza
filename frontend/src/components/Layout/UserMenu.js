import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const UserMenu = () => {
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
                <ListItem button component={Link} to="/userprofile" aria-label="Dashboard">
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/updateprofile" aria-label="Update Profile">
                    <ListItemIcon>
                        <AccountCircleIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Update Profile" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/wishlist" aria-label="Wishlist">
                    <ListItemIcon>
                        <FavoriteIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Wishlist" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/shopping-list" aria-label="Shopping List">
                    <ListItemIcon>
                        <ShoppingBasketIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Shopping List" sx={{ color: '#ffffff' }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default UserMenu;
