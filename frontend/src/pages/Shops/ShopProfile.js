import React from 'react';
import { useAuth } from '../../context/auth';
import ShopMenu from '../../components/Layout/ShopMenu';
import ShopHeader from '../../components/Layout/ShopHeader';
import { Paper, Typography, Box, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const ShopProfile = () => {
    const [auth] = useAuth();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ShopHeader />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <ShopMenu />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        Welcome back, {auth?.shopOwner?.shopname}
                    </Typography>

                    {/* Shop Details Section */}
                    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                        {/* <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Shop Details
                        </Typography> */}
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Email:</strong> {auth?.shopOwner?.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Contact Number:</strong> {auth?.shopOwner?.shopcontact}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BusinessIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Business Type:</strong> {auth?.shopOwner?.businesstype}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CategoryIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Category:</strong> {auth?.shopOwner?.category}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DescriptionIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Description:</strong> {auth?.shopOwner?.description}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Operating Hours:</strong> {auth?.shopOwner?.operating_hrs_from} - {auth?.shopOwner?.operating_hrs_to}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Location:</strong> {auth?.shopOwner?.shoplocation}</Typography>
                            </Box>
                        </Stack>
                    </Paper>

                    {/* Owner Details Section */}
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Shop Owner Details
                        </Typography>
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Full Name:</strong> {auth?.shopOwner?.fullname}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ContactMailIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Email:</strong> {auth?.shopOwner?.owner_email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Contact Number:</strong> {auth?.shopOwner?.owner_contact}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BadgeIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>NIC:</strong> {auth?.shopOwner?.nic}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountBalanceIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Business Registration Number:</strong> {auth?.shopOwner?.businessregno}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountBalanceIcon sx={{ marginRight: 1, color: 'secondary.main' }} />
                                <Typography variant="body1"><strong>Tax ID Number:</strong> {auth?.shopOwner?.tax_id_no}</Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default ShopProfile;
