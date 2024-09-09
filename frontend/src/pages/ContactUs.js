import React from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Divider, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Layout from '../components/Layout/Layout';

const ContactUs = () => {
    const theme = useTheme();

    return (
        <Layout>
            <Container maxWidth="lg" sx={{ py: 8, background: 'white' }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold', color: '#007bff' }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        We’d love to hear from you! Feel free to reach out using the form below or visit us at our location.
                    </Typography>
                </Box>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
                    <Box flex={1}>
                        <Paper elevation={6} sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Send Us a Message
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <form noValidate autoComplete="off">
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Message"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={6}
                                    margin="normal"
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ borderRadius: 20, '&:hover': { bgcolor: '#0056b3' } }}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </Paper>
                    </Box>

                    <Box flex={1}>
                        <Paper elevation={6} sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Our Contact Information
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <LocationOnIcon sx={{ mr: 1, color: '#007bff' }} />
                                    No.324-10, Galle Road, Colombo 06
                                </Typography>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <PhoneIcon sx={{ mr: 1, color: '#007bff' }} />
                                   +94 112 590 575
                                </Typography>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EmailIcon sx={{ mr: 1, color: '#007bff' }} />
                                    mall@serendibplaza.com
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Stack>

                <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Serendib Plaza. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Layout>
    );
};

export default ContactUs;
