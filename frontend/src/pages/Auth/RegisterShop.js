import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const RegisterShop = () => {
  const [fullname, setFullName] = useState('');
  const [owner_email, setOwnerEmail] = useState('');
  const [owner_contact, setOwnerContact] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNIC] = useState('');
  const [businessregno, setBusinessRegNo] = useState('');
  const [tax_id_no, setTax_ID_No] = useState('');
  const [shopname, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [businesstype, setBusinessType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [operating_hrs_from, setOpen] = useState('');
  const [operating_hrs_to, setClose] = useState('');
  const [shoplocation, setShopLocation] = useState('');
  const [shopcontact, setContact] = useState('');
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('api/v1/userauth/shopregister', {
        fullname,
        owner_email,
        owner_contact,
        password,
        nic,
        businessregno,
        tax_id_no,
        shopname,
        email,
        businesstype,
        category,
        description,
        operating_hrs_from,
        operating_hrs_to,
        shoplocation,
        shopcontact,
      });
      if (res && res.data.success) {
        toast.success('Registered successfully, Please Login');
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title="Shop Registration">
      <div className="register">
        <h1>Shop Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="FullName" className="form-label">
              Shop Owner Full Name
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="form-control"
              id="FullName"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="OwnerEmail" className="form-label">
              Owner Email
            </label>
            <input
              type="email"
              value={owner_email}
              onChange={(e) => setOwnerEmail(e.target.value)}
              className="form-control"
              id="OwnerEmail"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="OwnerContact" className="form-label">
              Shop Owner Contact Number
            </label>
            <input
              type="text"
              value={owner_contact}
              onChange={(e) => setOwnerContact(e.target.value)}
              className="form-control"
              id="OwnerContact"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="Password"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="NIC" className="form-label">
              NIC
            </label>
            <input
              type="text"
              value={nic}
              onChange={(e) => setNIC(e.target.value)}
              className="form-control"
              id="NIC"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="BusinessRegNo" className="form-label">
              Business Registration No
            </label>
            <input
              type="text"
              value={businessregno}
              onChange={(e) => setBusinessRegNo(e.target.value)}
              className="form-control"
              id="BusinessRegNo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="TaxIDNo" className="form-label">
              Tax ID No
            </label>
            <input
              type="text"
              value={tax_id_no}
              onChange={(e) => setTax_ID_No(e.target.value)}
              className="form-control"
              id="TaxIDNo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ShopName" className="form-label">
              Shop Name
            </label>
            <input
              type="text"
              value={shopname}
              onChange={(e) => setShopName(e.target.value)}
              className="form-control"
              id="ShopName"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="Email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="BusinessType" className="form-label">
              Business Type
            </label>
            <input
              type="text"
              value={businesstype}
              onChange={(e) => setBusinessType(e.target.value)}
              className="form-control"
              id="BusinessType"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Category" className="form-label">
              Business Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
              id="Category"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="Description"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="OperatingHrsFrom" className="form-label">
              Open From
            </label>
            <input
              type="time"
              value={operating_hrs_from}
              onChange={(e) => setOpen(e.target.value)}
              className="form-control"
              id="OperatingHrsFrom"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="OperatingHrsTo" className="form-label">
              Close At
            </label>
            <input
              type="time"
              value={operating_hrs_to}
              onChange={(e) => setClose(e.target.value)}
              className="form-control"
              id="OperatingHrsTo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ShopLocation" className="form-label">
              Shop Location
            </label>
            <input
              type="text"
              value={shoplocation}
              onChange={(e) => setShopLocation(e.target.value)}
              className="form-control"
              id="ShopLocation"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ShopContact" className="form-label">
              Shop Contact Number
            </label>
            <input
              type="text"
              value={shopcontact}
              onChange={(e) => setContact(e.target.value)}
              className="form-control"
              id="ShopContact"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Toaster />
      </div>
    </Layout>
  );
};

export default RegisterShop;
