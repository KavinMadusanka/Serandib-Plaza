import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation to access passed state
import { Select, Input, DatePicker, Checkbox, Button, Typography, Form, message } from 'antd';
import { Box } from '@mui/material';
import ShopHeader from '../../components/Layout/ShopHeader';
import ShopMenu from '../../components/Layout/ShopMenu';
import dayjs from 'dayjs';

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
    const location = useLocation();  // Access the state passed from the previous page
    const promotion = location.state?.promotion || {};  // Fallback to an empty object

    // Pre-fill form data with the promotion's existing data
    useEffect(() => {
        if (promotion) {
          console.log("Promotion ID:", promotion._id);
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
            setShop(promotion.shop);  // Adjust this if shop data is structured differently
        }
    }, [promotion]);

    const handleSubmit = async (values) => {
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
                navigate('/shopProfile');
            } else {
                message.error(data.message);
            }
        } catch (error) {
            console.error('Error updating promotion:', error);
            message.error('An error occurred while updating the promotion.');
        }
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
                            <DatePicker value={startDate} onChange={(date) => setStartDate(date)} />
                        </Form.Item>
                        <Form.Item label="End Date" rules={[{ required: true }]}>
                            <DatePicker value={endDate} onChange={(date) => setEndDate(date)} />
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
                            <Button type="primary" htmlType="submit">Update Promotion</Button>
                        </Form.Item>
                    </Form>
                </Box>
            </Box>
        </Box>
    );
};

export default UpdatePromotion;
