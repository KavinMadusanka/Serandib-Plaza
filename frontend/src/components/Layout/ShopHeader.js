import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Box } from '@mui/material';

const ShopHeader = () => {
    const handleLogout = () => {
        // Implement logout functionality here
        console.log("Logout clicked");
    };

    const goToHome = () => {
        // Implement navigation to the homepage
        console.log("Home clicked");
    };

    const goToPromotions = () => {
        // Implement navigation to the promotions page
        console.log("Promotions clicked");
    };

    const goToInventory = () => {
        // Implement navigation to the inventory page
        console.log("Inventory clicked");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1c1c1c' }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Serendib Plaza
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Home Button */}
                    <IconButton
                        color="inherit"
                        aria-label="homepage"
                        onClick={goToHome}
                    >
                        <HomeIcon />
                    </IconButton>

                    {/* Promotions Button */}
                    <IconButton
                        color="inherit"
                        aria-label="promotions"
                        onClick={goToPromotions}
                    >
                        <CampaignIcon />
                    </IconButton>

                    {/* Inventory Button */}
                    <IconButton
                        color="inherit"
                        aria-label="inventory"
                        onClick={goToInventory}
                    >
                        <InventoryIcon />
                    </IconButton>

                    {/* Logout Button */}
                    <IconButton
                        color="inherit"
                        aria-label="logout"
                        onClick={handleLogout}
                    >
                        <LogoutIcon />
                    </IconButton>

                    {/* Optional Account Icon */}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default ShopHeader;
