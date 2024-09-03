import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Registration= () => {
    return (
        <Layout>
        <Container maxWidth="sm" sx={{ marginTop: 8 }}>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Registration
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
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
                <Box sx={{ flex: '1 1 45%' }}>
                    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2">
                            Customer Registration
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            Register as a customer to start shopping and enjoy exclusive offers.
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/registerUser">
                            Register as Customer
                        </Button>
                    </Paper>
                </Box>
                <Box sx={{ flex: '1 1 45%' }}>
                    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center' }}>
                        <Typography variant="h5" component="h2">
                            Shop Registration
                        </Typography>
                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                            Register your shop to join our platform and reach new customers.
                        </Typography>
                        <Button variant="contained" color="primary" component={Link} to="/registerShop">
                            Register as Shop
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </Container>
    </Layout>
    );
};

export default Registration;
