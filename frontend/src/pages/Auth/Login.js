import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
//import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    // Form submission function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("api/v1/userauth/userLogin", { email, password });
            if (res && res.data.success) {
                const { token, role, user, shop } = res.data;

                // Update auth context with user or shop details
                setAuth({
                    ...auth,
                    token,
                    user: role === "user" ? user : null,
                    shopOwner: role === "shopOwner" ? shop : null,
                });

                // Store the token and user/shop details in localStorage
                localStorage.setItem("auth", JSON.stringify({
                    token,
                    user: role === "user" ? user : null,
                    shopOwner: role === "shopOwner" ? shop : null,
                }));

                // Redirect based on user role
                if (role === "user") {
                    navigate('/userProfile'); // Adjust this route to match your route configuration
                } else if (role === "shopOwner") {
                    navigate('/shopProfile'); // Adjust this route to match your route configuration
                }

                toast.success("Login successful");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title="Login">
            <div className='register'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}> 
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control" 
                            id="Email" 
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control" 
                            id="Password" 
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
