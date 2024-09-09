import React from 'react';
import { useAuth } from '../../context/auth';
import { Container, Typography, Paper, Box, Avatar, Stack } from '@mui/material';
import UserMenu from '../../components/Layout/UserMenu';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Header1 from '../../components/Layout/Header1';

const ProfileUser = () => {
    const [auth] = useAuth();
    const user = auth?.user || {};

    return (
        <Box>
            <Header1 />
            <Box sx={{ display: 'flex', backgroundColor: 'white', padding: 4, minHeight: '100vh' }}>
                <UserMenu />
                <Container maxWidth="md" sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {user.fullname ? user.fullname : 'No Name'}
                        </Typography>
                        <Avatar sx={{ bgcolor: 'secondary.main', width: 100, height: 100 }}>
                            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                {user.fullname && user.fullname.charAt(0)}
                            </Typography>
                        </Avatar>
                    </Box>

                    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Email:</strong> {user.email || 'N/A'}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CakeIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1">
                                    <strong>Date of Birth:</strong> {user.dob ? new Date(user.dob).toISOString().split('T')[0] : 'N/A'}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Phone:</strong> {user.phone || 'N/A'}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <HomeIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Address:</strong> {user.address || 'N/A'}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ShoppingBasketIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Shopping Preferences:</strong> {user.shoppingPreference?.length ? user.shoppingPreference.join(", ") : 'None'}</Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default ProfileUser;
