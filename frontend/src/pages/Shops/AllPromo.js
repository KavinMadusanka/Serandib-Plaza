import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Typography, Modal, Tag, Button, Spin, Alert } from 'antd';
import { useAuth } from '../../context/auth';  
import { useNavigate } from 'react-router-dom';
import ShopHeader from '../../components/Layout/ShopHeader';
import ShopMenu from '../../components/Layout/ShopMenu';
import { Box } from '@mui/material';

const { Title, Paragraph } = Typography;

const AllPromo = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [auth] = useAuth();
    const navigate = useNavigate();

    // Fetch promotions for the logged-in shop
    const fetchPromotions = async () => {
        try {
            const { data } = await axios.get(`/api/v1/promotions/get-promotions-by-shop/${auth?.shopOwner?._id}`);
            if (data?.success) {
                setPromotions(data.promotions);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
            setError('Error fetching promotions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth?.shopOwner?._id) {
            fetchPromotions();
        }
    }, [auth]);

    // Handle promotion click
    const handlePromotionClick = (promotion) => {
        setSelectedPromotion(promotion);
        setIsModalVisible(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedPromotion(null);
    };

    // Navigate to the UpdatePromotions page with the selected promotion data
    const handleUpdatePromotion = () => {
        navigate('/updatePromotion', { state: { promotion: selectedPromotion } });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <ShopHeader />
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <ShopMenu />
                <Box sx={{ flexGrow: 1, padding: '20px' }}>
                    <Title level={2}>Promotions</Title>

                    {loading ? (
                        <Spin tip="Loading promotions..." />
                    ) : error ? (
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            showIcon
                        />
                    ) : (
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={promotions}
                            renderItem={promotion => (
                                <List.Item>
                                    <Card
                                        hoverable
                                        style={{
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            marginBottom: '20px',
                                        }}
                                        cover={
                                            <div style={{ position: 'relative' }}>
                                                <img
                                                    src={`/api/v1/promotions/promotion-image/${promotion._id}`}
                                                    alt={promotion.promotionTitle}
                                                    style={{
                                                        width: '100%',
                                                        height: '30rem',
                                                        objectFit: 'cover',
                                                        borderTopLeftRadius: '8px',
                                                        borderTopRightRadius: '8px',
                                                    }}
                                                />
                                                <Tag
                                                    color={promotion.isActive ? 'green' : 'red'}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        fontWeight: 'bold',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                    {promotion.isActive ? 'Active' : 'Inactive'}
                                                </Tag>
                                            </div>
                                        }
                                        onClick={() => handlePromotionClick(promotion)}
                                    >
                                        <div style={{ padding: '10px' }}>
                                            <Title level={4} style={{ marginBottom: '10px' }}>{promotion.promotionTitle}</Title>
                                            <Paragraph
                                                ellipsis={{ rows: 2 }}
                                                style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                                            >
                                                {promotion.promotionDescription}
                                            </Paragraph>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    )}

                    {/* Modal for displaying promotion details */}
                    {selectedPromotion && (
                        <Modal
                            title={selectedPromotion.promotionTitle}
                            visible={isModalVisible}
                            onCancel={handleCloseModal}
                            footer={[
                                <Button key="update" type="primary" onClick={handleUpdatePromotion}>
                                    Update Promotion
                                </Button>,
                                <Button key="close" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            ]}
                            width={700}
                            bodyStyle={{ padding: '20px' }}
                        >
                            <img
                                src={`/api/v1/promotions/promotion-image/${selectedPromotion._id}`}
                                alt={selectedPromotion.promotionTitle}
                                style={{ width: '100%', height: '30rem', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
                            />
                            <Paragraph>{selectedPromotion.promotionDescription}</Paragraph>
                            <Paragraph>
                                <strong>Discount:</strong> {selectedPromotion.discountValue} {selectedPromotion.discountType === 'percentage' ? '%' : '$'}
                            </Paragraph>
                            <Paragraph>
                                <strong>Valid From:</strong> {new Date(selectedPromotion.startDate).toLocaleDateString()} <strong>To:</strong> {new Date(selectedPromotion.endDate).toLocaleDateString()}
                            </Paragraph>
                            <Paragraph>
                                <strong>Promo Code:</strong> {selectedPromotion.promoCode}
                            </Paragraph>
                            <Paragraph>
                                <strong>Applicable Items:</strong> {selectedPromotion.applicableItems || 'All Items'}
                            </Paragraph>
                            {selectedPromotion.termsConditions && (
                                <Paragraph>
                                    <strong>Terms and Conditions:</strong> {selectedPromotion.termsConditions}
                                </Paragraph>
                            )}
                            <Tag color={selectedPromotion.isActive ? 'green' : 'red'} style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                {selectedPromotion.isActive ? 'Active' : 'Inactive'}
                            </Tag>
                        </Modal>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AllPromo;
