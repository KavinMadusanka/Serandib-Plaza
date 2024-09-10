import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import AdminMenu from '../../components/Layout/AdminMenu';
import dayjs from 'dayjs';  // Import dayjs for date formatting

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/userauth/users'); // Adjust the endpoint as needed
        setUsers(response.data.users);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AdminMenu />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: 'center', marginBottom: 3 }}
            >
              All Registered Users
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#1976d2' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Full Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>DOB</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Contact No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: 'white', border: '1px solid #ddd', padding: '8px 16px' }}>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.fullname}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.email}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>
                        {dayjs(user.dob).format('YYYY-MM-DD')} {/* Format DOB using dayjs */}
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.phone}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.address}</TableCell>
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

export default AllUsers;
