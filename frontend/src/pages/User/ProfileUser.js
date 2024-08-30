import React from 'react';
//import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../context/auth';
import Layout from '../../components/Layout/Layout';

const ProfileUser = () => {
    const [auth] = useAuth();

    return (
        <Layout title="User Profile">
            <div className='profile'>
                <h1>User Profile</h1>
                <p><strong>Full Name:</strong> {auth?.user?.fullname}</p>
                <p><strong>Email:</strong> {auth?.user?.email}</p>
                <p><strong>Date of Birth:</strong> {auth?.user?.dob}</p>
                <p><strong>Phone:</strong> {auth?.user?.phone}</p>
                <p><strong>Address:</strong> {auth?.user?.address}</p>
                <p><strong>Shopping Preferences:</strong> {auth?.user?.shoppingPreference?.join(", ")}</p>
            </div>
        </Layout>
    );
};

export default ProfileUser;
