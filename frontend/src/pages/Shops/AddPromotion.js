import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select, Input, DatePicker, Checkbox, Button, Typography, Form, message } from 'antd';
import { Box } from '@mui/material';
import ShopHeader from '../../components/Layout/ShopHeader';
import ShopMenu from '../../components/Layout/ShopMenu';
import dayjs from 'dayjs'; // Import dayjs for date handling

const { Option } = Select;
const { Title } = Typography;

const AddPromotion = () => {
    const [promotionTitle, setPromotionTitle] = useState('');
    const [promotionDescription, setPromotionDescription] = useState('');
    const [discountType, setDiscountType] = useState('percentage');
    const [discountValue, setDiscountValue] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [termsConditions, setTermsConditions] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [applicableItems, setApplicableItems] = useState('');
    const [promotionImage, setPromotionImage] = useState('');
    const [shop, setShop] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [shops, setShops] = useState([]);

    const navigate = useNavigate();

    // Fetch all shops
    const getAllShops = async () => {
        try {
            const { data } = await axios.get('/api/v1/userauth/shops');
            if (data?.success) {
                setShops(data?.shops);
            }
        } catch (error) {
            console.log(error);
            message.error('Something went wrong in fetching shops');
        }
    };

    useEffect(() => {
        getAllShops();
    }, []);

 

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('promotionTitle', values.promotionTitle);
        formData.append('promotionDescription', values.promotionDescription);
        formData.append('discountType', values.discountType);
        formData.append('discountValue', values.discountValue);
        formData.append('startDate', dayjs(values.startDate).format('YYYY-MM-DD')); // Use dayjs to format date
        formData.append('endDate', dayjs(values.endDate).format('YYYY-MM-DD')); // Use dayjs to format date
        formData.append('termsConditions', values.termsConditions);
        formData.append('promoCode', values.promoCode);
        formData.append('applicableItems', values.applicableItems);
        formData.append('promotionImage', promotionImage);
        formData.append('shop', shop);
        formData.append('isActive', values.isActive);

        try {
            const response = await axios.post('/api/v1/promotions/create-promotion', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                message.success('Promotion created successfully');
                navigate('/allpromo');
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            console.error('Error creating promotion:', error);
            message.error('An error occurred while creating the promotion.');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ShopHeader />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <ShopMenu />
                <Box sx={{ flexGrow: 1, padding: '20px' }}>
                    <Title level={2}>Add your Promotion</Title>
                    <Form
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            discountType: 'percentage',
                            isActive: true,
                        }}
                    >
                        <Form.Item name="shop" label="Select Your Shop Name.(All the shops have the same portal to add their promotions.There fore please select your shop name from the below list)" rules={[{ required: true, message: 'Please select a shop!' }]}>
                            <Select
                                placeholder="Select Shop"
                                style={{ width: '100%' }}
                                onChange={(value) => setShop(value)}
                            >
                                {shops.map((s) => (
                                    <Option key={s._id} value={s._id}>
                                        {s.shopname}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Promotion Title" name="promotionTitle" rules={[{ required: true, message: 'Please enter the promotion title!' }]}>
                            <Input value={promotionTitle} onChange={(e) => setPromotionTitle(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Promotion Description" name="promotionDescription" rules={[{ required: true, message: 'Please enter the promotion description!' }]}>
                            <Input.TextArea value={promotionDescription} onChange={(e) => setPromotionDescription(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Discount Type" name="discountType" rules={[{ required: true, message: 'Please select the discount type!' }]}>
                            <Select
                                value={discountType}
                                onChange={(value) => setDiscountType(value)}
                            >
                                <Option value="percentage">Percentage</Option>
                                <Option value="fixed_amount">Fixed Amount</Option>
                                <Option value="BOGO">Buy One Get One (BOGO)</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Discount Value" name="discountValue" rules={[{ required: true, message: 'Please enter the discount value!' }]}>
                            <Input type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select the start date!' }]}>
                            <DatePicker
                                value={startDate ? dayjs(startDate) : null}
                                onChange={(date) => setStartDate(date)}
                                style={{ width: '100%' }}
                                disabledDate={(current) => current && current < dayjs().startOf('day')}  // Disables past dates
                            />
                        </Form.Item>


                        <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Please select the end date!' }]}>
                            <DatePicker
                                value={endDate ? dayjs(endDate) : null}
                                onChange={(date) => setEndDate(date)}
                                style={{ width: '100%' }}
                                disabledDate={(current) => current && current < dayjs().startOf('day')}  // Disables past dates
                            />
                        </Form.Item>

                        <Form.Item label="Terms and Conditions" name="termsConditions">
                            <Input.TextArea value={termsConditions} onChange={(e) => setTermsConditions(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Promo Code (optional)" name="promoCode">
                            <Input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Applicable Items (optional)" name="applicableItems">
                            <Input value={applicableItems} onChange={(e) => setApplicableItems(e.target.value)} />
                        </Form.Item>

                        <Form.Item label="Promotion Banner" name="promo banner">
                        <div className='mb-3'>
                            <label className='btn btn-outline-secondary col-md-12'>
                                {promotionImage ? promotionImage.name:"Upload promotion banner"}
                                <input type="file" name="photo" accept="image/*"
                                onChange={(e)=> setPromotionImage(e.target.files[0])}
                                hidden
                                />
                            </label>
                        </div>
                        </Form.Item>

                        <div className='mb-3'>
                            {promotionImage && (
                                <div className='text-center'>
                                    <img
                                    src={URL.createObjectURL(promotionImage)}
                                    alt="promotion_image"
                                    height={"200px"}
                                    className='img img-responsive'
                                    />
                                </div>
                            )}
                        </div>

                        

                        <Form.Item name="isActive" valuePropName="checked" initialValue={true}>
                            <Checkbox onChange={(e) => setIsActive(e.target.checked)}>Active</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Create Promotion</Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Box>
        </Box>
    );
};

export default AddPromotion;
