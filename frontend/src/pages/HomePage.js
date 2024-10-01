import React from 'react';
import { Typography, Button, Container, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import mall from './../assets/mall.webp'; // Correct import for the background image

const HomePage = () => {
    return (
        <>
            <Layout>
                <Box
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 0, // Padding for vertical spacing
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: `url(${mall})`, // Use the imported image
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '100%',
                            height: '500px', // Set a fixed height for the background section
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            mb: 4, // Margin bottom for spacing
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background for readability
                                padding: 4,
                                borderRadius: 2,
                                boxShadow: 3,
                            }}
                        >
                            <Typography 
                                variant="h2" 
                                component="h1" 
                                style={{ fontFamily: 'Poppins, sans-serif' }}  // Correct style syntax
                                gutterBottom
                            >
                                Welcome to Serendib Plaza
                            </Typography>
                            
                            <Typography variant="h5" component="h2" gutterBottom>
                                Your one-stop shop for discovering and managing the best shops in town.
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Container maxWidth="lg">
                        <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                                    <Typography variant="h6">Customer Registration</Typography>
                                    <Typography variant="body1">
                                        Sign up as a customer to enjoy personalized shopping experiences and more.
                                    </Typography>
                                    <Button variant="contained" color="primary" component={Link} to="/registerUser" sx={{ marginTop: 2 }}>
                                        Register Now
                                    </Button>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                                    <Typography variant="h6">Shop Registration</Typography>
                                    <Typography variant="body1">
                                        Register your shop to be part of our community and reach thousands of customers.
                                    </Typography>
                                    <Button variant="contained" color="primary" component={Link} to="/registerShop" sx={{ marginTop: 2 }}>
                                        Register Now
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                                    <Typography variant="h6">Find Shops</Typography>
                                    <Typography variant="body1">
                                        Explore a wide variety of shops and discover the best places to shop.
                                    </Typography>
                                    <Button variant="contained" color="primary" component={Link} to="/shops" sx={{ marginTop: 2 }}>
                                        Explore Shops
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                                    <Typography variant="h6">Login</Typography>
                                    <Typography variant="body1">
                                        Access your account to manage your shop, view analytics, and more.
                                    </Typography>
                                    <Button variant="contained" color="primary" component={Link} to="/login" sx={{ marginTop: 2 }}>
                                        Login
                                    </Button>
                                </Paper>
                            </Grid>
                            
                        </Grid>
                    </Container>
                </Box>
                <br/><br/>
            </Layout>
        </>
    );
};

export default HomePage;
