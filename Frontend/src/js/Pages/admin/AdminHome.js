import React, { useState, useEffect } from 'react';
import classes from '../../../css/AdminHome.module.css';
import Footer from '../../Components/AdminFooter';
import Header from '../../Components/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement, Legend} from 'chart.js';
import {getPendingSellers, getTotalSellers, getVerifiedSellers, getUnVerifiedSellers, verifySeller} from '../../../services/adminService';
Chart.register(ArcElement, Legend);


const AdminHome = () => {
    const [sellers, setSellers] = useState(0);
    const [verifiedsellers, setVerifiedSellers] = useState(0);
    const [unverifiedsellers, setUnVerifiedSellers] = useState(0);
    const [sellerdata, setSellerData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const getTotalSeller = async () => {
          const totalseller = await getTotalSellers();
          setSellers(totalseller.count);
        }
    
        getTotalSeller();
      }, []);

    useEffect(() => {
        const getUnverifiedSeller = async () => {
          const totalUnverified = await getUnVerifiedSellers();
          setUnVerifiedSellers(totalUnverified.count);
        }
    
        getUnverifiedSeller();
      }, []);

      const pieOptions = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom', 
                labels: {
                    color: 'black',
                    font: {
                        size: 14
                    }
                }
            }
        },
        layout: {
            padding: {
                left: 20,  
                right: 20
            }
        }
    };
    
    useEffect(() => {
        const getVerifiedSeller = async () => {
          const totalVerified = await getVerifiedSellers();
          setVerifiedSellers(totalVerified.count);
        }
    
        getVerifiedSeller();
      }, []);
    
    useEffect(() => {
        const getSellerData = async () => {
          const sellerInfo = await getPendingSellers();
          setSellerData(sellerInfo.seller);
        }
    
        getSellerData();
      }, []);

      const goToEdit = () => {
        navigate('/admin/edit-information');
      }

      const approveSeller = async(sellerId) => {
        const result = await verifySeller(sellerId);
        if(result.success){
            setPopupMessage(result.message);
            setShowPopup(true);
            const sellerInfo = await getPendingSellers();
            setSellerData(sellerInfo.seller);
        }else{
            setPopupMessage(result.message);
            setShowPopup(true);
        } 
    }
    

    return (
        <>
      <Header />
        <div className={classes.adminHomeContainer}>
        <button className={classes.editAdminButton} onClick={() => goToEdit()}>Admin Information</button>
            <div className={classes.graphsContainer}>
                <div className={classes.graph}>
                    <h3>Total Registered Sellers</h3>
                    <p>{sellers}</p>
                </div>
                <div className={classes.graph}>
                    <Pie 
                        data={{
                            labels: ['Verified Dealers', 'Unverified Dealers'],
                            datasets: [{
                                data: [verifiedsellers, unverifiedsellers],
                                backgroundColor: ['#4CAF50', '#FFC107']
                            }]
                        }}
                        options={pieOptions}
                    />
                </div>
                <div className={classes.graph}>
                    <h3>Number of Verified Sellers</h3>
                    <p>{verifiedsellers}</p>
                </div>
            </div>
            <div className={classes.tableContainer}>
                <h2>Pending Seller List</h2>
                <table className={classes.Sellertable}>
                    <thead>
                        <tr>
                            <th className={classes.selth}>Seller Name</th>
                            <th className={classes.selth}>Address</th>
                            <th className={classes.selth}>Email</th>
                            <th className={classes.selth}>Phone Number</th>
                            <th className={classes.selth}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sellerdata.map(seller => (
                            <tr key={seller._id}>
                                <td className={classes.seltd}>{`${seller.firstName} ${seller.lastName}`}</td>
                                <td className={classes.seltd}>{`${seller.addressLine1}, ${seller.city}, ${seller.state}`}</td>
                                <td className={classes.seltd}>{seller.email}</td>
                                <td className={classes.seltd}>{seller.phoneNumber}</td>
                                <td className={classes.seltd}>
                                    <button 
                                        className={classes.approveButton}
                                        onClick={() => approveSeller(seller._id)}
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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

export default AdminHome;
