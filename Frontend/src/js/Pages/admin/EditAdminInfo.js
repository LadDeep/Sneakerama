import React, { useState, useEffect } from 'react';
import classes from '../../../css/EditAdminInfo.module.css';
import Footer from '../../Components/AdminFooter';
import Header from '../../Components/AdminHeader';
import { useNavigate } from 'react-router-dom'; 
import { getAdminInfo, updateAdminInfo } from '../../../services/adminService';

const EditAdminInfo = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [adminInfo, setAdminInfo] = useState({
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        phoneNumber: '',
        email: ''
    });

    const formatDateForInput = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }    

    useEffect(() => {
        const fetchAdminInfo = async () => {
            const data = await getAdminInfo();
            data.admin[0].dateOfBirth = formatDateForInput(data.admin[0].dateOfBirth);
            setAdminInfo(data.admin[0]);
        }

        fetchAdminInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the form from reloading the page
        const response = await updateAdminInfo(adminInfo);
        if(response.success) {
            setPopupMessage(response.message);
            setShowPopup(true);
            const data = await getAdminInfo();
            data.admin[0].dateOfBirth = formatDateForInput(data.admin[0].dateOfBirth);
            setAdminInfo(data.admin[0]);
        } else {
            setPopupMessage(response.message);
            setShowPopup(true);
        }
    }

    const handleBackClick = () => {
        navigate('/admin/home');
    }

    return (
        <>
            <Header />
            <div className={classes.editAdminContainer}>
            <button onClick={handleBackClick} className={classes.backButton}>Back</button>
                <form onSubmit={handleSubmit} className={classes.formContainer}>
                    <h2>Admin Information</h2>
                        <div className={classes.inputGroup}>
                            <input type="text" name="firstName" value={adminInfo.firstName} onChange={handleInputChange} placeholder="First Name" />
                            <input type="text" name="lastName" value={adminInfo.lastName} onChange={handleInputChange} placeholder="Last Name" />
                        </div>
                        
                        <input type="date" name="dateOfBirth" value={adminInfo.dateOfBirth} onChange={handleInputChange} placeholder="Date of Birth" />

                        <select name="gender" value={adminInfo.gender} onChange={handleInputChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>

                        <div className={classes.inputGroup}>
                            <input type="text" name="addressLine1" value={adminInfo.addressLine1} onChange={handleInputChange} placeholder="Address Line 1" />
                            <input type="text" name="addressLine2" value={adminInfo.addressLine2} onChange={handleInputChange} placeholder="Address Line 2" />
                        </div>

                        <input type="text" name="city" value={adminInfo.city} onChange={handleInputChange} placeholder="City" />
                        <input type="text" name="state" value={adminInfo.state} onChange={handleInputChange} placeholder="State" />
                        <input type="text" name="country" value={adminInfo.country} onChange={handleInputChange} placeholder="Country" />

                        <div className={classes.inputGroup}>
                            <input type="tel" name="phoneNumber" value={adminInfo.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" />
                            <input type="email" name="email" value={adminInfo.email} onChange={handleInputChange} placeholder="Email" />
                        </div>
                    <button type="submit">Update</button>
                </form>
            </div>
            {showPopup && (
                <div className={classes.popup}>
                <div className={classes.popupcontent}>
                    <p>{popupMessage}</p>
                    <button className={classes.closebtn} onClick={() => setShowPopup(false)}>Close</button>
                </div>
            </div>
            )}
            <Footer />
        </>
    );
}

export default EditAdminInfo;
