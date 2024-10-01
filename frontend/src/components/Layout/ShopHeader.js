import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import mallLogo from '../../assets/logo_white.png'; // Adjust the path to your logo image


const ShopHeader = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({
            user: null,
            admin: null,
            shopOwner: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logged out successfully");
        navigate('/login'); // Redirect to login after logout
    };

    const goToHome = () => {
        navigate('/shopProfile'); // Adjust the route as needed
    };

    const goToPromotions = () => {
        navigate('/allpromo'); // Adjust the route as needed
    };

    const goToInventory = () => {
        navigate('/products'); // Adjust the route as needed
    };

    const goToAccount = () => {
        navigate('/ShopProfile'); // Adjust the route as needed
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1c1c1c', padding: 1 }}>
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
                    <Button
                        color="inherit"
                        onClick={goToHome}
                        sx={{ mx: 1 }}
                    >
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        onClick={goToPromotions}
                        sx={{ mx: 1 }}
                    >
                        Promotions
                    </Button>
                    <Button
                        color="inherit"
                        onClick={goToInventory}
                        sx={{ mx: 1 }}
                    >
                        Inventory
                    </Button>
                    <Button
                        color="inherit"
                        onClick={handleLogout}
                        sx={{ mx: 1, fontWeight: 'bold' }}
                    >
                        Logout
                    </Button>
                    <Button
                        color="inherit"
                        onClick={goToAccount}
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
