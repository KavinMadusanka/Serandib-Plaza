import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from '../../context/auth';
import { Container,Link, Box, Typography, TextField, Button, Paper } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const location = useLocation();

    const handleLoginClick = () => {
      navigate('/register'); // Redirect to the login page
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.post("/api/v1/userauth/userLogin", { email, password });
            if (res && res.data.success) {
                const { token, user, shop, role } = res.data;
    
                // Update auth context with user/shop/admin details
                setAuth({
                    ...auth,
                    token,
                    user: role === 0 || role === 1 ? user : null,    // User or Admin
                    shopOwner: role === 2 ? shop : null,             // Shop owner
                });
    
                // Store the token and user/shop/admin details in localStorage
                localStorage.setItem("auth", JSON.stringify({
                    token,
                    user: role === 0 || role === 1 ? user : null,
                    shopOwner: role === 2 ? shop : null,
                }));
    
                // Log the role to check its value
                console.log("User Role:", role);
    
                // Redirect based on user role
                if (role === 0) {
                    navigate('/userProfile');   // Redirect to User Profile
                } else if (role === 1) {
                    navigate('/adminProfile');  // Redirect to Admin Profile
                } else if (role === 2) {
                    navigate('/shopProfile');   // Redirect to Shop Profile
                }
    
                toast.success("Login successful");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong");
        }
    };    
    

    return (
        <Layout>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 8,
                    }}
                >
                    <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: 2,
                            }}
                        >
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: 2 }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                        <br/>
                        <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
                    <Typography>If you Don't have an Account, Please
                        <Link component="button" variant="body2" onClick={handleLoginClick} sx={{ cursor: 'pointer', color: 'blue', marginLeft: 1 }}>
                        Register
                        </Link>
                    </Typography>
                </Box>
                    </Paper>
                </Box>
            </Container>
            <Toaster />
        </Layout>
    );
};

export default Login;
