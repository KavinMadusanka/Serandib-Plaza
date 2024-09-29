import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Layout from '../../components/Layout/Layout';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {} from '../../components/style/eventCalendar.css'

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
    // const [events] = useState([]);
    const [events] = useState([
        {
            title: 'Blood Donation Camp',
            start: new Date(2024, 9, 10), // Oct 10, 2024
            end: new Date(2024, 9, 10)
        },
        {
            title: 'Beach Cleanup Program',
            start: new Date(2024, 9, 20), // Oct 20, 2024
            end: new Date(2024, 9, 20)
        }
    ]);

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
                />
            </div>
        </Layout>
    );
};

export default EventCalendar;
