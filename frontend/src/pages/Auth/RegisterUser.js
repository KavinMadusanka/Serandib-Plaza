import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Container, Box, Typography, Link, TextField, Button, Paper, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

// Utility function to handle checkbox preferences
const handleCheckboxChange = (event, currentPreferences, setPreferences) => {
  const { value, checked } = event.target;
  if (checked) {
    setPreferences([...currentPreferences, value]);
  } else {
    setPreferences(currentPreferences.filter((item) => item !== value));
  }
};

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    dob: '',
    phone: '',
    address: '',
    password: '',
    shoppingPreference: [],
  });
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle password validation
  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
    if (regex.test(value)) {
      setError('');
      setIsValid(true);
    } else {
      setError(
        'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.'
      );
      setIsValid(false);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('api/v1/userauth/userRegister', formData);
      if (res && res.data.success) {
        toast.success('Registered successfully, please log in');
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  // Handle password input separately for validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    handleInputChange(e);
    validatePassword(value);
  };

  return (
    <Layout title="User Registration">
      <Container maxWidth="sm">
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
              Customer Registration
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
                  label="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 50,
                    pattern: "^[A-Za-z\s'. ]+$",
                  }}
                />

                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />

                <TextField
                  label="Date Of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  label="Contact Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  inputProps={{
                    maxLength: 10,
                    pattern: '^[0-9]+$',
                  }}
                />

                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  fullWidth
                />

                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  required
                  fullWidth
                  error={!!error}
                  helperText={error}
                />

                {/* Shopping Preferences */}
                <FormControl component="fieldset">
                  <FormLabel component="legend">Shopping Preferences</FormLabel>
                  <FormGroup>
                    {['Clothing & Fashion', 'Health & Beauty', 'Food', 'Sports & Fitness','Furniture','Electronics'].map((item) => (
                      <FormControlLabel
                        key={item}
                        control={
                          <Checkbox
                            value={item}
                            onChange={(e) =>
                              handleCheckboxChange(e, formData.shoppingPreference, (newPrefs) =>
                                setFormData({ ...formData, shoppingPreference: newPrefs })
                              )
                            }
                          />
                        }
                        label={item}
                      />
                    ))}
                  </FormGroup>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  sx={{ marginTop: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </form>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 2,
              }}
            >
              <Typography>
                If you already have an account, please{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/login')}
                  sx={{ cursor: 'pointer', color: 'blue', marginLeft: 1 }}
                >
                  login
                </Link>
              </Typography>
            </Box>
          </Paper>
          <br/><br/>
        </Box>
        <Toaster />
      </Container>
    </Layout>
  );
};

export default RegisterUser;