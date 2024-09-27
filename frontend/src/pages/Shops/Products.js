import React,{useEffect,useState} from 'react';
import InventoryMenu from '../../components/Layout/InventoryMenu'
import ShopHeader from '../../components/Layout/ShopHeader';
import { Paper, Typography, Box, Stack } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Layout, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Products = () => {
    const [products,setProducts] = useState([]);
    const [email,setEmail] = useState("");
    const [auth,setAuth] = useAuth();


    // get all products
    const getAllProducts = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${auth?.shopOwner?.email}`);
            setProducts(data.products);
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    // lifecycle method
    useEffect(() => {
        getAllProducts();
    }, [auth]);

    useEffect(() =>{
        if(auth && auth?.shopOwner){
            setEmail(auth?.shopOwner?.email);
            // console.log(email)
        }
    },[auth]);


    return (
        <Layout>
        <div>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
              <ShopHeader />
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  <InventoryMenu />
                  <Box sx={{ flexGrow: 1, p: 3 }}>
                    <div className='col md-9'>
                  <h1 className='text-center'>All Products List</h1><br/>
                  <div className='d-flex flex-wrap justify-content-center'>
                                    {products?.map((p) => (
                                        <Link key={p._id} to={`/products/${p.slug}`} className='product-link'>
                                            <div className="card product-card">
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    className="card-img-top product-img"
                                                    alt={p.name}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <p className="card-text">{p.description}</p>
                                                    <p className="card-text"><b>LKR {p.price}</b></p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                  </div>
                  </Box>
              </Box>
          </Box>
        </div>
        </Layout>
      );
}

export default Products