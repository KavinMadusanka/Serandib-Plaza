import React,{useEffect,useState} from 'react';
import ShopHeader from '../../components/Layout/ShopHeader';
import InventoryMenu from '../../components/Layout/InventoryMenu';
import { Paper, Typography, Box, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';

const {Option} = Select

const CreateProduct = () => {
    const [categories,setCategories] = useState([])
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [quantity,setQuantity] = useState("")
    const [shipping,setShipping] = useState("")


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




    return (
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <ShopHeader />
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <InventoryMenu />
                  <Box sx={{ flexGrow: 1, p: 3 }}>
                    <div className='col md-9'>
                  <h1>Create Product</h1>
                    <div className='m-1 w-75'>
                        <Select 
                        bordered={false} 
                        placeholder="Select a category" 
                        size="large" 
                        showSearch 
                        className='form-select mb-3' 
                        onChange={(value) => {
                            setCategory(value);
                        }}>
                            {categories?.map((c) => (
                                <Option key={c._id} value={c.name}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                  </div>
                  </Box>
              </Box>
          </Box>
        </div>
      );
};

export default CreateProduct;