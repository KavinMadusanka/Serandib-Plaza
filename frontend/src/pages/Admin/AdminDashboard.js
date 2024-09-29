import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import ProductIcon from '@mui/icons-material/LocalMall';
import { Line } from 'react-chartjs-2'; // Import Line for the user growth chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios'; // Import axios
import AdminMenu from '../../components/Layout/AdminMenu';

// Register necessary components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
    // State for counts
    const [userCount, setUserCount] = useState(0);
    const [shopCount, setShopCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [promotionCount, setPromotionCount] = useState(0);

    // State for user growth data
    const [userGrowthData, setUserGrowthData] = useState([]); // Store user growth data over time

    // Fetch counts and growth data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user count
                const userResponse = await axios.get('/api/v1/userauth/get-userCount');
                if (userResponse.data.success) {
                    setUserCount(userResponse.data.data.totalUsers);
                }

                // Fetch shop count
                const shopResponse = await axios.get('/api/v1/userauth/get-shopCount');
                if (shopResponse.data.success) {
                    setShopCount(shopResponse.data.data.totalShops);
                }

                // Fetch product count
                const productResponse = await axios.get('/api/v1/product/get-productCount');
                if (productResponse.data.success) {
                    setProductCount(productResponse.data.data.totalProducts);
                }

                // Fetch promotion count
                const promotionResponse = await axios.get('/api/v1/promotions/get-promoCount');
                if (promotionResponse.data.success) {
                    setPromotionCount(promotionResponse.data.data.totalPromotions);
                }

                // Fetch user growth over time
                const growthResponse = await axios.get('/api/v1/userauth/get-userGrowthData');
                if (growthResponse.data.success) {
                    setUserGrowthData(growthResponse.data.data); // Set user growth data
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Data for the user growth chart
    const userGrowthChartData = {
        labels: userGrowthData.map(data => data.month), // X-axis labels (e.g., months)
        datasets: [
            {
                label: 'User Growth',
                data: userGrowthData.map(data => data.userCount), // Y-axis data (user counts over time)
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
            }
        ],
    };

    // Chart options for the user growth chart
    const userGrowthOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'User Growth Over Time',
            },
        },
    };

    // Component to display individual stat cards
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
                    Hi, Welcome back! Here's an overview of your shopping mall’s performance.
                </Typography>
                <br/>
                
                {/* Display the statistics (Total Users, Shops, Products, Promotions) */}
                <Grid container spacing={3}>
                    <StatCard title="Total Users" count={userCount} IconComponent={PeopleIcon} />
                    <StatCard title="Total Shops" count={shopCount} IconComponent={StoreIcon} />
                    <StatCard title="Total Products" count={productCount} IconComponent={ProductIcon} />
                    <StatCard title="Total Promotions" count={promotionCount} IconComponent={CategoryIcon} />
                </Grid>

                {/* Display the user growth chart */}
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h6" gutterBottom>
                        User Growth Over Time
                    </Typography>
                    <Line data={userGrowthChartData} options={userGrowthOptions} /> {/* Line chart for user growth */}
                </Box>
            </Box>
        </Box>
      </Box>
    );
};

export default AdminDashboard;
