import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Container, Typography, Paper, Box, TextField, Button } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import Header1 from '../../components/Layout/Header1';
import UserMenu from '../../components/Layout/UserMenu';

const UpdateUserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if auth and auth.user exist before destructuring
    const user = auth?.user || {};
    setFullName(user.fullname || "");
    setEmail(user.email || "");
    setDOB(user.dob || "");
    setPhone(user.phone || "");
    setAddress(user.address || "");
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("api/v1/userauth/updateUserProfile", {
        fullname,
        email,
        dob,
        phone,
        address,
        password, // Ensure this is correctly passed
      });

      if (data?.error) {
        // Log the error to inspect it further
        console.log("Error from API:", data.error);
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Your profile updated successfully");
      }
    } catch (error) {
      console.log("Error in handleSubmit:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header1 />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <UserMenu />
        <Box sx={{ flexGrow: 1, p: 3 }}>
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
                  Update Profile
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
                      onChange={(e) => setFullName(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      disabled
                    />
                    <TextField
                      label="Date Of Birth"
                      value={dob}
                      onChange={(e) => setDOB(e.target.value)}
                      fullWidth
                      disabled
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Contact Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 2 }}
                    >
                      Update
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Box>
            <Toaster />
          </Container>
          <br /><br /><br /><br />
        </Box>
      </Box>
    </Box>
  );
}

export default UpdateUserProfile;
