import React,{useEffect,useState} from 'react';
import ShopHeader from '../../components/Layout/ShopHeader';
import InventoryMenu from '../../components/Layout/InventoryMenu';
import { Paper, Typography, Box, Stack } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const {Option} = Select

const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories,setCategories] = useState([])
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [quantity,setQuantity] = useState("")
    const [reorderLevel, setReorderLevel] = useState("");
    const [shipping,setShipping] = useState("")
    const [photo,setPhoto] = useState("")
    const [email,setEmail] = useState("");
    const [auth,setAuth] = useAuth();


    // get all categories
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get('/api/v1/category/get-category')
            if(data?.success){
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }
    };


    useEffect(() => {
        getAllCategory();
    },[])

    useEffect(() =>{
        if(auth && auth.shopOwner){
            setEmail(auth.shopOwner.email);
            console.log(email)
        }
    },[auth]);

    // create product function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            productData.append("email", email)
            productData.append("reorderLevel", reorderLevel);
            const {data} = await axios.post('/api/v1/product/create-product', productData);
            if(data?.success){
                toast.success('Product Created Successfully')
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setReorderLevel("");
                setPhoto(null);
                setEmail('');
                setCategory(null);
                navigate('/products')
            } else{
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    };




    return (
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <ShopHeader />
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <InventoryMenu />
                  <Box sx={{ flexGrow: 1, p: 3 }}>
                    <div className='col md-9'>
                  <h1>Add Product</h1>
                    <div className='m-1 w-75'>
                        <Select 
                        bordered={false} 
                        placeholder="Select a category" 
                        size="large" 
                        showSearch 
                        className='form-select mb-3' 
                        value={category || null}
                        onChange={(value) => {
                            setCategory(value);
                        }}>
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                        <div className='mb-3'>
                            <label className='btn btn-outline-secondary col-md-12'>
                                {photo ? photo.name : "Upload Photo"}
                            <input type='file' 
                            name='photo' 
                            accept='image/*' 
                            onChange={(e) => setPhoto(e.target.files[0])} 
                            hidden
                            />
                            </label>
                        </div>
                        <div className='mb-3'>
                            {photo &&(
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} 
                                    alt='product-photo' 
                                    height={'200px'}
                                    className='img img-responsive'
                                    />
                                </div>
                            )}
                        </div>
                        <div className='mb-3'>
                            <input type='text' 
                            value={name} 
                            placeholder='write a name' 
                            className='form-control' 
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <textarea 
                            value={description} 
                            placeholder='write a description' 
                            className='form-control' 
                            onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <input type='text' 
                            value={price} 
                            placeholder='price' 
                            className='form-control' 
                            onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <input type='number' 
                            value={quantity} 
                            placeholder='quantity' 
                            className='form-control' 
                            onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <input type='number'
                                value={reorderLevel}
                                placeholder='Reorder Level' // New input for reorder level
                                className='form-control'
                                onChange={(e) => setReorderLevel(e.target.value)}
                            />
                                </div>
                        <div className='mb-3'>
                            <button className='btn btn-primary' onClick={handleCreate}>ADD PRODUCT</button>
                        </div>
                    </div>
                  </div>
                  </Box>
              </Box>
          </Box>
          <Toaster/>
        </div>
      );
};

export default CreateProduct;