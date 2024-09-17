import React,{useEffect,useState} from 'react';
import ShopHeader from '../../components/Layout/ShopHeader';
import InventoryMenu from '../../components/Layout/InventoryMenu';
import { Paper, Typography, Box, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const {Option} = Select

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams()
    const [categories,setCategories] = useState([])
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [quantity,setQuantity] = useState("")
    const [shipping,setShipping] = useState("")
    const [photo,setPhoto] = useState("")
    const [id,setId] = useState("")


    // get single product
    const getSingleProduct = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }   

    useEffect(() => {
        getSingleProduct()
        //eslint-disable-next-line
    }, [])


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


    // update product function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            photo && productData.append("photo", photo)
            productData.append("category", category)
            const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData);
            if(data?.success){
                toast.success('Product Updated Successfully')
                setName("");
                setDescription("");
                setPrice("");
                setQuantity("");
                setPhoto(null);
                setCategory(null);
                navigate('/products');
            } else{
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    };


    // delete a product
    const handleDelete = async () => {
        try {
            let answer = window.prompt('Are you sure want to delete this product?')
            if(!answer) return
            const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
            toast.success('Product Deleted Successfully')
            navigate('/products');
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
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
                  <h1>Update Product</h1>
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
                        }}
                            value={category}
                        >
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
                            {photo ? (
                                <div className="text-center">
                                    <img src={URL.createObjectURL(photo)} 
                                    alt='product-photo' 
                                    height={'200px'}
                                    className='img img-responsive'
                                    />
                                </div>
                            ) : (
                                <div className="text-center">
                                    <img src={`/api/v1/product/product-photo/${id}`} 
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
                            <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                        </div>
                        <div className='mb-3'>
                            <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
                        </div>
                    </div>
                  </div>
                  </Box>
              </Box>
          </Box>
        </div>
  )
}

export default UpdateProduct