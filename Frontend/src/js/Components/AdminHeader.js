import {UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../../css/App.css';
import { useEffect, useState } from 'react';

function Header() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState({});

    const checkIfLoggedIn = async () => {
        const response = await authService.getCurrentUser();
        if (response.data != null) {
            setIsLoggedIn(true);
            console.log('User is logged in');
            setUser(response.data);
            console.log(response.data);
            console.log(user);
        }
        else {
            setIsLoggedIn(false);
            console.log('User is not logged in');
        }
    };


    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const handleLogout = async () => {
        const user = await authService.getCurrentUser();
        setIsLoggedIn(false);
        authService.logout();
        navigate('/login');
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };



    return (
        <div>
            <div className='header-bg'>
                <p className='header-logo' onClick={() => navigate('/')}>SNEAKERAMA</p>
                </div>
                <div className="header-menu-right">
                    {isLoggedIn ? (
                        <div
                            className="profile-dropdown-container"
                            tabIndex={0}
                            onBlur={closeDropdown}
                        >
                            <div
                                className="profile-dropdown-icon"
                                onClick={() => setShowDropdown((prev) => !prev)}
                            >
                                <UserOutlined className='header-menu-icon' />
                            </div>
                            {showDropdown && (
                                <div className="dropdown-content">
                                    <p onClick={handleLogout}>Logout</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <UserOutlined className='header-menu-icon' onClick={() => navigate('/login')} />
                    )}
                </div>
            </div>
    );
}

export default Header;
