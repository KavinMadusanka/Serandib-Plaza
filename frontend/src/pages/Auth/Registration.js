import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Registration = () => {
    return (
        <Layout>
            <Container maxWidth="sm" sx={{ marginTop: 8 }}>
                <Box 
                    sx={{ 
                        textAlign: 'center', 
                        marginBottom: 4 
                    }}>
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        gutterBottom 
                        sx={{ 
                            fontWeight: 'bold', 
                            color: 'black' 
                        }}>
                        Registration
                    </Typography>
                    <Typography 
                        variant="h6" 
                        component="h2" 
                        gutterBottom 
                        sx={{ 
                            color: 'black' 
                        }}>
                        Choose the type of registration
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        gap: 4
                    }}
                >
                    <Box 
                        sx={{ 
                            flex: '1 1 45%', 
                            transition: 'transform 0.3s', 
                            '&:hover': { 
                                transform: 'scale(1.05)' 
                            } 
                        }}>
                        <Paper 
                            elevation={4} 
                            sx={{ 
                                padding: 4, 
                                textAlign: 'center',
                                backgroundColor: 'white',
                                color: 'black'
                            }}
                        >
                            <ShoppingCartIcon 
                                sx={{ 
                                    fontSize: 50, 
                                    color: 'black', 
                                    marginBottom: 2 
                                }} 
                            />
                            <Typography 
                                variant="h5" 
                                component="h2" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    marginBottom: 2
                                }}>
                                Customer Registration
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    marginBottom: 2 
                                }}>
                                Register as a customer to start shopping and enjoy exclusive offers.
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component={Link} 
                                to="/registerUser"
                                sx={{
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                        backgroundColor: 'primary.main'
                                    }
                                }}>
                                Register as Customer
                            </Button>
                        </Paper>
                    </Box>
                    <Box 
                        sx={{ 
                            flex: '1 1 45%', 
                            transition: 'transform 0.3s', 
                            '&:hover': { 
                                transform: 'scale(1.05)' 
                            } 
                        }}>
                        <Paper 
                            elevation={4} 
                            sx={{ 
                                padding: 4, 
                                textAlign: 'center',
                                backgroundColor: 'white',
                                color: 'black'
                            }}
                        >
                            <StorefrontIcon 
                                sx={{ 
                                    fontSize: 50, 
                                    color: 'black', 
                                    marginBottom: 2 
                                }} 
                            />
                            <Typography 
                                variant="h5" 
                                component="h2" 
                                sx={{ 
                                    fontWeight: 'bold',
                                    marginBottom: 2
                                }}>
                                Shop <br/>Registration
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    marginBottom: 2 
                                }}>
                                Register your shop to join our platform and reach new customers.
                            </Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                component={Link} 
                                to="/registerShop"
                                sx={{
                                    backgroundColor: 'primary.dark',
                                    '&:hover': {
                                        backgroundColor: 'primary.main'
                                    }
                                }}>
                                Register Your<br/> Shop
                            </Button>
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default Registration;
