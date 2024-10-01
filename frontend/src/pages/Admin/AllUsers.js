import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Pagination,
  TableFooter,
} from '@mui/material';
import AdminMenu from '../../components/Layout/AdminMenu';
import dayjs from 'dayjs';
import Header1 from '../../components/Layout/Header1';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [monthlyUserData, setMonthlyUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/userauth/users');
        setUsers(response.data.users);
        setFilteredUsers(response.data.users); // Set filtered users
        generateMonthlyUserData(response.data.users); // Generate monthly user data
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Generate user count by month
  const generateMonthlyUserData = (users) => {
    const monthlyData = {};

    users.forEach((user) => {
      const monthYear = dayjs(user.createdAt).format('YYYY-MM'); // Assuming createdAt is a field in user object
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += 1; // Increment user count for the month
    });

    setMonthlyUserData(Object.entries(monthlyData)); // Convert to an array for easier mapping
  };

  // Handle filter input change
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    if (value) {
      const filteredData = users.filter((user) =>
        user.fullname.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filteredData);
      generateMonthlyUserData(filteredData); // Generate monthly data for filtered users
    } else {
      setFilteredUsers(users);
      generateMonthlyUserData(users); // Reset monthly data
    }
  };

  // Pagination logic
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedUsers = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header1 />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AdminMenu />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            <Typography variant="h5" component="h1" sx={{ textAlign: 'center', marginBottom: 1 }}>
              User Analysis
            </Typography>

            {/* Monthly User Count Section */}
            <Box sx={{ marginTop: 1 }}>
              <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                User Count by Month
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Month</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>User Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthlyUserData.map(([monthYear, userCount]) => (
                      <TableRow key={monthYear}>
                        <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>
                          {monthYear}
                        </TableCell>
                        <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>
                          {userCount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2} sx={{ textAlign: 'center', padding: '8px' }}>
                        Total Monthly Users: {monthlyUserData.reduce((total, [_, count]) => total + count, 0)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>

            <br /><br/>
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
                  {paginatedUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.fullname}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.email}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>
                        {dayjs(user.dob).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.phone}</TableCell>
                      <TableCell sx={{ border: '1px solid #ddd', padding: '8px 16px' }}>{user.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Pagination
                count={Math.ceil(filteredUsers.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AllUsers;
