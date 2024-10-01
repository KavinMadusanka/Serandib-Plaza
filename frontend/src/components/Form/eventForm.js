import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';
import {} from '../style/EventForm.css'

const EventForm = () => { // Updated the component name to start with an uppercase letter
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");

    const handleFullNameChange = (e) => {
        const input = e.target.value;
        const regex = /^[A-Za-z.\s]*$/; // Allow only letters, spaces, and periods
        if (regex.test(input)) {
            setFullName(input);
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (phoneNumber.length !== 10) {
                toast.error("Contact number must be 10 characters long");
                return;
            }
            const res = await axios.post("/api/v1/appointment/appointment1", {
                fullName,
                address,
                phoneNumber,
                email,
                selectedDate,
                selectedTime,
                userId,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/myappointments');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}> {/* Corrected the onSubmit function */}
                <div className="container py-0">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Add New Event</h5>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Event Title :</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={handleFullNameChange}
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Venue :</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phoneNumber">Phone Number:</label>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                const newValue = e.target.value.replace(/[^\d]/g, '');
                                                setPhoneNumber(newValue);
                                            }}
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                    </div>

                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ paddingRight: '2%' }}>
                                                    <div className="form-group">
                                                        <label htmlFor="selectedDate">Select Date:</label>
                                                        <input
                                                            type="date"
                                                            value={selectedDate}
                                                            onChange={(e) => setSelectedDate(e.target.value.split('T')[0])}
                                                            min={getTodayDate()}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <label htmlFor="selectedTime">Select Time:</label>
                                                        <input
                                                            type="time"
                                                            value={selectedTime}
                                                            onChange={(e) => setSelectedTime(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EventForm; // Ensure the export matches the updated component name
