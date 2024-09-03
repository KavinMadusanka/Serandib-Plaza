import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
//import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../context/auth';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    // Form submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("api/v1/userauth/userLogin", { email, password });
            if (res && res.data.success) {
                const { token, role, user, shop } = res.data;

                // Update auth context with user or shop details
                setAuth({
                    ...auth,
                    token,
                    user: role === "user" ? user : null,
                    shopOwner: role === "shopOwner" ? shop : null,
                });

                // Store the token and user/shop details in localStorage
                localStorage.setItem("auth", JSON.stringify({
                    token,
                    user: role === "user" ? user : null,
                    shopOwner: role === "shopOwner" ? shop : null,
                }));

                // Redirect based on user role
                if (role === "user") {
                    navigate('/userProfile'); // Adjust this route to match your route configuration
                } else if (role === "shopOwner") {
                    navigate('/shopProfile'); // Adjust this route to match your route configuration
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
                </Paper>
            </Box>
        </Container>
        <Toaster/>
        </Layout>
    );
};

export default Login;
