import React from 'react';
import { useAuth } from '../../context/auth';
import Layout from '../../components/Layout/Layout';
import { Container, Typography, Paper, Box } from '@mui/material';
import UserMenu from '../../components/Layout/UserMenu';

const ProfileUser = () => {
    const [auth] = useAuth();
    const user = auth?.user || {};

    return (
        <Layout title="User Profile">
            <UserMenu />
            
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Welcome back {user.fullname}
                        </Typography>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        User Profile
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h6" component="p">
                            <strong>Full Name:</strong> {auth?.user?.fullname || 'N/A'}
                        </Typography>
                        <Typography variant="h6" component="p">
                            <strong>Email:</strong> {auth?.user?.email || 'N/A'}
                        </Typography>
                        <Typography variant="h6" component="p">
                            <strong>Date of Birth:</strong> {auth?.user?.dob || 'N/A'}
                        </Typography>
                        <Typography variant="h6" component="p">
                            <strong>Phone:</strong> {auth?.user?.phone || 'N/A'}
                        </Typography>
                        <Typography variant="h6" component="p">
                            <strong>Address:</strong> {auth?.user?.address || 'N/A'}
                        </Typography>
                        <Typography variant="h6" component="p">
                            <strong>Shopping Preferences:</strong> {auth?.user?.shoppingPreference?.length ? user.shoppingPreference.join(", ") : 'None'}
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Layout>
    );
};

export default ProfileUser;
