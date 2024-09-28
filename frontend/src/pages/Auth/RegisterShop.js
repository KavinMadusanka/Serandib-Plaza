import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Container, Box, Link, Typography, TextField, Button, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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

  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Form submission handler
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

  const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    // Password validation function
    const validatePassword = (value) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
        if (regex.test(value)) {
            setError('');
            setIsValid(true);
        } else {
            setError('Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.');
            setIsValid(false);
        }
    };

    // Handle password input change
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };


  return (
    <Layout title="Shop Registration">
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
          <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
            <Typography variant="h4" component="h1" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 3 }}>
              Shop Registration
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                {/* Shop Name */}
                <TextField
                  label="Shop Name"
                  value={shopname}
                  onChange={(e) => {
                    const regex = /^[a-zA-Z0-9\s]*$/; // Allow letters, numbers, and spaces
                    if (regex.test(e.target.value)) {
                      setShopName(e.target.value);
                    }
                  }}
                  required
                  fullWidth
                />

                {/* Shop Email */}
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />

                {/* Business Type */}
                <FormControl fullWidth required>
                  <InputLabel>Business Type</InputLabel>
                  <Select label="Business Type" value={businesstype} onChange={(e) => setBusinessType(e.target.value)}>
                    <MenuItem value="Retail">Retail</MenuItem>
                    <MenuItem value="Restaurant">Restaurant</MenuItem>
                    <MenuItem value="Services">Services</MenuItem>
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* Business Category */}
                <FormControl fullWidth required>
                  <InputLabel>Business Category</InputLabel>
                  <Select label="Business Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <MenuItem value="Clothing">Clothing</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Food & Beverage">Food & Beverage</MenuItem>
                    <MenuItem value="Health & Beauty">Health & Beauty</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* Description */}
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  fullWidth
                />

                {/* Operating Hours */}
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

                {/* Shop Location */}
                <FormControl fullWidth required>
                  <InputLabel>Shop Location</InputLabel>
                  <Select label="Shop Location" value={shoplocation} onChange={(e) => setShopLocation(e.target.value)}>
                    <MenuItem value="1st Floor">1st Floor</MenuItem>
                    <MenuItem value="2nd Floor">2nd Floor</MenuItem>
                    <MenuItem value="3rd Floor">3rd Floor</MenuItem>
                    <MenuItem value="4th Floor">4th Floor</MenuItem>
                    <MenuItem value="5th Floor">5th Floor</MenuItem>
                    <MenuItem value="6th Floor">6th Floor</MenuItem>
                  </Select>
                </FormControl>

                {/* Shop Contact */}
                <TextField
                  label="Shop Contact Number"
                  value={shopcontact}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) { // Only numbers, max 10 digits
                      setContact(input);
                    }
                  }}
                  required
                  fullWidth
                />

                {/* Password */}
                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    fullWidth
                                    error={!!error}
                                    helperText={error}
                                />

                {/* Shop Owner Details */}
                <Typography sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>***Please provide your shop owner details below to continue your registration***</Typography>

                {/* Owner Full Name */}
                <TextField
                  label="Shop Owner Full Name"
                  value={fullname}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^[A-Za-z\s'.]{1,50}$/.test(input)) { // Only letters, spaces, apostrophes, and periods
                      setFullName(input);
                    }
                  }}
                  required
                  fullWidth
                />

                {/* Owner Email */}
                <TextField
                  label="Shop Owner Email"
                  type="email"
                  value={owner_email}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  required
                  fullWidth
                />

                {/* Owner Contact */}
                <TextField
                  label="Shop Owner Contact Number"
                  value={owner_contact}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) { // Only numbers, max 10 digits
                      setOwnerContact(input);
                    }
                  }}
                  required
                  fullWidth
                />

                {/* Owner NIC */}
                <TextField
                  label="Shop Owner NIC"
                  value={nic}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^[0-9VXvx]*$/.test(input)) { // Only numbers, V or X
                      setNIC(input);
                    }
                  }}
                  onBlur={() => {
                    const nicPattern = /^(\d{9}[VXvx]|\d{12})$/;
                    if (!nicPattern.test(nic)) {
                      alert('Invalid NIC format');
                    }
                  }}
                  required
                  fullWidth
                  helperText="Enter a valid NIC (e.g., 123456789V or 200012345678)"
                />

                {/* Business Registration & Tax ID */}
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
                  onChange={(e)=> setTax_ID_No(e.target.value)}
                  required
                  fullWidth
                />
                            
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid}  // Disable submit button until the password is valid
                  sx={{ marginTop: 2 }}
              >
                Submit
              </Button>
                </Box>
                </form>
                <br/> 
                    
                <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
                    <Typography>If you Already have an Account, Please
                        <Link component="button" variant="body2" onClick={handleLoginClick} sx={{ cursor: 'pointer', color: 'blue', marginLeft: 1 }}>
                        Login
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
        <Toaster />
    </Container>
    <br/><br/>
    </Layout>
  );
};

export default RegisterShop;
