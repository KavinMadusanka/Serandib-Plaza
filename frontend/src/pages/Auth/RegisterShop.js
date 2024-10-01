import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Layout from './../../components/Layout/Layout';
import {
  Paper,
  Link,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const RegisterShop = () => {
  const [fullname, setFullName] = useState('');
  const [owner_email, setOwnerEmail] = useState('');
  const [owner_contact, setOwnerContact] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNIC] = useState('');
  const [businessregno, setBusinessRegNo] = useState('');
  const [tax_id_no, setTaxID] = useState('');
  const [shopname, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [businesstype, setBusinessType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [operating_hrs_from, setOpen] = useState('');
  const [operating_hrs_to, setClose] = useState('');
  const [shoplocation, setShopLocation] = useState('');
  const [shopcontact, setShopContact] = useState('');
  const [logo, setLogo] = useState(null); // File state for the logo

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Handle file input change (logo)
  const handleFileChange = (e) => {
    setLogo(e.target.files[0]); // Store the selected file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData to send the image file and other form data
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('owner_email', owner_email);
    formData.append('owner_contact', owner_contact);
    formData.append('password', password);
    formData.append('nic', nic);
    formData.append('businessregno', businessregno);
    formData.append('tax_id_no', tax_id_no);
    formData.append('shopname', shopname);
    formData.append('email', email);
    formData.append('businesstype', businesstype);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('operating_hrs_from', operating_hrs_from);
    formData.append('operating_hrs_to', operating_hrs_to);
    formData.append('shoplocation', shoplocation);
    formData.append('shopcontact', shopcontact);
    formData.append('logo', logo); // Append the logo file

    try {
      const res = await axios.post('/api/v1/userauth/shopregister', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success('Shop registered successfully!');
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <Layout>
    <Container maxWidth="md">
    <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 3 }}>
        Shop Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Left Column - Shop Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Shop Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
              <FormControl fullWidth required>
                <InputLabel>Business Type</InputLabel>
                <Select
                  label="Business Type"
                  value={businesstype}
                  onChange={(e) => setBusinessType(e.target.value)}
                >
                  <MenuItem value="Retail">Retail</MenuItem>
                  <MenuItem value="Restaurant">Restaurant</MenuItem>
                  <MenuItem value="Services">Services</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Business Category</InputLabel>
                <Select
                  label="Business Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="Clothing">Clothing</MenuItem>
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Food & Beverage">Food & Beverage</MenuItem>
                  <MenuItem value="Health & Beauty">Health & Beauty</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                  <MenuItem value="Other">Sports</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                multiline
                minRows={3}
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
              <FormControl fullWidth required>
                <InputLabel>Shop Location</InputLabel>
                <Select
                  label="Shop Location"
                  value={shoplocation}
                  onChange={(e) => setShopLocation(e.target.value)}
                >
                  <MenuItem value="1st Floor">1st Floor</MenuItem>
                  <MenuItem value="2nd Floor">2nd Floor</MenuItem>
                  <MenuItem value="3rd Floor">3rd Floor</MenuItem>
                  <MenuItem value="4th Floor">4th Floor</MenuItem>
                  <MenuItem value="5th Floor">5th Floor</MenuItem>
                  <MenuItem value="6th Floor">6th Floor</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Shop Contact Number"
                value={shopcontact}
                onChange={(e) => setShopContact(e.target.value)}
                required
                fullWidth
              />
            </Box>
          </Grid>

          {/* Right Column - Owner Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Shop Owner Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Full Name"
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
                label="Owner Contact Number"
                value={owner_contact}
                onChange={(e) => setOwnerContact(e.target.value)}
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
                label="Business Registration Number"
                value={businessregno}
                onChange={(e) => setBusinessRegNo(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Tax ID Number"
                value={tax_id_no}
                onChange={(e) => setTaxID(e.target.value)}
                required
                fullWidth
              />

              {/* File Input for Logo */}
              <Typography variant="body1" gutterBottom>
                Upload Shop Logo
              </Typography>
              <input type="file" onChange={handleFileChange} accept="image/*" required />
            </Box>
          </Grid>
        </Grid>

        {/* Submit Button */}
        

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  
                  // disabled={!isValid}  // Disable submit button until the password is valid
                  sx={{ marginTop: 2,width: '100%', maxWidth: '700px' }}
              >
                Register
              </Button>
              </Box>
           <br/>
                <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
                    <Typography>If you Already have an Account, Please
                        <Link component="button" variant="body2" onClick={handleLoginClick} sx={{ cursor: 'pointer', color: 'blue', marginLeft: 1 }}>
                        Login
                        </Link>
                    </Typography>
                </Box>
          </form>
        
        <br/><br/>
        </Paper>
        </Container>
     
      
      <Toaster />
      
    </Layout>
  );
};

export default RegisterShop;
