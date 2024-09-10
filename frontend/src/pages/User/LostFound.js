import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import {} from '../../components/style/lostfound.css'
import { DescriptionIcon } from '@mui/icons-material/Description';

const LostFound = () => {
  const [Items, setItems] = useState([]);
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
        setImage('');
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

  //get all lost & found items
  const getAllItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:8088/api/v1/LostAndFound/getLostItems");
      setItems(data.Items);
      getAllItems();
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Items");
    }
  };
  useEffect(() => {
    if (auth && auth.user) {
      setEmail(auth.user.email);
     
    }
  }, [auth]);
  
    // Lifecycle method
    useEffect(() => {
      getAllItems();
    }, []);

  return (
    <Layout title={"Lost & Found"}>
        <div className ="row flex-nowrap">
          <div className ="col-auto col-md-3 col-xl-3 px-sm-3 px-0" 
          // style={{backgroundColor:"#BFEA7C"}}
          >
            <div className='left'>
            <div 
            // className="col-md-3" 
            id='all'>
            <form onSubmit={handleSubmit}>
              <div className='KAboarder'>
                  <div>
                    <div className='KApayment'>
                      <h2> Add Your Item </h2>
                      </div>
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
                  <div className='uploadbox'>
                    <label className="btn btn-outline-secondary col-md-12">
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

                  {/* Display Uploaded Photo */}
                  <div>
                    <div className="mb-3">
                      {image && (
                        <div className="text-center">
                          <img src={URL.createObjectURL(image)} alt="LOst or Found Image" height={"200px"} className="img img-responsive" />
                        </div>
                      )}
                    </div>
                  </div>


                  <div className="item3">
                      <table id="Ktable">
                        <tbody>
                        <tr><td className='texting'>Name :</td>
                            <td className='texting'>Phone Number :</td></tr>
                            <tr></tr>
                          <tr>
                            <td className='texting'>
                              <input 
                            className='textInput'
                            type="text"
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            // onKeyPress={handleKeyPress}
                            required
                            />                      
                            </td>
                            <td className='texting'>
                              <input 
                            className='textInput'
                            type="text"
                            value={pNumber} 
                            onChange={(e) => setPNumber(e.target.value)}
                            placeholder="Contact Number"
                            onKeyPress={handleKeyPress}
                            required
                            />
                            </td></tr>
                            <tr><br/></tr>
                            {/* <tr><td className='texting'>Email :</td></tr>
                            <tr><td>
                            <input 
                            type="text"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@gmail.com"
                            // onKeyPress={handleKeyPress}
                            required
                            />   
                              </td></tr> */}
                            <tr><td className='texting'>
                            <input
                            className='RadioInput'
                            type="radio"
                            name="status"
                            value="lost"
                            onChange={(e) => setRole(e.target.value)}
                          /> Lost
                            </td>
                            <td className='texting'>
                            <input
                            className='RadioInput'
                            type="radio"
                            name="status"
                            value="found"
                            onChange={(e) => setRole(e.target.value)}
                          /> Found
                            </td></tr>

                            <tr><td className='texting'>
                              Description : 
                              </td></tr>
                            <tr><td className='texting'>
                            <input 
                            className='textInput'
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
                    <button className='btnsub'>Add Item</button>
                  </div>
              </div>
              </form>
            </div>
            </div>
          </div>

          {/* <div> */}
          <div className="col p-0 m-0">
          <div className="p-2 m-2 d-flex justify-content-between" style={{ marginLeft: '2%'}}>
            <div className='KApayment'>
              <h2>Lost & Found Items</h2>
            </div>
            {/* <div className='exportReBtn'>
                <button onClick={generatePDF}>Export Report</button>
            </div> */}
          </div>
            <div>
              <div className="d-flex flex-wrap justify-content-around">
                {Items.map((p) => (
                  // <Link
                  //   to={`/dashboard/admin/product/${p.slug}`}
                  //   className="product-link"
                  //   key={p._id}
                  // >
                    <div>
                    {/* <div className={`card m-2 ${p.quantity === 0 ? 'out-of-stock' : ''}`} style={{ width: "18rem" }}> */}
                      {/* {p.quantity === 0 && (
                        <div className="out-of-stock-label">Out of Stock</div>
                      )} */}
                      <img
                        src={`/api/v1/LostAndFound/getLostItem-photo/${p._id}`}
                        className="card-img-top"
                        height={"200px"}
                        alt={p.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">Name : {p.name}</h5>
                        <p className="card-text">Contact Number : {p.pNumber}</p>
                        <p className="card-text">Description : {p.Description}</p>
                      </div>
                    </div>
                  // </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default LostFound