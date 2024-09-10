import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import { DescriptionIcon } from '@mui/icons-material/Description';

const LostFound = () => {
	const [name,setName] = useState("");
    const [pNumber,setPNumber] = useState("");
    const [Description,setDescription] = useState("");
    const [role,setRole] = useState("");
    const [email, setEmail] = useState("");
    const [image,setImage] = useState("");
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();


      //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const LostItemData = new FormData();
      LostItemData.append("name", name);
      LostItemData.append("pNumber", pNumber);
      LostItemData.append("Description", Description);
      LostItemData.append("role", role);
      LostItemData.append("email", email);
      LostItemData.append("image", image);
      const {data} = await axios.post('http://localhost:8088/api/v1/LostAndFound/addLostItem',LostItemData);
      if(data.success){
        toast.success(data.message);
        setPNumber('');
        setName('');
        setDescription('');
        setRole('');
        setEmail('');
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Somthing went wrong!!!');
    }
  };

   //only gets alpherbatds
   const handleKeyPress = (event) => {
    const regex = /^[a-zA-Z\s]*$/;
    if(!regex.test(event.key)){
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (auth && auth.user) {
      setEmail(auth.user.email);
     
    }
  }, [auth]);

  return (
    <Layout title={"Lost & Found"}>
        <div>
        <div className='grid-container'>
      <form onSubmit={handleSubmit}>
        <div className='KAboarder'>
            <div className='item1'>
              <div className='KApayment'> Your payment information is safe with us</div>
            </div>
            <div className='item2'>
              <div className='KAbar'>
                    {/* <ul className="KAbarInn">
                      
                      <li className="KAbarIn">
                        Add a New Card
                      </li>
                    </ul> */}
              </div>
            </div>
            {/* Photo Upload */}
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-3">
                {image ? image.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="item3">
                <table id="table">
                  <tbody>
                  <tr><td className='texting'>Name :</td>
                      <td className='texting'>Phone Number :</td></tr>
                      <tr></tr>
                    <tr>
                      <td>
                        <input 
                      type="text"
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      // onKeyPress={handleKeyPress}
                      required
                      />                      
                      </td>
                      <td>
                        <input 
                      type="text"
                      value={pNumber} 
                      onChange={(e) => setPNumber(e.target.value)}
                      placeholder="Contact Number"
                      onKeyPress={handleKeyPress}
                      required
                      />
                      </td></tr>
                      <tr><br/></tr>
                      <tr><td className='texting'>Email :</td></tr>
                      <tr><td>
                      <input 
                      type="text"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@gmail.com"
                      // onKeyPress={handleKeyPress}
                      required
                      />   
                        </td></tr>
                      <tr><td>
                      <input
                      type="radio"
                      name="status"
                      value="lost"
                      onChange={(e) => setRole(e.target.value)}
                    /> Lost
                      </td>
                      <td>
                      <input
                      type="radio"
                      name="status"
                      value="found"
                      onChange={(e) => setRole(e.target.value)}
                    /> Found
                      </td></tr>

                      <tr><td>
                        Description : 
                        </td></tr>
                      <tr><td>
                      <input 
                      type="text"
                      value={Description} 
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                      onKeyPress={handleKeyPress}
                      required
                      />
                        </td></tr>
                </tbody></table>
            </div>
            <div className="item5">
                
            </div>
            <div className='item9'>
              <button className='btnsub'>Save card Details</button>
            </div>
        </div>
        </form>
      </div>
        </div>
    </Layout>
  )
}

export default LostFound