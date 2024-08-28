import React ,{useState}from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import {toast} from 'react-toastify'
import toast, { Toaster } from "react-hot-toast"

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
        
        <div className='register'>
        <h1>User Registration</h1>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label 
                        htmlFor="FullName" 
                        className="form-label">
                        Full Name
                    </label>
                    <input 
                        type="text" 
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-control" 
                        id="FullName"
                        required 
                    />
                </div>
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
                        htmlFor="DOB" 
                        className="form-label">
                        Date Of Birth
                    </label>
                    <input 
                        type="date" 
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                        className="form-control" 
                        id="DOB"
                        required  
                    />
                </div>
                <div className="mb-3">
                    <label 
                        htmlFor="ContactNumber" 
                        className="form-label">
                        ContactNumber
                    </label>
                    <input 
                        type="text" 
                        value = {phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control" 
                        id="ContactNumber" 
                        required
                    />
                </div>
                <div className="mb-3 ">
                    <label 
                        className="Address" 
                        htmlFor="exampleCheck1">
                        Address
                    </label>
                    <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control" 
                        id="Address" 
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

export default RegisterUser