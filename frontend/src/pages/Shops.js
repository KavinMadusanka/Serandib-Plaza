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
  Search, // Import Search icon
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
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  useEffect(() => {
    // Fetch all shops from the backend
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

  // Filter shops based on the search query and selected category
  const filteredShops = shops.filter(
    (shop) =>
      shop.shopname.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || shop.category.toLowerCase() === selectedCategory)
  );

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
            {/* Search Bar with Search Icon */}
            <TextField
              fullWidth
              label="Search your preferred Shops..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: '20px' }}
            />

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                  gap: '20px',
                }}
              >
                {filteredShops.length > 0 ? (
                  filteredShops.map((shop) => (
                    <Card
                      key={shop._id}
                      sx={{
                        width: '350px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <CardContent>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls={`panel-content-${shop._id}`}
                            id={`panel-header-${shop._id}`}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                              {/* Category Icon */}
                              {getCategoryIcon(shop.category)}
                              <Box>
                                <Typography variant="h6" component="h3">
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
            )}
          </Grid>
        </Grid>
      </Box>
      <br />
    </Layout>
  );
};

export default Shops;
