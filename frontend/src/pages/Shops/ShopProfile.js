import React from 'react';
//import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../context/auth';


const ShopProfile = () => {
    const [auth] = useAuth();

    return (
       
            <div className='profile'>
                <h1>{auth?.shopOwner?.shopname} </h1>
                {/* <h1><strong>Shop Name:</strong> {auth?.shopOwner?.shopname}</h1> */}
                <h2>Owner Details</h2>
                <p><strong>Owner Name:</strong> {auth?.shopOwner?.fullname}</p>
                <p><strong>Owner Email:</strong> {auth?.shopOwner?.owner_email}</p>
                <p><strong>Owner Contact Number:</strong> {auth?.shopOwner?.owner_contact}</p>
                <p><strong>Owner NIC:</strong> {auth?.shopOwner?.nic}</p>
                <p><strong>Business Registration Number:</strong> {auth?.shopOwner?.businessregno}</p>
                <p><strong>Tax ID Number:</strong> {auth?.shopOwner?.tax_id_no}</p>

                <h2>Shop Details</h2>
                <p><strong>Email:</strong> {auth?.shopOwner?.email}</p>
                <p><strong>Contact Number:</strong> {auth?.shopOwner?.shopcontact}</p>
                <p><strong>Business Type:</strong> {auth?.shopOwner?.businesstype}</p>
                <p><strong>Category:</strong> {auth?.shopOwner?.category}</p>
                <p><strong>Description:</strong> {auth?.shopOwner?.description}</p>
                <p><strong>Operating Hours:</strong> {auth?.shopOwner?.operating_hrs_from} - {auth?.shopOwner?.operating_hrs_to}</p>
                <p><strong>Location:</strong> {auth?.shopOwner?.shoplocation}</p>
            </div>
       
    );
};

export default ShopProfile;
