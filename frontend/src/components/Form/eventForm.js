import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';
import {} from '../style/EventForm.css'

const EventForm = () => { // Updated the component name to start with an uppercase letter
    const [title, setTitle] = useState("");
    const [venue, setVenue] = useState("");
    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [image,setImage] = useState("");
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth && auth.user) {
            setEmail(auth.user.email);
        }
      }, [auth]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const NewEvent = new FormData();
            NewEvent.append("title", title);
            NewEvent.append("venue", venue);
            NewEvent.append("email", email);
            NewEvent.append("startDate", startDate);
            NewEvent.append("endDate", endDate);
            NewEvent.append("startTime", startTime);
            NewEvent.append("endTime", endTime);
            NewEvent.append("image", image);
            const res = await axios.post("/api/v1/Event/addNewEvent", NewEvent);
            if(res?.success){
                toast.success(res.message);
                setTitle('');
                setEmail('');
                setStartDate('');
                setEndDate('');
                setStartTime('');
                setEndTime('');
                setImage(null);
              }
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/EventAdmin');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong adding new event');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="containerF">
                    <div className="row d-flex justify-content-start my-4"> {/* Removed padding and centered alignment */}
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header">
                                    <h5 className="mb-0">Add New Event</h5>
                                </div>
                                <div className="card-body">
                                    <div className="form">
                                        <label htmlFor="fullName">Event Title :</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter event title"
                                            onKeyPress={handleKeyPress}
                                            required
                                        />
                                    </div>

                                    <div className="form">
                                        <label htmlFor="venue">Venue :</label>
                                        <input
                                            type="text"
                                            value={venue}
                                            onChange={(e) => setVenue(e.target.value)}
                                            placeholder="Enter event venue"
                                            required
                                        />
                                    </div>

                                    {/* Photo Upload */}
                                    <div className='uploadbox'>
                                        <label className="btn btn-outline-secondary col-md-12">
                                            {image ? image.name : "Upload Photo"}
                                            <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files[0])}
                                                hidden
                                            />
                                        </label>
                                    </div>
                                    {/* Display Uploaded Photo */}
                                    <div>
                                        {image && (
                                            <div className="text-start"> {/* Align the image to the left */}
                                                <img src={URL.createObjectURL(image)} alt="Event Image" height={"200px"} className="img img-responsive" />
                                            </div>
                                        )}
                                    </div>

                                    <table style={{ width: '100%' }}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="formDate">
                                                        <label htmlFor="startDate">Select Start Date:</label>
                                                        <input
                                                            type="date"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value.split('T')[0])}
                                                            min={getTodayDate()}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="formDate">
                                                        <label htmlFor="endDate">Select End Date:</label>
                                                        <input
                                                            type="date"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value.split('T')[0])}
                                                            min={getTodayDate()}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="formTime">
                                                        <label htmlFor="startTime">Select Start Time:</label>
                                                        <input
                                                            type="time"
                                                            value={startTime}
                                                            onChange={(e) => setStartTime(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="formTime">
                                                        <label htmlFor="endTime">Select End Time:</label>
                                                        <input
                                                            type="time"
                                                            value={endTime}
                                                            onChange={(e) => setEndTime(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="btnsubb">
                                    <button type="submit">Add Event</button>
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
