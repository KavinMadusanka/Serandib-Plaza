import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Layout from '../../components/Layout/Layout';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {} from '../../components/style/eventCalendar.css';
import { useAuth } from '../../context/auth';
// import Modal from 'react-modal';
import { Card, List, Typography, Modal, Tag } from 'antd';

const { Title, Paragraph, Text } = Typography;

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // For the event clicked
    const [isModalOpen, setIsModalOpen] = useState(false);    // To manage modal visibility
    const [auth,setAuth] = useAuth();
    const [email, setEmail] = useState("");
    const [eventImage, setEventImage] = useState(null);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Fetch event image
    const fetchEventImage = async (eventId) => {
        try {
            const response = await axios.get(`/api/v1/Event/getAllEvents-photo/${eventId}`, {
                responseType: 'blob',
            });
            const imageUrl = URL.createObjectURL(response.data);
            setEventImage(imageUrl);
        } catch (error) {
            console.error('Error fetching event image:', error);
        }
    };
  
    useEffect(() => {
        if (selectedEvent && selectedEvent._id) {
            fetchEventImage(selectedEvent._id);
        }
    }, [selectedEvent]);

    useEffect(() => {
        if (auth && auth.user) {
          setEmail(auth.user.email);
        }
      }, [auth]);

    // Fetch events from MongoDB
    // useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/v1/Event/getAllEvents');  // Assuming the API route is /api/events
                const formattedEvents = response.data.events.map(event => ({
                    ...event,
                    start: new Date(event.startDate), // Convert to Date object
                    end: new Date(event.endDate),     // Convert to Date object
                }));
                setEvents(formattedEvents);
                fetchEvents();
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        
    // }, []);

    useEffect(() => {
        fetchEvents();
      }, []);
      

    // Function to handle event click
    const handleEventClick = (event) => {
        setSelectedEvent(event); // Set the clicked event as selected
        setIsModalOpen(true);    // Open the modal
        fetchEventImage(event._id);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setEventImage(null);
    };

    return (
        <Layout>
            <div className="calendar-container">
                <div className='UPevents'>
                <h2>Upcoming Events</h2>
                </div>
                <div className='ttttt'>
                    <Title level={5} style={{ textAlign: 'center', marginBottom: '30px' }}>Exciting events are coming your way with exclusive offers and fun activities!<br />
                    Stay tuned for giveaways and special surprises!</Title>
                </div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    onSelectEvent={handleEventClick} // Event click handler
                />
            </div>
            <div className="contactS">
                <h2>Call/ E-mail for event bookings</h2>
                <div className="contactO">
                    <div className="contactItem">
                    <span role="img" aria-label="phone">📞</span> 
                    <a href="tel:+94764886616">+94 112 590 575</a>
                    </div>
                    <div className="contactItem">
                    <span role="img" aria-label="email">📧</span> 
                    <a href="mailto:mall@serendibplaza.com">mall@serendibplaza.com</a>
                    </div>
                </div>
            </div>
            {/* Modal for displaying event details */}
            <Modal
                // isOpen={isModalOpen}
                // onRequestClose={closeModal}
                visible={isModalOpen}
                onCancel={closeModal}
                contentLabel="Event Details"
                className="event-modal"
                footer={null}
            >
                {selectedEvent && (
                    <div className="event-details">
                        <h2>{selectedEvent.title}</h2>
                        <p>
                            <strong>Start Date : </strong> { formatDate(selectedEvent.startDate)} -
                            <strong> End Date : </strong> { formatDate(selectedEvent.endDate)}
                        </p>
                        <p>
                            <strong>Start Time : </strong>{selectedEvent.startTime} -
                            <strong> End Time : </strong>{selectedEvent.endTime}
                        </p>
                        {selectedEvent.venue && (
                            <p><strong>Venue:</strong> {selectedEvent.venue}</p>
                        )}
                        {/* Display image when event have image  */}
                        {eventImage && (
                          <div className='Imagebox' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}>
                            <img
                              src={eventImage}
                              alt={selectedEvent.title}
                              className="event-image"
                              style={{ maxWidth: '100%', height: '300px' }}
                            />
                          </div>
                        )}
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default EventCalendar;
