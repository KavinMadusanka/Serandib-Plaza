import React ,{useState}from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import {toast} from 'react-toastify'
import toast, { Toaster } from "react-hot-toast"
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';

const RegisterUser = () => {
    const [fullname,setFullName] = useState("")
    const [email,setEmail] = useState("")
    const [dob,setDOB] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("api/v1/userauth/userRegister",{fullname,email,dob,phone,address,password})
            if(res && res.data.success){
                toast.success("Registered successfully,Please Login")
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
    }
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
                                onChange={(e) => setFullName(e.target.value)}
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
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="Contact Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                </Paper>
            </Box>
            <Toaster />
        </Container>
    </Layout>
    
  )
}

export default RegisterUser