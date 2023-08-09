import React from 'react';
import classes from '../../../css/AdminHome.module.css';
import Footer from '../../Components/AdminFooter';
import Header from '../../Components/AdminHeader';

const AdminHome = () => {
    return (
        <>
      <Header />
        <div className={classes.adminHomeContainer}>
            <div className={classes.graphsContainer}>
                <div className={classes.graph}>
                    {/* Your first graph goes here */}
                </div>
                <div className={classes.graph}>
                    {/* Your second graph goes here */}
                </div>
                <div className={classes.graph}>
                    {/* Your third graph goes here */}
                </div>
            </div>
            <div className={classes.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Seller Name</th>
                            <th>Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* This could be dynamic depending on where your data comes from */}
                        <tr>
                            <td>John Doe</td>
                            <td>More details about John Doe</td>
                            <td>
                                <button className={classes.approveButton}>Approve</button>
                            </td>
                        </tr>
                        {/* More rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer />
    </>
    );
}

export default AdminHome;
