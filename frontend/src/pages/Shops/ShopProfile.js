import React from 'react';
//import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../context/auth';
//import { Box } from '@mui/material';
import ShopMenu from '../../components/Layout/ShopMenu';
import ShopHeader from '../../components/Layout/ShopHeader';
import { Grid, Paper, Typography, Box } from '@mui/material';


const ShopProfile = () => {
    const [auth] = useAuth();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ShopHeader />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <ShopMenu />
        <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Welcome back {auth?.shopOwner?.shopname}
                        </Typography>
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={3}>
                {/* Owner Details Section */}
                
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                    
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Owner Details
                        </Typography>
                        <Typography variant="body1">
                            <strong>Owner Name:</strong> {auth?.shopOwner?.fullname}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Owner Email:</strong> {auth?.shopOwner?.owner_email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Owner Contact Number:</strong> {auth?.shopOwner?.owner_contact}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Owner NIC:</strong> {auth?.shopOwner?.nic}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Business Registration Number:</strong> {auth?.shopOwner?.businessregno}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Tax ID Number:</strong> {auth?.shopOwner?.tax_id_no}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Shop Details Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            Shop Details
                        </Typography>
                        <Typography variant="body1">
                            <strong>Email:</strong> {auth?.shopOwner?.email}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Contact Number:</strong> {auth?.shopOwner?.shopcontact}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Business Type:</strong> {auth?.shopOwner?.businesstype}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Category:</strong> {auth?.shopOwner?.category}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Description:</strong> {auth?.shopOwner?.description}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Operating Hours:</strong> {auth?.shopOwner?.operating_hrs_from} - {auth?.shopOwner?.operating_hrs_to}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Location:</strong> {auth?.shopOwner?.shoplocation}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>




            
            </Box>
        </Box>
        </Box> 
    );
};

export default ShopProfile;
