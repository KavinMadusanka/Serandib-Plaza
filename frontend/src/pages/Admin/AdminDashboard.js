import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import ProductIcon from '@mui/icons-material/LocalMall';
import { Line, Pie } from 'react-chartjs-2'; // Import Pie for the pie chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for pie charts
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
  Legend,
  ArcElement // Register ArcElement for pie charts
);

const AdminDashboard = () => {
    // State for counts
    const [userCount, setUserCount] = useState(0);
    const [shopCount, setShopCount] = useState(0);
    const [productCount, setProductCount] = useState(0);
    const [promotionCount, setPromotionCount] = useState(0);

    // State for growth data
    const [userGrowthData, setUserGrowthData] = useState([]); // Store user growth data over time
    const [shopGrowthData, setShopGrowthData] = useState([]); // Store shop growth data over time
    const [shopCountByCategory, setShopCountByCategory] = useState([]); // Store shop count by category

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
                const userGrowthResponse = await axios.get('/api/v1/userauth/get-userGrowthData');
                if (userGrowthResponse.data.success) {
                    setUserGrowthData(userGrowthResponse.data.data); // Set user growth data
                }

                // Fetch shop growth over time
                const shopGrowthResponse = await axios.get('/api/v1/userauth/get-shopGrowthData');
                if (shopGrowthResponse.data.success) {
                    setShopGrowthData(shopGrowthResponse.data.data); // Set shop growth data
                }

                // Fetch shop count by category
                const categoryResponse = await axios.get('/api/v1/userauth/get-shopCountByCategory');
                if (categoryResponse.data.success) {
                    setShopCountByCategory(categoryResponse.data.data); // Set shop count by category
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
        scales: {
            y: {
                ticks: {
                    callback: (value) => {
                        return Number.isInteger(value) ? value : ''; // Display whole numbers only
                    },
                },
                beginAtZero: true, // Ensure the Y-axis starts at zero
            },
        },
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

    // Data for the shop growth chart
    const shopGrowthChartData = {
        labels: shopGrowthData.map(data => data.month), // X-axis labels (e.g., months)
        datasets: [
            {
                label: 'Shop Growth',
                data: shopGrowthData.map(data => data.shopCount), // Y-axis data (shop counts over time)
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                fill: true,
            }
        ],
    };

    // Chart options for the shop growth chart
    const shopGrowthOptions = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    callback: (value) => {
                        return Number.isInteger(value) ? value : ''; // Display whole numbers only
                    },
                },
                beginAtZero: true, // Ensure the Y-axis starts at zero
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Shop Growth Over Time',
            },
        },
    };

    // Prepare data for the pie chart
    const pieChartData = {
        labels: shopCountByCategory.map(item => item._id), // Category names
        datasets: [
            {
                label: 'Shop Count',
                data: shopCountByCategory.map(item => item.count), // Count of shops in each category
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(0, 128, 0, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(0, 128, 0, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
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

                {/* Display the user and shop growth charts side by side */}
                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            User Growth Over Time
                        </Typography>
                        <Line data={userGrowthChartData} options={userGrowthOptions} /> {/* Line chart for user growth */}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Shop Growth Over Time
                        </Typography>
                        <Line data={shopGrowthChartData} options={shopGrowthOptions} /> {/* Line chart for shop growth */}
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={5} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Shop Count by  Shop Category
                        </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Pie data={pieChartData} /> {/* Pie chart for shop count by category */}
                    </Box>
                </Grid>
                </Grid>
            </Box>
        </Box>
      </Box>
    );
};

export default AdminDashboard;
