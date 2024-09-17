import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Select, Input, DatePicker, Checkbox, Button, Typography, Form, message, Modal } from 'antd';
import { Box } from '@mui/material';
import ShopHeader from '../../components/Layout/ShopHeader';
import ShopMenu from '../../components/Layout/ShopMenu';
import dayjs from 'dayjs';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const UpdatePromotion = () => {
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
    const [isActive, setIsActive] = useState(true);
    const [shop, setShop] = useState('');

    const navigate = useNavigate();
    const location = useLocation();  
    const promotion = location.state?.promotion || {};

    useEffect(() => {
        if (promotion) {
            setPromotionTitle(promotion.promotionTitle);
            setPromotionDescription(promotion.promotionDescription);
            setDiscountType(promotion.discountType);
            setDiscountValue(promotion.discountValue);
            setStartDate(dayjs(promotion.startDate));
            setEndDate(dayjs(promotion.endDate));
            setTermsConditions(promotion.termsConditions);
            setPromoCode(promotion.promoCode);
            setApplicableItems(promotion.applicableItems);
            setIsActive(promotion.isActive);
            setShop(promotion.shop);
        }
    }, [promotion]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('promotionTitle', promotionTitle);
        formData.append('promotionDescription', promotionDescription);
        formData.append('discountType', discountType);
        formData.append('discountValue', discountValue);
        formData.append('startDate', dayjs(startDate).format('YYYY-MM-DD'));
        formData.append('endDate', dayjs(endDate).format('YYYY-MM-DD'));
        formData.append('termsConditions', termsConditions);
        formData.append('promoCode', promoCode);
        formData.append('applicableItems', applicableItems);
        formData.append('isActive', isActive);

        if (promotionImage) {
            formData.append('promotionImage', promotionImage);
        }

        try {
            const { data } = await axios.put(`/api/v1/promotions/update-promotion/${promotion._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data.success) {
                message.success('Promotion updated successfully');
                navigate('/allpromo');
            } else {
                message.error(data.message);
            }
        } catch (error) {
            console.error('Error updating promotion:', error);
            message.error('An error occurred while updating the promotion.');
        }
    };

    const handleDeletePromotion = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/promotions/delete-promotion/${promotion._id}`);
            if (data.success) {
                message.success('Promotion deleted successfully');
                navigate('/allpromo');
            } else {
                message.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting promotion:', error);
            message.error('An error occurred while deleting the promotion.');
        }
    };

    const confirmDelete = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete this promotion?',
            content: 'This action cannot be undone.',
            onOk: handleDeletePromotion,
            okText: 'Yes',
            cancelText: 'No',
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ShopHeader />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <ShopMenu />
                <Box sx={{ flexGrow: 1, padding: '20px' }}>
                    <Title level={2}>Update Promotion</Title>
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Form.Item label="Promotion Title" rules={[{ required: true }]}>
                            <Input value={promotionTitle} onChange={(e) => setPromotionTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Promotion Description" rules={[{ required: true }]}>
                            <Input.TextArea value={promotionDescription} onChange={(e) => setPromotionDescription(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Discount Type" rules={[{ required: true }]}>
                            <Select value={discountType} onChange={(value) => setDiscountType(value)}>
                                <Option value="percentage">Percentage</Option>
                                <Option value="fixed_amount">Fixed Amount</Option>
                                <Option value="BOGO">Buy One Get One</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Discount Value" rules={[{ required: true }]}>
                            <Input type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Start Date" rules={[{ required: true }]}>
                            <DatePicker value={startDate} onChange={(date) => setStartDate(date)} disabledDate={(current) => current && current < dayjs().startOf('day')} style={{ width: '100%' }}/>
                        </Form.Item>
                        <Form.Item label="End Date" rules={[{ required: true }]}>
                            <DatePicker value={endDate} onChange={(date) => setEndDate(date)} disabledDate={(current) => current && current < dayjs().startOf('day')} style={{ width: '100%' }}/>
                        </Form.Item>
                        <Form.Item label="Promo Code (optional)">
                            <Input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Terms and Conditions">
                            <Input.TextArea value={termsConditions} onChange={(e) => setTermsConditions(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Applicable Items (optional)">
                            <Input value={applicableItems} onChange={(e) => setApplicableItems(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Promotion Image">
                            <Input type="file" accept="image/*" onChange={(e) => setPromotionImage(e.target.files[0])} />
                        </Form.Item>
                        <Form.Item name="isActive" valuePropName="checked" initialValue={isActive}>
                            <Checkbox onChange={(e) => setIsActive(e.target.checked)}>Active</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Box 
                                sx={{ 
                                display: 'flex', 
                                justifyContent: 'center',  // Centers the button horizontally
                                alignItems: 'center',      // Centers the button vertically (if needed)
                            }}
                            >
                                <Button type="primary" htmlType="submit">Update Promotion</Button>
                            </Box>        
                        </Form.Item>
                    </Form>
                    <hr/>
                    <br/>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            textAlign: 'center' 
                        }}
                    >
                    <Typography>
                        If you want to delete this promotion, click on the delete button.<br />
                        This action can't be undone and all the relevant data will be lost regarding this.
                    </Typography>

                    <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        style={{ marginTop: '20px', 
                        backgroundColor: '#ff4d4f', // Red background color
                        borderColor: '#ff4d4f',     // Matches the border color with the background
                        color: '#fff'
                    }}  // Adds space between text and button
                    onClick={confirmDelete}
                    >
                        Delete Promotion
                    </Button>
                </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default UpdatePromotion;
