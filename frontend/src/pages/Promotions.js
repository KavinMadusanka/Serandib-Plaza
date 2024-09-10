import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Typography, Modal, Tag } from 'antd';
import Layout from '../components/Layout/Layout';

const { Title, Paragraph, Text } = Typography;

const AllPromotions = ({ shopId }) => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fetch promotions for a specific shop
    const fetchPromotions = async () => {
        try {
            const { data } = await axios.get(`/api/v1/promotions/get-promotions`);
            if (data?.success) {
                setPromotions(data.promotions);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPromotions();
    }, [shopId]);

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

    return (
        <Layout>
            <div className="all-promotions-container" style={{ padding: '20px' }}>
                <Title level={1} style={{ textAlign: 'center', marginBottom: '30px' }}>Promotions</Title>
                <Title level={4} style={{ textAlign: 'center', marginBottom: '30px' }}>We love promotions and it
                     appears you do too! Which is why we have a lot planned for the coming months.<br/>
Discounts,free gifts – just to name a few.</Title>
                
                {loading ? (
                    <p>Loading promotions...</p>
                ) : (
                    <List
                        grid={{ gutter: 16, column: 3 }} // Display 3 promotions in one row
                        dataSource={promotions}
                        renderItem={promotion => (
                            <List.Item>
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        marginBottom: '20px',
                                        width: '80%',
                                        margin:'0 auto'
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
                                    onClick={() => handlePromotionClick(promotion)} // Handle click event
                                >
                                    <div style={{ padding: '10px' }}>
                                        {/* Display promotion title and description */}
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
                        footer={null}
                        width={700} // Optional: Adjust modal width
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
            </div>
        </Layout>
    );
};

export default AllPromotions;
