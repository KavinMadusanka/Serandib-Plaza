import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

const ShopProfile = () => {
    const [auth] = useAuth();
    const [logo, setLogo] = useState(null);  // State for storing the logo URL
    const [error, setError] = useState(null);  // State for storing any errors
    const [loading, setLoading] = useState(true);  // Loading state
    const shopId = auth?.shopOwner?._id;  // Get the shop ID from auth context

    // Fetch the shop logo on component mount
    useEffect(() => {
        const fetchLogo = async () => {
            if (!shopId) {
                setError('Shop ID is not available');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`/api/v1/userauth/logo/${shopId}`, { responseType: 'blob' });
                const logoUrl = URL.createObjectURL(new Blob([response.data]));  // Create a URL for the blob data
                setLogo(logoUrl);  // Set the logo URL in the state
            } catch (err) {
                setError('Error fetching logo');
                console.error('Error fetching logo:', err);
            } finally {
                setLoading(false);  // Set loading to false when done
            }
        };

        fetchLogo();
    }, [shopId]);  // Depend on shopId to trigger the fetch when it becomes available

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ShopHeader />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <ShopMenu />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        Welcome back, {auth?.shopOwner?.shopname}
                    </Typography>

                    {/* Logo Section */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: '20px' }}>
                        {loading ? (
                            <Typography variant="h6">Loading logo...</Typography>
                        ) : error ? (
                            <Typography color="error">{error}</Typography>
                        ) : logo ? (
                            <img
                                src={logo}
                                alt="Shop Logo"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    marginBottom: '20px',
                                }}
                            />
                        ) : (
                            <Typography>No logo available</Typography>
                        )}
                    </div>

                    {/* Shop Details Section */}
                    <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
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
