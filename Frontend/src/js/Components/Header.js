import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import '../../css/App.css';
import { useEffect, useState } from 'react';
import Cart from './Cart';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [showDropdown, setShowDropdown] = useState(false); 
    const [user, setUser] = useState({}); 

    const checkIfLoggedIn = async () => {
        const response = await authService.getCurrentUser();
        if (response.data!=null) {
            setIsLoggedIn(true);
            console.log('User is logged in');
            setUser(response.data);
            console.log(response.data);
            console.log(user);
        }
        else{
            setIsLoggedIn(false);
            console.log('User is not logged in');
        }
    };

    // call a function when the page loads

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    const handleLogout = async () => {
        const user=await authService.getCurrentUser();
        //send cart and wishlist details to the database
        console.log(user);
        const response=await authService.pushCartAndWishlistToDatabase(user)
        console.log(response);

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
                <div className='header-menu'>
                    <p className='header-menu-item'>NEW ARRIVALS</p>
                    <p className='header-menu-item'>MEN'S</p>
                    <p className='header-menu-item'>WOMEN'S</p>
                    <p className='header-menu-item'>KIDS'</p>
                    <p className='header-menu-item'>ORDERS</p>
                    <p className={location.pathname === "/events" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/events')}>EVENTS</p>
                    <p className={location.pathname === "/reviews" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/reviews')}>REVIEWS</p>
                    <p className={location.pathname === "/contact" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/contact')}>CONTACT</p>
                    <p className={location.pathname === "/faq" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/faq')}>FAQ</p>
                </div>
                <div className="header-menu-right">
                    <HeartOutlined className='header-menu-icon' onClick={() => {
                        navigate('/wishlist')
                    }} />
                    <ShoppingCartOutlined className='header-menu-icon' onClick={() => {
                        document.body.style.overflow = 'hidden'
                        setIsCartOpen(true)
                    }} />
                    {/* Show dropdown when the user is logged in */}
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
                                    <p onClick={() => navigate('/editprofile')}>Edit Profile</p>
                                    <p onClick={handleLogout}>Logout</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <UserOutlined className='header-menu-icon' onClick={() => navigate('/login')} />
                    )}
                </div>

            </div>
            {
                isCartOpen
                    ?
                    <Cart setIsCartOpen={setIsCartOpen} />
                    :
                    null
            }
        </div>
    );
}

export default Header;
