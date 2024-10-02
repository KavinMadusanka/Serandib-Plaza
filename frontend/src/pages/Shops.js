import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Chip,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  AccessTime,
  ExpandMore,
  Checkroom,
  Devices,
  Fastfood,
  Spa,
  SportsSoccer,
  Diamond,
  Storefront,
  Category,
  Search,
  FilterList, // New filter icon for more advanced filtering
} from '@mui/icons-material';
import axios from 'axios';
import Layout from './../components/Layout/Layout';

// Function to get the appropriate icon based on category
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'electronics':
      return <Devices sx={{ marginRight: '10px', fontSize: '2rem' }} />;
    case 'clothing':
      return <Checkroom sx={{ marginRight: '10px', fontSize: '2rem' }} />;
    case 'food & beverage':
      return <Fastfood sx={{ marginRight: '10px', fontSize: '2rem' }} />;
    case 'health & beauty':
      return <Spa sx={{ marginRight: '10px', fontSize: '2rem' }} />;
    case 'entertainment':
      return <SportsSoccer sx={{ marginRight: '10px', fontSize: '2rem' }} />;
    case 'sports':
      return <Diamond sx={{ marginRight: '10px', fontSize: '2rem' }} />;
    default:
      return <Storefront sx={{ marginRight: '10px', fontSize: '2rem' }} />;
  }
};

const categories = [
  { label: 'All', value: '' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Food & Beverage', value: 'food & beverage' },
  { label: 'Health & Beauty', value: 'health & beauty' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Sports', value: 'sports' },
  { label: 'Other', value: 'other' },
];

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [shopsPerPage] = useState(6); // Define how many shops to display per page

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`/api/v1/userauth/shops`);
        setShops(response.data.shops);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops', error);
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const filteredShops = shops.filter(
    (shop) =>
      shop.shopname.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || shop.category.toLowerCase() === selectedCategory)
  );

  // Pagination logic
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstShop, indexOfLastShop);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Layout>
      <Box sx={{ padding: '20px', maxWidth: '1400px', margin: 'auto' }}>
        <Typography variant="h4" component="h2" sx={{ textAlign: 'center', marginBottom: '10px' }}>
          Shops
        </Typography>

        <Grid container spacing={2}>
          {/* Left Side: Filters */}
          <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Category Filter */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Filter by Category
              </Typography>
              {categories.map((category) => (
                <Chip
                  key={category.value}
                  label={category.label}
                  onClick={() => setSelectedCategory(category.value)}
                  color={selectedCategory === category.value ? 'primary' : 'default'}
                  sx={{ cursor: 'pointer', fontSize: '1rem', padding: '10px' }}
                />
              ))}
            </Box>

          
          </Grid>

          {/* Right Side: Shops and Search */}
          <Grid item xs={12} md={10}>
            {/* Search Bar */}
<TextField
    fullWidth
    label="Search for Shops..."
    variant="outlined"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    InputProps={{
        startAdornment: (
            <InputAdornment position="start">
                <Search />
            </InputAdornment>
        ),
        style: {
            padding: '10px', // Padding for touch-friendly use
            borderRadius: '8px', // Rounded corners for smooth look
            height:'40px'
        },
    }}
    sx={{
        maxWidth: '600px', // Set a maximum width for the search input
        margin: '0 auto', // Center the search input
        display: 'block', // Ensure it takes the full width
        fontFamily: 'Poppins, sans-serif', // Consistent font with the app
    }}
/>
<br/>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    gap: '20px',
                  }}
                >
                  {currentShops.length > 0 ? (
                    currentShops.map((shop) => (
                      <Card
                        key={shop._id}
                        sx={{
                          width: '350px',
                          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                          borderRadius: '15px',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                          },
                        }}
                      >
                        <CardContent sx={{ padding: '20px' }}>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls={`panel-content-${shop._id}`}
                              id={`panel-header-${shop._id}`}
                              sx={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Avatar
                                  alt={shop.shopname}
                                  src={`/api/v1/userauth/logo/${shop._id}`}
                                  sx={{
                                    width: 100,
                                    height: 100,
                                    marginRight: '20px',
                                    border: '2px solid #ddd',
                                  }}
                                />
                                <Box>
                                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                    {shop.shopname}
                                  </Typography>
                                  <Typography color="textSecondary">
                                    {shop.category}
                                  </Typography>
                                </Box>
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                              >
                                <LocationOn sx={{ marginRight: '5px' }} />
                                Location: {shop.shoplocation}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                              >
                                <Phone sx={{ marginRight: '5px' }} />
                                Contact: {shop.shopcontact}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                              >
                                <AccessTime sx={{ marginRight: '5px' }} />
                                Operating Hours: {shop.operating_hrs_from} - {shop.operating_hrs_to}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {shop.description}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      No shops found.
                    </Typography>
                  )}
                </Box>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Pagination
                    count={Math.ceil(filteredShops.length / shopsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Shops;
