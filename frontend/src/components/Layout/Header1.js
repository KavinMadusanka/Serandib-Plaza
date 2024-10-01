import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/auth'; 
import { useCart } from '../../context/cart';
import mallLogo from '../../assets/logo_white.png'; // Adjust the path to your logo image
import Shops from './../../pages/Shops';

const Header1 = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleLogout = () => {
        // Clear authentication data
        // setAuth({
        //     ...auth,
        //     user: null,
        //     token: "",
        // });
        localStorage.removeItem('auth');
        // Redirect to the login page after logging out
        navigate('/login');
        window.location.reload();
    };

    // Determine the appropriate dashboard link based on user role
    const dashboardLink = auth && auth.user ? 
        (auth.user.role === 1 ? '/adminProfile' : '/userProfile') : 
        '/login'; // Default to login if no user

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black'}}> {/* Set background color to black */}
            <Toolbar>
                <img 
                    src={mallLogo} // Path to your logo image
                    alt="Mall Logo"
                    style={{
                        width: '50px', // Set desired width
                        height: '50px', // Set desired height
                        marginRight: '16px', // Space between logo and title
                    }}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Serendib Plaza
                </Typography>
                {!auth.user? (<>
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
                    <Button color="inherit" component={Link} to="/eventcalender">
                        Events
                    </Button>
                    <Button color="inherit" component={Link} to="/contactus">
                        Contact Us
                    </Button>
                    <Button color="inherit" component={Link} to="/register">
                        Register
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                </>
                ) : auth.user.role === 0 ?(<>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    About Us
                </Button>
                <Button color="inherit" component={Link} to="/shops">
                    Shops
                </Button>
                <Button color="inherit" component={Link} to="/DisplayProductpage">
                    Products
                </Button>
                <Button color="inherit" component={Link} to="/promotions">
                    Promotions
                </Button>
                <Button color="inherit" component={Link} to="/eventcalender">
                    Events
                </Button>
                <Button color="inherit" component={Link} to="/lostFound">
                    Lost & Found
                </Button>
                <Button color="inherit" component={Link} to="/contactus">
                    Contact Us
                </Button>
                <Button color="inherit" component={Link} to="/cart">
                    Cart {cart?.length}
                </Button>
                <Button color="inherit" component={Link} to={dashboardLink}>
                    Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
                </>    
                ) : auth.user.role === 2 ? (<>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    About Us
                </Button>
                <Button color="inherit" component={Link} to="/lostFound">
                    Lost & Found
                </Button>
                <Button color="inherit" component={Link} to="/goToHome">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/goToPromotions">
                    Promotions
                </Button>
                <Button color="inherit" component={Link} to="/goToInventory">
                    Inventory
                </Button>
                <Button color="inherit" component={Link} to="/handleLogout">
                    Logout
                </Button>
                <Button color="inherit" component={Link} to="/goToAccount">
                    Account
                </Button>
                </> ):(<>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/adminProfile">
                    Admin Dashboard
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
                </>)
                }
            </Toolbar>
        </AppBar>
    );
};


export default Header1;
