import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { Container, Box, Typography, Link,TextField, Button, Paper, FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const RegisterUser = () => {
    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDOB] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [shoppingPreference, setShoppingPreference] = useState([]);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');  // Redirect to the login page
    };

    // Handle checkbox changes
    const handlePreferenceChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setShoppingPreference([...shoppingPreference, value]);
        } else {
            setShoppingPreference(shoppingPreference.filter((item) => item !== value));
        }
    };

    // Form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("api/v1/userauth/userRegister", { fullname, email, dob, phone, address, shoppingPreference, password });
            if (res && res.data.success) {
                toast.success("Registered successfully, please log in");
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
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
                            User Registration
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

                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                />
                                
                                <TextField
                                    label="Date Of Birth"
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDOB(e.target.value)}
                                    required
                                    fullWidth
                                        // Use standard MUI props instead of deprecated InputLabelProps
                                        inputProps={{
                                            max: new Date().toISOString().split("T")[0], // Freeze future dates
                                        }}
                                        sx={{
                                            label: { shrink: true }, // Instead of InputLabelProps, use sx for styling
                                        }}
                                />
                               
                                <TextField
                                    label="Contact Number"
                                    value={phone}
                                    onChange={(e) => {
                                    const input = e.target.value;
                                    if (/^\d{0,10}$/.test(input)) { // Only numbers, max 10 digits
                                        setPhone(input);
                                    }
                                    }}
                                    required
                                    fullWidth
                                />

                                <TextField
                                    label="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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

                                {/* Shopping Preferences - Checkboxes */}
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Shopping Preferences</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Electronics"
                                                    onChange={handlePreferenceChange}
                                                />
                                            }
                                            label="Electronics"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Fashion"
                                                    onChange={handlePreferenceChange}
                                                />
                                            }
                                            label="Fashion"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Food"
                                                    onChange={handlePreferenceChange}
                                                />
                                            }
                                            label="Food"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value="Clothes"
                                                    onChange={handlePreferenceChange}
                                                />
                                            }
                                            label="Clothes"
                                        />
                                    </FormGroup>
                                </FormControl>

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

export default RegisterUser;
