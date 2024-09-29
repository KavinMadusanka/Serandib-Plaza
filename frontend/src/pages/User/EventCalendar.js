import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Layout from '../../components/Layout/Layout';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {} from '../../components/style/eventCalendar.css';
// import Modal from 'react-modal';
import { Card, List, Typography, Modal, Tag } from 'antd';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // For the event clicked
    const [isModalOpen, setIsModalOpen] = useState(false);    // To manage modal visibility

    // Fetch events from MongoDB
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');  // Assuming the API route is /api/events
                const formattedEvents = response.data.map(event => ({
                    ...event,
                    start: new Date(event.start), // Convert to Date object
                    end: new Date(event.end),     // Convert to Date object
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    // Function to handle event click
    const handleEventClick = (event) => {
        setSelectedEvent(event); // Set the clicked event as selected
        setIsModalOpen(true);    // Open the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <Layout>
            <div className="calendar-container">
                <div className='UPevents'>
                <h2>Upcoming Events</h2>
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
            {/* Modal for displaying event details */}
            
        </Layout>
    );
};

export default EventCalendar;
