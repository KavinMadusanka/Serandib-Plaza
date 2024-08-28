import React,{ useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import {toast} from 'react-toastify'
import toast, { Toaster } from "react-hot-toast"

const Login = () => {
    
    const [email,setEmail] = useState("")
   
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("api/v1/userauth/userLogin",{email,password})
            if(res && res.data.success){
                toast.success("Registered successfully,Please Login")
                navigate('/')
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout title="Login">
        <div className='register'>
        <h1>Login</h1>
            <form onSubmit={handleSubmit}> 
                
                <div className="mb-3">
                    <label 
                        htmlFor="Email" 
                        className="form-label">
                        Email
                    </label>
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
                    <label 
                        htmlFor="Password" 
                        className="form-label">
                        Password
                    </label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control" 
                        id="Password" 
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <Toaster/>
        </div> 
    </Layout>
    
  )
}

export default Login