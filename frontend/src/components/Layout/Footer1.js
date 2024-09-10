import React from 'react';
import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: 'black', color: '#ffffff', padding: '2rem 0' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Serendib Plaza
                        </Typography>
                        <IconButton color="inherit" href="#" aria-label="Facebook">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton color="inherit" href="#" aria-label="Instagram">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton color="inherit" href="#" aria-label="YouTube">
                            <YouTubeIcon />
                        </IconButton>
                        <IconButton color="inherit" href="#" aria-label="LinkedIn">
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton color="inherit" href="#" aria-label="Twitter">
                            <TwitterIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Link href="#" sx={{ display: 'block', marginBottom: '0.5rem', textDecoration: 'none', color: 'white' }}>
                            Shopping
                        </Link>
                        <Link href="#" sx={{ display: 'block', marginBottom: '0.5rem', textDecoration: 'none', color: 'white' }}>
                            Events
                        </Link>
                        <Link href="#" sx={{ display: 'block', marginBottom: '0.5rem', textDecoration: 'none', color: 'white' }}>
                            Promotions
                        </Link>
                        <Link href="#" sx={{ display: 'block', textDecoration: 'none', color: 'white' }}>
                            Contact Us
                        </Link>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Entertainment
                        </Typography>
                        <Link href="#" sx={{ display: 'block', marginBottom: '0.5rem', textDecoration: 'none', color: 'white' }}>
                            Kids Play Area
                        </Link>
                        <Link href="#" sx={{ display: 'block', marginBottom: '0.5rem', textDecoration: 'none', color: 'white' }}>
                            Gaming Arcade
                        </Link>
                        <Link href="#" sx={{ display: 'block', textDecoration: 'none', color: 'white' }}>
                            Cinema
                        </Link>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                            <LocationOnIcon sx={{ marginRight: '0.5rem' }} />
                            No.324-10, Galle Road, Colombo 06
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ marginRight: '0.5rem' }} />
                            <Link href="mailto:mall@havelockcity.lk" sx={{ textDecoration: 'none', color: 'white' }}>
                                mall@serendibplaza.com
                            </Link>
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneIcon sx={{ marginRight: '0.5rem' }} />
                            <Link href="tel:+94112590590" sx={{ textDecoration: 'none', color: 'white' }}>
                                +94 112 590 575
                            </Link>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #ffffff', paddingTop: '1rem' }}>
                    <Typography variant="body2">
                        ©Serendib Plaza. All Rights Reserved.{' '}
                        <Link href="#" sx={{ textDecoration: 'none', color: 'white' }}>
                            Terms & Conditions
                        </Link>{' '}
                        |{' '}
                        <Link href="#" sx={{ textDecoration: 'none', color: 'white' }}>
                            Privacy Policy
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
