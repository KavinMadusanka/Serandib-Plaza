import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {} from '../../components/style/eventCalendar.css';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import AdminMenu from '../../components/Layout/AdminMenu';
import dayjs from 'dayjs';  // Import dayjs for date formatting
import Header1 from '../../components/Layout/Header1';
import { Modal } from 'antd';
import { useAuth } from '../../context/auth';

const localizer = momentLocalizer(moment);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // For the event clicked
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/v1/Event/getAllEvents');  // Assuming the API route is /api/events
            const formattedEvents = response.data.events.map(events => ({
                ...events,
                start: new Date(events.startDate), // Convert to Date object
                end: new Date(events.endDate),     // Convert to Date object
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
    fetchEventImage(event._id);
};

// Function to close the modal
const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setEventImage(null);
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header1/>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <AdminMenu />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            {/* <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: 'center', marginBottom: 3 }}
            >
              Upcoming Events
            </Typography> */}
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
                    // onClick={() => handleEventClick(events)}
                />
            </div>
            {/* Modal for displaying event details */}
            {selectedEvent && (
            <div>
            <Modal
                // isOpen={isModalOpen}
                // onRequestClose={closeModal}
                visible={isModalOpen}
                onCancel={closeModal}
                contentLabel="Event Details"
                className="event-modal"
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
                          <div className='Imagebox' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            </div>
            )}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
