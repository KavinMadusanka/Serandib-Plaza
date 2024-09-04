import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';

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
                    <Button
                        color="inherit"
                        onClick={goToHome}
                        sx={{ mx: 1 }}
                    >
                        Home
                    </Button>

                    {/* Promotions Button */}
                    <Button
                        color="inherit"
                        onClick={goToPromotions}
                        sx={{ mx: 1 }}
                    >
                        Promotions
                    </Button>

                    {/* Inventory Button */}
                    <Button
                        color="inherit"
                        onClick={goToInventory}
                        sx={{ mx: 1 }}
                    >
                        Inventory
                    </Button>

                    {/* Logout Button */}
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        sx={{ mx: 1 }}
                    >
                        Logout
                    </Button>

                    {/* Optional Account Button */}
                    <Button
                        color="inherit"
                        sx={{ mx: 1 }}
                    >
                        Account
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default ShopHeader;
