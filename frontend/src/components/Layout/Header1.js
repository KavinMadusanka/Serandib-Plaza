import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom'; // Adjust if using a different routing library

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1c1c1c' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Serendib Plaza
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/">
                        About Us
                    </Button>
                    <Button color="inherit" component={Link} to="/shops">
                        Shops
                    </Button>
                    <Button color="inherit" component={Link} to="/promotions">
                        Promotions
                    </Button>
                    <Button color="inherit" component={Link} to="/*">
                        Events
                    </Button>
                    <Button color="inherit" component={Link} to="/*">
                        ContactUs
                    </Button>
                    <Button color="inherit" component={Link} to="/register">
                        Register
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    {/* <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        component={Link}
                        to="/profile"
                    >
                        <AccountCircle />
                    </IconButton> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
