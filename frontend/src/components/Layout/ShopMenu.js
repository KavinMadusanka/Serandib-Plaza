import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CampaignIcon from '@mui/icons-material/Campaign';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';

const ShopMenu = () => {
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
                <Typography variant="h6" sx={{ color: '#ffffff' }}>Serendib Plaza</Typography>
            </Box>
            <List>
                <ListItem button component={Link} to="/shopProfile" aria-label="Dashboard">
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/updateShopProfile" aria-label="Update Profile">
                    <ListItemIcon>
                        <AccountCircleIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Update Profile" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/addpromotions" aria-label="Set Promotion">
                    <ListItemIcon>
                        <CampaignIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Set Promotion" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/allpromo" aria-label="All Promotions">
                    <ListItemIcon>
                        <ListAltIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="All Promotions" sx={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem button component={Link} to="/settings" aria-label="Settings">
                    <ListItemIcon>
                        <SettingsIcon sx={{ color: '#ffffff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Settings" sx={{ color: '#ffffff' }} />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default ShopMenu;
