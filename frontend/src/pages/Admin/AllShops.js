import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import AdminMenu from '../../components/Layout/AdminMenu';

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('/api/v1/userauth/shops');
        setShops(response.data.shops);
      } catch (err) {
        setError('Error fetching shops');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
     
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <AdminMenu/> 
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: 'center', marginBottom: 3 }}
            >
              All Shops
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#ADD8E6' }}>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Shop Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Owner Full Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Owner NIC</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Business Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Operating Hours</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' ,border: '1px solid #ddd'}}>Contact</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shops.map((shop) => (
                    <TableRow key={shop._id}>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.shopname}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.fullname}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.nic}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.email}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.businesstype}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.category}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.description}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.operating_hrs_from} - {shop.operating_hrs_to}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.shoplocation}</TableCell>
                      <TableCell sx={{border: '1px solid #ddd'}}>{shop.shopcontact}</TableCell>
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
