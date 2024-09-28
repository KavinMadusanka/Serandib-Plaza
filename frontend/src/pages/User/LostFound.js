import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import {} from '../../components/style/lostfound.css'
import { Card, List, Typography, Modal, Tag } from 'antd';

const { Title, Paragraph, Text } = Typography;

const LostFound = () => {
  const [Items, setItems] = useState([]);
	const [name,setName] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);
  const [selectedItemRole, setSelectedItemRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [pNumber,setPNumber] = useState("");
  const [Description,setDescription] = useState("");
  const [role,setRole] = useState("");
  const [email, setEmail] = useState("");
  const [image,setImage] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [userName,setUserName] = useState('');
  const [userPNumber,setUserPNumber] = useState('');
  const [itemEmail,setItemEmail] = useState('');
  const [itemRole,setItemRole] = useState('');


    useEffect(() => {
      if (auth && auth.user) {
        setEmail(auth.user.email);
        setUserName(auth.user.fullname);
        setUserPNumber(auth.user.phone);
      }
    }, [auth]);

    const handleRoleChange = (e) => {
      const value = e.target.value;
      setSelectedItemRole(value === "all" ? "" : value);
  };

  //handel notification post part
  const notificationData = async(Iid) => {
    
    // e.preventDefault();
    try {
      const nofitiData = await axios.post(`/api/v1/LostAndFound/addNotification/${Iid}`,{userName,userPNumber});

      if (nofitiData.data.success) {
        toast.success(nofitiData.data.message);
      } else {
        toast.error(nofitiData.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error("Cann't send notification alert");
    }
  }



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
      const {data} = await axios.post('/api/v1/LostAndFound/addLostItem',LostItemData);
      if(data?.success){
        toast.success(data.message);
        setPNumber('');
        setName('');
        setDescription('');
        setRole('');
        setEmail('');
        setImage(null);
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

      //only gets numbers
      const handleKeyNumber = (event) => {
        const regex = /^[0-9\s]*$/;
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
    }finally {
      setLoading(false);
  }
  };
  
    // Lifecycle method
    useEffect(() => {
      getAllItems();
    }, []);

    // Handle delete card details
const handleDeleteItem = async (CId) => {
  const confirmed = window.confirm("Are you sure you want to remove this Item?");
  if (confirmed) {
    try {
      const { data } = await axios.delete(`/api/v1/LostAndFound/delete-item/${CId}`);
      if (data.success) {
        toast.success('Item Removed successfully');
      } else {
        toast.error(data.message);
      }
      handleCloseModal();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
};

// filter
useEffect(() => {
  const filtered = Items.filter((item) =>
      (selectedItemRole === "" || item.role === selectedItemRole || item.email === selectedItemRole) // Filtering by role
  );
  setFilteredItem(filtered);
}, [selectedItemRole, Items]);

    // Handle item click
    const handleItemClick = (p) => {
      setSelectedItem(p);
      setIsModalVisible(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
};

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
                        name="image"
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
                            onKeyPress={handleKeyPress}
                            required
                            />                      
                            </td>
                            <td className='texting'>
                              <input 
                            className='textInput'
                            type="text"
                            value={pNumber} 
                            onChange={(e) => setPNumber(e.target.value)}
                            placeholder="07xxxxxxxx"
                            onKeyPress={handleKeyNumber}
                            maxLength={10}
                            required
                            />
                            </td></tr>
                            <tr><br/></tr>

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
                            <tr><td className='texting' colSpan={2}>
                            <textarea
                            className='form-control'
                            type= "text"
                            value={Description} 
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder=" write a description"
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

          <div className="col p-0 m-0">
          <div className="p-2 m-2 d-flex justify-content-between" style={{ marginLeft: '2%'}}>
            <div style={{ marginLeft: '20%'}}>
              <h2>Lost & Found Items</h2>
              {/* {email}<br></br>
              {userName}<br></br>
              {userPNumber} */}
            </div>
              <div>
                <select value={selectedItemRole} onChange={handleRoleChange} className='selectitem'>
                  <option value="">All Items</option>
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                  <option value={email}>My Items</option>
                </select>
              </div>
          </div>
            <div>
            {loading ? (
                  <div className="pnf">
                    <h3 className="pnf-heading">Loading Items...</h3>
                  </div>
                ) : (
                  <List
                        grid={{ gutter: 1, column: 3 }} // Display 3 Items in one row
                        dataSource={filteredItem}
                        renderItem={p => {
                            return (
                              <List.Item>
                                    <Card
                                        hoverable
                                        style={{
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            marginBottom: '30px',
                                            width: '80%',
                                            height: '400px' ,
                                            margin: '0 auto'
                                        }}
                                        onClick={() => handleItemClick(p)} // Handle click
                                    >
                                      <div >
                                            <div className='OneItem'>
                                              <div className='Imagebox' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                  <img
                                                    src={`/api/v1/LostAndFound/getLostItem-photo/${p._id}`}
                                                    // className="card-img-top"
                                                    alt={p.name}
                                                    style={{
                                                      width: 'auto',
                                                      height: '100%',
                                                      objectFit: 'cover',
                                                      borderRadius: '8px',
                                                  }}
                                                    />
                                              </div>
                                              
                                              <div className="card-body">
                                                <p className="card-title">Name : {p.name}</p>
                                                <p className="card-text">Contact Number : {p.pNumber}</p>
                                                <p className="card-text">Description : {p.Description}</p><br/>
                                                <div className={`card ${p.email === email ? 'Delete' : ''}`} style={{ width: "100%" }}>
                                                  {p.email === email && p.role === "lost" &&(
                                                    <button className='btn btn-danger'
                                                    onClick={() => {
                                                      handleDeleteItem(p._id);
                                                      }}>
                                                    Items Found
                                                    </button>
                                                  )}
                                                  {p.email === email && p.role === "found" &&(
                                                    <button className='btn btn-danger'
                                                    onClick={() => {
                                                      handleDeleteItem(p._id);
                                                      }}>
                                                    Remove Item
                                                    </button>
                                                  )}
                                                  {p.email !== email && p.role === "lost" &&(
                                                    <button className='btnsubb' 
                                                    onClick={() => {
                                                      notificationData(p._id);
                                                      // Optionally, trigger your logic to send a message to the owner here
                                                    }}>
                                                    items Found and inform owner
                                                    </button>
                                                  )}
                                                  {p.email !== email && p.role === "found" &&(
                                                    <button className='btnsubb'
                                                    onClick={() => {
                                                      notificationData(p._id);
                                                      // Optionally, trigger your logic to send a message to the owner here
                                                    }}>
                                                    This items belongs to me
                                                    </button>
                                                  )}
                                                  
                                                </div>
                                              </div>
                                            </div>
                                        </div>
                                      </Card>
                                    </List.Item>
                                  );
                                }}
                            />
                )}
                
                {selectedItem && (
                  <div>
                    <Modal
                        visible={isModalVisible}
                        onCancel={handleCloseModal}
                        footer={null}
                        width={600} // Optional: Adjust modal width
                        bodyStyle={{ padding: '10px' }}
                    >
                      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <img
                            src={`/api/v1/LostAndFound/getLostItem-photo/${selectedItem._id}`}
                            alt={selectedItem.name}
                            style={{ width: 'auto', height: '20rem', objectFit: 'cover', borderRadius: '8px', }}
                            />
                      </div>
                        <Paragraph>
                            <strong>Name:</strong> {selectedItem.name}
                        </Paragraph>
                        <Paragraph>
                            <strong>Contact No:</strong> {selectedItem.pNumber}
                        </Paragraph>
                        <Paragraph>
                            <strong>Description:</strong> {selectedItem.Description}
                        </Paragraph>
                        {/* <Tag color={selectedPromotion.isActive ? 'green' : 'red'} style={{ fontWeight: 'bold', fontSize: '14px' }}>
                            {selectedPromotion.isActive ? 'Active' : 'Inactive'}
                        </Tag> */}
                        <div className={`card ${selectedItem.email === email ? 'Delete' : ''}`} style={{ width: "100%" }}>
                                                  {selectedItem.email === email && selectedItem.role === "lost" &&(
                                                    <button className='btn btn-danger'
                                                    onClick={() => {
                                                      handleDeleteItem(selectedItem._id);
                                                      }}>
                                                    Items Found
                                                    </button>
                                                  )}
                                                  {selectedItem.email === email && selectedItem.role === "found" &&(
                                                    <button className='btn btn-danger'
                                                    onClick={() => {
                                                      handleDeleteItem(selectedItem._id);
                                                      }}>
                                                    Remove Item
                                                    </button>
                                                  )}
                                                  {selectedItem.email !== email && selectedItem.role === "lost" &&(
                                                    <button className='btnsubb'
                                                    onClick={() => {
                                                      notificationData(selectedItem._id);
                                                      // Optionally, trigger your logic to send a message to the owner here
                                                    }}>
                                                    items Found and inform owner
                                                    </button>
                                                  )}
                                                  {selectedItem.email !== email && selectedItem.role === "found" &&(
                                                    <button className='btnsubb'
                                                    onClick={() => {
                                                      notificationData(selectedItem._id);
                                                      // Optionally, trigger your logic to send a message to the owner here
                                                    }}>
                                                    This items belongs to me
                                                    </button>
                                                  )}
                                            {/* {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>} */}
                                                  
                        </div>
                    </Modal>
                  </div>
                )}

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default LostFound