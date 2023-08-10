import { HeartOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../../css/App.css';
import { useEffect, useState } from 'react';
import Cart from './Cart';
import { ToastContainer,toast } from 'react-toastify';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
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

    // call a function when the page loads

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const handleLogout = async () => {
        const user = await authService.getCurrentUser();
        setIsLoggedIn(false);
        authService.logout();
        navigate('/');
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };


    return (
        <div>
            <div className='header-bg'>
                <div className='profile-dropdown-container'
                    tabIndex={0}
                    onBlur={closeMenu} >
                    <div
                        onClick={() => setShowMenu((prev) => !prev)}
                    >
                        <MenuOutlined className='header-menu-hum-icon' />
                    </div>
                </div>
                <p className='header-logo'>SNEAKERAMA</p>
                <h2>Admin Panel</h2>
                <div className="header-menu-right">
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
                </div>

            </div>
        </div>
    );
}

export default Header;
