import React,{useEffect,useState} from 'react';
import ShopHeader from '../../components/Layout/ShopHeader';
import InventoryMenu from '../../components/Layout/InventoryMenu';
import { Paper, Typography, Box, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { message, Modal } from 'antd';


export const CreateCategory = () => {
    const [categories,setCategories] = useState([])
    const [name, setName] = useState('');
    const [visible,setVisible] = useState(false);
    const [selected,setSelected] = useState(null);
    const [updatedName,setUpdatedName] = useState("");

    // handle form
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const {data} = await axios.post('/api/v1/category/create-category', {name})
        if(data?.success){
          toast.success(`${data.name} is created`)
          getAllCategory();
          setName('');
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error)
        toast.error('somthing went wrong in input form')
      }
    }

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


    // update category
    const handleUpdate = async (e) => {
      e.preventDefault()
      try {
        const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updatedName});
        if(data.success){
          toast.success(`${updatedName} is updated`)
          setSelected(null)
          setUpdatedName("")
          setVisible(false)
          getAllCategory()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    }


    // delete category
    const handleDelete = async (id) => {
      try {
        const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`);
        if(data.success){
          toast.success(`category is deleted`)
          getAllCategory()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    }


    return (
      <div>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ShopHeader />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <InventoryMenu />
                <Box sx={{ flexGrow: 1, p: 3 }}>
                  <div className='col md-9'>
                <h1>Manage Category</h1>
                <div className='p-3 w-50'>
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} isUpdate={false}/>
                </div>
                <div className='w-75'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {categories?.map(c => (
                          <>
                          <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className='btn btn-primary ms-2' onClick={() => {setVisible(true); setSelected(c); setUpdatedName(c.name)}}>Edit</button>
                            <button className='btn btn-danger ms-2' onClick={() => {handleDelete(c._id)}}>Delete</button></td>
                            </tr>
                            </>
                        ))}
                    </tbody>
                  </table>
                </div>
                <Modal 
                onCancel={() => setVisible(false)} 
                footer={null} 
                open={visible}>
                  <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} isUpdate={true} />
                </Modal>
                </div>
                </Box>
            </Box>
        </Box>
      </div>
    );
  };
  