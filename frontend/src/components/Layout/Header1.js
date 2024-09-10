import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/auth'; 
import { useCart } from '../../context/cart';


const Header1 = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleLogout = () => {
        // Clear authentication data
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        // Redirect to the login page after logging out
        navigate('/login');
    };

    // Determine the appropriate dashboard link based on user role
    const dashboardLink = auth && auth.user ? 
        (auth.user.role === 1 ? '/adminProfile' : '/userProfile') : 
        '/login'; // Default to login if no user

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}> {/* Set background color to black */}
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Serendib Plaza
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    About Us
                </Button>
                <Button color="inherit" component={Link} to="/shops">
                    Shops
                </Button>
                <Button color="inherit" component={Link} to="/promotions">
                    Promotions
                </Button>
                <Button color="inherit" component={Link} to="/events">
                    Events
                </Button>
                <Button color="inherit" component={Link} to="/contactus">
                    Contact Us
                </Button>
                
                  
                <Button  color="inherit" component={Link} to="/cart">
                       Cart {cart?.length}
                </Button>
               
                
                {auth && auth.user ? (
                    <>
                        <Button color="inherit" component={Link} to={dashboardLink}>
                            Profile
                        </Button>
                        
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header1;
