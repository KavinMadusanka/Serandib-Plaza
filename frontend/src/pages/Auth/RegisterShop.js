import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';

const RegisterShop = () => {
  const [fullname, setFullName] = useState('');
  const [owner_email, setOwnerEmail] = useState('');
  const [owner_contact, setOwnerContact] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNIC] = useState('');
  const [businessregno, setBusinessRegNo] = useState('');
  const [tax_id_no, setTax_ID_No] = useState('');
  const [shopname, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [businesstype, setBusinessType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [operating_hrs_from, setOpen] = useState('');
  const [operating_hrs_to, setClose] = useState('');
  const [shoplocation, setShopLocation] = useState('');
  const [shopcontact, setContact] = useState('');
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('api/v1/userauth/shopregister', {
        fullname,
        owner_email,
        owner_contact,
        password,
        nic,
        businessregno,
        tax_id_no,
        shopname,
        email,
        businesstype,
        category,
        description,
        operating_hrs_from,
        operating_hrs_to,
        shoplocation,
        shopcontact,
      });
      if (res && res.data.success) {
        toast.success('Registered successfully, Please Login');
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Shop Registration">
      <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8,
                }}
            >
                <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginBottom: 3,
                        }}
                    >
                        Shop Registration
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <TextField
                                label="Shop Owner Full Name"
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Owner Email"
                                type="email"
                                value={owner_email}
                                onChange={(e) => setOwnerEmail(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Shop Owner Contact Number"
                                value={owner_contact}
                                onChange={(e) => setOwnerContact(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="NIC"
                                value={nic}
                                onChange={(e) => setNIC(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Business Registration No"
                                value={businessregno}
                                onChange={(e) => setBusinessRegNo(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Tax ID No"
                                value={tax_id_no}
                                onChange={(e) => setTax_ID_No(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Shop Name"
                                value={shopname}
                                onChange={(e) => setShopName(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Business Type"
                                value={businesstype}
                                onChange={(e) => setBusinessType(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Business Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Open From"
                                type="time"
                                value={operating_hrs_from}
                                onChange={(e) => setOpen(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Close At"
                                type="time"
                                value={operating_hrs_to}
                                onChange={(e) => setClose(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Shop Location"
                                value={shoplocation}
                                onChange={(e) => setShopLocation(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Shop Contact Number"
                                value={shopcontact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Box>
            <Toaster />
        </Container>
    </Layout>
  );
};

export default RegisterShop;
