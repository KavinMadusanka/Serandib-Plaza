import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography, Link } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [re_Password, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !newPassword || !re_Password) {
      toast.error("All fields are required");
      return;
    }
  
    if (newPassword !== re_Password) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
      const res = await axios.post("/api/v1/userauth/forgot-password", { email, newPassword, re_Password });
      
      if (res.data.success) {
        toast.success("Password reset successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  

  return (
    <Layout>
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
          <Typography variant="h5" align="center" mb={3}>Forgot Password</Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </Box>
            
            <Box mb={2}>
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Re-Enter Password"
                type="password"
                value={re_Password}
                onChange={(e) => setRePassword(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Reset Password
            </Button>
            <br/><br/>
            <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
            <Typography variant="body2">If your password successfully reset 
                <Link href="/login"> Login From Here</Link>
            </Typography>
            </Box>
        </form>
        </Paper>
      </Box>
    <Toaster/>
    </Container>
    </Layout>
  );
};

export default ForgotPassword;
