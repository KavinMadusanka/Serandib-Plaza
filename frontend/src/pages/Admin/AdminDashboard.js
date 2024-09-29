import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import ProductIcon from '@mui/icons-material/LocalMall';
import axios from 'axios'; // Import axios
import AdminMenu from '../../components/Layout/AdminMenu';

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [shopCount, setShopCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [PromotionCount, setPromotionCount] = useState(0);

    // Fetch counts from the backend
    useEffect(() => {
<<<<<<< Updated upstream
        // Example of how to fetch the counts, replace these with your real API calls
        setUserCount(11); // Example data
        setShopCount(7); // Example data
        setProductCount(10); // Example data
        setCategoryCount(7); // Example data
    }, []);

    const StatCard = ({ title, count, IconComponent }) => (
        <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>{title}</Typography>
                <IconComponent sx={{ fontSize: 40, color: '#1976d2' }} />
                <Typography variant="h4" color="primary">{count}</Typography>
            </Paper>
        </Grid>
    );

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
         <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <AdminMenu/>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Welcome back! Here's an overview of your shopping mall’s performance.
                </Typography>
                <br/>
                <Grid container spacing={3}>
                    <StatCard title="Total Users" count={userCount} IconComponent={PeopleIcon} />
                    <StatCard title="Total Shops" count={shopCount} IconComponent={StoreIcon} />
                    <StatCard title="Total Products" count={productCount} IconComponent={ProductIcon} />
                    <StatCard title="Total Promotions" count={PromotionCount} IconComponent={CategoryIcon} />
                </Grid>
            </Box>
        </Box>
      </Box>
    );
};

export default AdminDashboard;
