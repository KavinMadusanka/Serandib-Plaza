import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Container, Typography, Paper, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import Header1 from '../../components/Layout/Header1';
import UserMenu from '../../components/Layout/UserMenu';
import DeleteIcon from '@mui/icons-material/Delete';

const UpdateUserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to control delete confirmation dialog

  useEffect(() => {
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
        password,
      });

      if (data?.error) {
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

  const handleDeleteProfile = async () => {
    try {
      const response = await axios.delete("/api/v1/userauth/deleteUserProfile", {
        data: { userId: auth.user._id },
      });
      if (response.status === 200) {
        localStorage.removeItem("auth");
        toast.success("Profile Deleted Successfully");
        window.location.href = "/";
      } else {
        console.error("Error deleting profile:", response.statusText);
        toast.error("Something went wrong while deleting the profile");
      }
    } catch (error) {
      console.error("Error deleting profile:", error.message);
      toast.error("Something went wrong while deleting the profile");
    }
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true); // Open the confirmation dialog
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Close the confirmation dialog without deleting
  };

  const handleConfirmDelete = () => {
    setOpenDeleteDialog(false); // Close the dialog and proceed with deletion
    handleDeleteProfile();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats the date as YYYY-MM-DD
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'white' }}>
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
                marginTop: 3,
              }}
            >
              <Paper elevation={6} sx={{ padding: 4, width: '750px', borderRadius: '5px' }}>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: 3,
                    //color: '#007bff',
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
                      variant="outlined"
                    />
                    <TextField
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      variant="outlined"
                      disabled
                    />
                    <TextField
                      label="Date Of Birth"
                      value={dob ? formatDate(dob) : ''}
                      onChange={(e) => setDOB(e.target.value)}
                      fullWidth
                      variant="outlined"
                      disabled
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      label="Contact Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                    <Box
                      sx={{
                      display: 'flex',
                      justifyContent: 'center', // Centers the button horizontally
                      alignItems: 'center', // Optional: Centers vertically within its parent
                      width: '100%', // Full width for the container
                    }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        width:"400px",
                        marginTop: 2,
                        padding: 1,
                        fontWeight: 'bold',
                        borderRadius: '25px',
                        backgroundColor: '#007bff',
                        '&:hover': {
                          backgroundColor: '#0056b3',
                        },
                      }}
                    >
                      Update Profile
                    </Button>
                    </Box>
                  </Box>
                </form>
              </Paper>
            </Box>
            <Toaster />
          </Container>
          
          <Box sx={{ textAlign: 'center', marginTop: 6 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            If you want to delete your account, click on delete button.<br/>
              This action will permanently delete your profile and all associated data.
            </Typography>
            <Button
              onClick={handleOpenDeleteDialog}
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{
                backgroundColor: '#ff4d4f',
                '&:hover': {
                  backgroundColor: '#d43539',
                },
              }}
            >
              Delete Profile
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Confirmation Dialog for Deletion */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Profile?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete your profile? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UpdateUserProfile;
