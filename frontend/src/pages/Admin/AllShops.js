import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import AdminMenu from '../../components/Layout/AdminMenu';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [categories, setCategories] = useState([]); // State to store unique categories

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('/api/v1/userauth/shops');
        setShops(response.data.shops);

        // Extract unique categories from the shops data
        const uniqueCategories = [...new Set(response.data.shops.map(shop => shop.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Error fetching shops');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredShops = selectedCategory
    ? shops.filter((shop) => shop.category === selectedCategory)
    : shops;

    const generatePDF = () => {
      const doc = new jsPDF();
    
      // Set report title with larger font and centered alignment
      doc.setFontSize(18);
      doc.text('Detailed Registered Shops Report', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    
      // Add some additional information below the heading (optional)
      doc.setFontSize(10);
      const reportDate = new Date().toLocaleDateString();
      doc.text(`Report generated on: ${reportDate}`, 20, 30);
    
      // Define the columns for the PDF table
      const tableColumn = ['Shop Name', 'Owner Full Name', 'NIC', 'Email', 'Business Type', 'Category', 'Operating Hours', 'Location', 'Contact'];
    
      // Define rows
      const tableRows = filteredShops.map(shop => [
        shop.shopname,
        shop.fullname,
        shop.nic,
        shop.email,
        shop.businesstype,
        shop.category,
        `${shop.operating_hrs_from} - ${shop.operating_hrs_to}`,
        shop.shoplocation,
        shop.shopcontact
      ]);
    
      // Add table to PDF
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40, // Adjust start position to leave space for the heading
      });
    
      // Save the generated PDF
      doc.save('Registered_Shops_Report.pdf');
    };
    

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AdminMenu />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            <Typography variant="h5" component="h1" sx={{ textAlign: 'center', marginBottom: 3 }}>
              All Registered Shops
            </Typography>

            {/* Filter and Report Generation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              {/* Filter by Category */}
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="category-select-label">Filter by Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={selectedCategory}
                  label="Filter by Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Button to generate PDF */}
              <Button variant="contained" color="primary" onClick={generatePDF}>
                Download PDF Report
              </Button>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1976d2' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Shop Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Owner Full Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Owner NIC</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Business Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Operating Hours</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Contact</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredShops.map((shop) => (
                    <TableRow key={shop._id}>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.shopname}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.fullname}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.nic}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.email}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.businesstype}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.category}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.operating_hrs_from} - {shop.operating_hrs_to}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.shoplocation}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd' }}>{shop.shopcontact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AllShops;
