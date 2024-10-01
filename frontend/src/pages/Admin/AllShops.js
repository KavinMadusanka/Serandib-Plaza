import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import AdminMenu from '../../components/Layout/AdminMenu';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LOGO from "./../../assets/LOGO.png";
import Header1 from '../../components/Layout/Header1';
import DownloadIcon from '@mui/icons-material/Download';

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
    
      // Add logo
      // Get the page width and height
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add a border (rect function draws a rectangle)
      const borderMargin = 7; // Margin from the edges for the border
      doc.setLineWidth(0.2); // Adjust the thickness of the border line
      doc.rect(borderMargin, borderMargin, pageWidth - 2 * borderMargin, pageHeight - 2 * borderMargin); // Draw the border
  
      doc.addImage(LOGO, 'JPEG', 15, 10, 35, 24); // Adjust the position and size of the logo
      
      // Set title
      doc.setFontSize(16);
      doc.setFont('roboto', 'bold');
      doc.text('SERENDIB PLAZA', pageWidth / 2, 15, { align: 'center' }); // Mall name centered
      doc.setFont('open sans', 'normal');
      doc.setFontSize(12);
      doc.text('Address: No.324-10, Galle Road, Colombo 06', pageWidth / 2, 22, { align: 'center' });
      doc.text('Contact: +94 112 590 575 | Email: mall@serendibplaza.com', pageWidth / 2, 29, { align: 'center' });
      
      // Add horizontal line after header
      doc.setLineWidth(0.2);
      doc.line(10, 35, pageWidth - 10, 35); // Horizontal line
    
      // Set report title with a bit more spacing
      doc.setFontSize(12);
      doc.setFont('open sans', 'bold');
      doc.text('Detailed Registered Shops Report', pageWidth / 2, 45, { align: 'center' });
    
      // Add report date below the heading
      doc.setFontSize(12);
      doc.setFont('open sans', 'normal');
      const reportDate = new Date().toLocaleDateString();
      doc.text(`Report generated on: ${reportDate}`, 15, 55);
    
      // Define the columns for the PDF table
      const tableColumn = [
        'Shop Name', 'Email', 'Business Type', 'Category', 'Open Hours', 'Location', 'Contact'
      ];
    
      // Define rows for the table
      const tableRows = filteredShops.map(shop => [
        shop.shopname,
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
        startY: 60, // Adjust to leave space for the header
        theme: 'grid', // Use grid theme for better styling
        headStyles: { fillColor: [22, 160, 133] }, // Header background color
        margin: { top: 60 },
        styles: {
          fontSize: 9, // Adjust font size
          cellPadding: 3, // Increase padding for a better look
        },
      });
    
      // Save the generated PDF
      doc.save('Registered_Shops_Report.pdf');
    };

  // if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header1/>
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
              <Button variant="contained" color="primary" onClick={generatePDF} startIcon={<DownloadIcon />}>
                PDF Report
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
