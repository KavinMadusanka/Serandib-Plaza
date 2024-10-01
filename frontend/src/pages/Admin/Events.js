import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {} from '../../components/style/eventCalendar.css';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import AdminMenu from '../../components/Layout/AdminMenu';
import dayjs from 'dayjs';  // Import dayjs for date formatting
import Header1 from '../../components/Layout/Header1';
import { Modal,Typography } from 'antd';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

import EventForm from '../../components/Form/eventForm';


const { Title, Paragraph, Text } = Typography;

const localizer = momentLocalizer(moment);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // For the event clicked
  const [selectedEventUpdate, setSelectedEventUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auth,setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [eventImage, setEventImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [image,setImage] = useState("");



  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  };

  // Function to handle modal visibility and content
  const handleModal = (content) => {
    setVisible(true);
    setModalContent(content);
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
            const formattedEvents = response.data.events.map(events => ({
                ...events,
                start: new Date(events.startDate), // Convert to Date object
                end: new Date(events.endDate),     // Convert to Date object
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

    // Handle delete card details
const handleDeleteItem = async (_id) => {
  const confirmed = window.confirm("Are you sure you want to remove this Item?");
  if (confirmed) {
    try {
      const { data } = await axios.delete(`/api/v1/Event/delete-event/${_id}`);
      if (data.success) {
        toast.success('Item Removed successfully');
      } else {
        toast.error(data.message);
      }
      closeModal();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
};

const handleEventUpdate = (event) => {
  setSelectedEventUpdate(event); // Set the clicked event as selected
  setIsModalOpen(true);    // Open the modal
  fetchEventImage(event._id);
};

// update product function
const handleUpdate = async (e) => {
  e.preventDefault()
  try {
    const UpdateEvent = new FormData();
    UpdateEvent.append("title", title);
    UpdateEvent.append("venue", venue);
    UpdateEvent.append("email", email);
    UpdateEvent.append("startDate", startDate);
    UpdateEvent.append("endDate", endDate);
    UpdateEvent.append("startTime", startTime);
    UpdateEvent.append("endTime", endTime);
    UpdateEvent.append("image", image);
    const {data} = await axios.put(`/api/v1/Event/update-event/${selectedEventUpdate._id}`, UpdateEvent);
      if(data?.success){
          toast.success('Event Updated Successfully')

      } else{
          toast.error(data?.message);
      }
  } catch (error) {
      console.log(error)
      toast.error('something went wrong')
  }
};

//only gets alpherbatds
const handleKeyPress = (event) => {
  const regex = /^[a-zA-Z\s]*$/;
  if(!regex.test(event.key)){
  event.preventDefault();
  }
};
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
                  <div className="p-2 m-2 d-flex justify-content-between" >
                    <div className='UPevents' style={{ flex: 1, textAlign: 'center' }}>
                      <h2>Upcoming Events</h2>
                      <div className='ttttt'>
                        <Title level={5} style={{ textAlign: 'center', marginBottom: '30px' }}>Exciting events are coming your way with exclusive offers and fun activities!<br />
                        Stay tuned for giveaways and special surprises!</Title>
                      </div>
                    </div>
                    <div className='eventbut'>
                      <button onClick={() => { handleModal(<EventForm />);}}>Add Event</button>
                    </div>
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
                        <div>
                          <button className='btn btn-danger' onClick={() => { handleDeleteItem(selectedEvent._id);}}>
                            Remove event
                          </button>
                          {/* <button className='btnsubb' onClick={() => { handleEventUpdate(selectedEvent);}}>
                            Update event
                          </button> */}
                        </div>
                    </div>
                )}
            </Modal>
            </div>
            )}
              <Modal
                onCancel={() => setVisible(false)}
                footer={null}
                visible={visible}>
                {modalContent}
              </Modal> 
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
