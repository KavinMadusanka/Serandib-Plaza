import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Container, Typography, Paper, Box, TextField, Button } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import ShopHeader from '../../components/Layout/ShopHeader';
import ShopMenu from '../../components/Layout/ShopMenu';

const UpdateShopProfile = () => {
  const [auth, setAuth] = useAuth();
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

  // Get shop data
  useEffect(() => {
    if (auth?.shopOwner) {
      const {
        fullname = '',
        owner_email = '',
        owner_contact = '',
        nic = '',
        businessregno = '',
        tax_id_no = '',
        shopname = '',
        email = '',
        businesstype = '',
        category = '',
        description = '',
        operating_hrs_from = '',
        operating_hrs_to = '',
        shoplocation = '',
        shopcontact = ''
      } = auth.shopOwner;

      setFullName(fullname);
      setOwnerEmail(owner_email);
      setOwnerContact(owner_contact);
      setNIC(nic);
      setBusinessRegNo(businessregno);
      setTax_ID_No(tax_id_no);
      setShopName(shopname);
      setEmail(email);
      setBusinessType(businesstype);
      setCategory(category);
      setDescription(description);
      setOpen(operating_hrs_from);
      setClose(operating_hrs_to);
      setShopLocation(shoplocation);
      setContact(shopcontact);
    }
  }, [auth?.shopOwner]);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("api/v1/userauth/updateShopProfile", {
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

      if (data?.error) {
        console.log("Error from API:", data.error);
        toast.error(data?.error);
      } else {
        // Update state with the new shop details
        setAuth({ ...auth, shopOwner: data?.updatedShop });

        // Update local storage with the new shop details
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.shopOwner = data.updatedShop; // Make sure this matches the structure returned by your API
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Your profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ShopHeader />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <ShopMenu />
        <Box sx={{ flexGrow: 1, p: 3 }}>
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
                  Update Shop Info
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
                      fullWidth
                    />
                    <TextField
                      label="Owner Email"
                      type="email"
                      value={owner_email}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Shop Owner Contact Number"
                      value={owner_contact}
                      onChange={(e) => setOwnerContact(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="NIC"
                      value={nic}
                      onChange={(e) => setNIC(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Business Registration No"
                      value={businessregno}
                      onChange={(e) => setBusinessRegNo(e.target.value)}
                      fullWidth
                      disabled
                    />
                    <TextField
                      label="Tax ID No"
                      value={tax_id_no}
                      onChange={(e) => setTax_ID_No(e.target.value)}
                      fullWidth
                      disabled
                    />
                    <TextField
                      label="Shop Name"
                      value={shopname}
                      onChange={(e) => setShopName(e.target.value)}
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
                      label="Business Type"
                      value={businesstype}
                      onChange={(e) => setBusinessType(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Business Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Open From"
                      type="time"
                      value={operating_hrs_from}
                      onChange={(e) => setOpen(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Close At"
                      type="time"
                      value={operating_hrs_to}
                      onChange={(e) => setClose(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Shop Location"
                      value={shoplocation}
                      onChange={(e) => setShopLocation(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="Shop Contact Number"
                      value={shopcontact}
                      onChange={(e) => setContact(e.target.value)}
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
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateShopProfile;
