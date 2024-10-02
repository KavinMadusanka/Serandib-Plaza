import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Tag, List, Modal, Input } from 'antd'; // Import Input component from Ant Design
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Layout from '../components/Layout/Layout';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Title, Paragraph, Text } = Typography;

const Promotions = ({ shopId }) => {
    const [promotions, setPromotions] = useState([]);
    const [filteredPromotions, setFilteredPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State to track search query

    // Fetch promotions for a specific shop
    const fetchPromotions = async () => {
        try {
            const { data } = await axios.get(`/api/v1/promotions/get-promotions`);
            if (data?.success) {
                setPromotions(data.promotions);
                setFilteredPromotions(data.promotions); // Initially, set filtered promotions to all promotions
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

    // Custom arrow components for the slider
    const NextArrow = ({ onClick }) => (
        <div className="slick-arrow slick-next" onClick={onClick} style={{ right: '-15px', zIndex: 1 }}>
            <RightOutlined style={{ fontSize: '30px', color: '#333' }} />
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div className="slick-arrow slick-prev" onClick={onClick} style={{ left: '-15px', zIndex: 1 }}>
            <LeftOutlined style={{ fontSize: '30px', color: '#333' }} />
        </div>
    );

    // Slider settings for the promotion card slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Format date for the promotion card
    const formatCalendarDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options).split(' ');
    };

    // Filter promotions based on the search query
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setFilteredPromotions(promotions); // Reset to all promotions when query is cleared
        } else {
            setFilteredPromotions(
                promotions.filter((promotion) =>
                    promotion.shop?.shopname?.toLowerCase().includes(query)
                )
            );
        }
    };

    return (
        <Layout>
            <div className="all-promotions-container" style={{ padding: '20px', backgroundColor: "#ffffff" }}>
                <Text style={{ display: 'block', textAlign: 'center', marginBottom: '5px', fontFamily: 'Poppins, sans-serif', color: '#333', fontSize: '30px' }}>
                    Promotions
                </Text>
                <Title style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'Poppins, sans-serif', fontSize: '18px' }}>
                    Explore our exclusive promotions! Discounts, free gifts, and much more.
                </Title>

                {/* Search Input */}
                <Input.Search
                    placeholder="Search by shop name"
                    enterButton
                    style={{ maxWidth: '400px', margin: '20px auto', display: 'block' }}
                    onChange={handleSearch}
                    value={searchQuery}
                />

                {loading ? (
                    <p>Loading promotions...</p>
                ) : (
                    <>
                        {/* Conditionally render the slider only when there's no search query */}
                        {searchQuery === '' && (
                            <Slider {...settings}>
                                {promotions.map(promotion => (
                                    <div key={promotion._id}>
                                        <Card
                                            hoverable
                                            style={{
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                marginBottom: '20px',
                                                padding: '20px',
                                                backgroundColor: '#f9f9f9',
                                                width: '90%',
                                                margin: '0 auto',
                                            }}
                                        >
                                            {/* Promotion Image */}
                                            <img
                                                src={`/api/v1/promotions/promotion-image/${promotion._id}`}
                                                alt={promotion.promotionTitle}
                                                style={{
                                                    width: '100%',
                                                    height: '350px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    marginBottom: '20px',
                                                }}
                                            />
                                        </Card>
                                    </div>
                                ))}
                            </Slider>
                        )}

                        <br /><br />

                        {/* List of filtered promotions */}
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={filteredPromotions}
                            renderItem={promotion => {
                                const [month, day] = formatCalendarDate(promotion.startDate);
                                return (
                                    <List.Item>
                                        <Card
                                            hoverable
                                            style={{
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                marginBottom: '20px',
                                                width: '80%',
                                                margin: '0 auto'
                                            }}
                                            onClick={() => handlePromotionClick(promotion)}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                {/* Calendar-like date box */}
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        width: '80px',
                                                        height: '100px',
                                                        border: '1px solid #ddd',
                                                        borderRadius: '8px',
                                                        marginRight: '15px',
                                                        backgroundColor: '#f5f5f5'
                                                    }}
                                                >
                                                    <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>{day}</Text>
                                                    <Text style={{ fontSize: '14px' }}>{month}</Text>
                                                </div>

                                                {/* Promotion Image */}
                                                <img
                                                    src={`/api/v1/promotions/promotion-image/${promotion._id}`}
                                                    alt={promotion.promotionTitle}
                                                    style={{
                                                        width: '150px',
                                                        height: '150px',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        border: '1px solid #ddd'
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

                                            <div style={{ padding: '10px', textAlign: 'center' }}>
                                                <Title level={4} style={{ marginBottom: '10px' }}>{promotion.promotionTitle}</Title>
                                                <Paragraph><strong>{promotion.shop?.shopname || 'Unknown Shop'}</strong></Paragraph>
                                                <Paragraph
                                                    ellipsis={{ rows: 2 }}
                                                    style={{ color: 'rgba(0, 0, 0, 0.65)' }}
                                                >
                                                    {promotion.promotionDescription}
                                                </Paragraph>
                                            </div>
                                        </Card>
                                    </List.Item>
                                );
                            }}
                        />
                    </>
                )}

                {/* Modal for promotion details */}
                {selectedPromotion && (
                    <Modal
                        title={selectedPromotion.promotionTitle}
                        visible={isModalVisible}
                        onCancel={handleCloseModal}
                        footer={null}
                    >
                        <img
                            src={`/api/v1/promotions/promotion-image/${selectedPromotion._id}`}
                            alt={selectedPromotion.promotionTitle}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                marginBottom: '20px',
                            }}
                        />
                        <Paragraph>{selectedPromotion.promotionDescription}</Paragraph>
                        <Text><strong>Applicable Items:</strong> {selectedPromotion.applicableItems || 'All Items'}</Text><br/>
                        <Text><strong>Discount:</strong> {selectedPromotion.discountValue} {selectedPromotion.discountType === 'percentage' ? '%' : 'Rs'}</Text><br/>
                        <Text><strong>Start Date:</strong> {new Date(selectedPromotion.startDate).toLocaleDateString()}</Text><br />
                        <Text><strong>End Date:</strong> {new Date(selectedPromotion.endDate).toLocaleDateString()}</Text><br />
                        <Text><strong>Terms and Conditions:</strong> {selectedPromotion.termsConditions}</Text><br/>
                        <Text><strong>Status:</strong> {selectedPromotion.isActive ? 'Active' : 'Inactive'}</Text><br />
                    </Modal>
                )}
            </div>
        </Layout>
    );
};

export default Promotions;
