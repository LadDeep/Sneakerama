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
        // eslint-disable-next-line
    }, []);

    const handleLogout = async () => {
        const user = await authService.getCurrentUser();
        //send cart and wishlist details to the database
        console.log(user);
      //  const response = await authService.pushCartAndWishlistToDatabase(user)
     //   console.log(response);

        setIsLoggedIn(false);
        authService.logout();
        navigate('/login');
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    const navigateWishlist = () => {
        if(isLoggedIn){
            navigate('/wishlist');
        }
        else{
            toast.error("Please login to view your wishlist");
        }
    }

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
                    {showMenu && (
                        <div className="menu-dropdown-content">
                            <div className='header-mobile-menu'>
                                <p className='header-mobile-menu-item'>NEW ARRIVALS</p>
                                <p className='header-mobile-menu-item'onClick={() => {
                                    navigate('/orders')
                                    closeMenu();
                                    }}>MEN'S</p>
                                <p className='header-mobile-menu-item' onClick={()=>{
                                    navigate('/catalog')
                                    closeMenu();
                                    }}>WOMEN'S</p>
                                <p className='header-mobile-menu-item'>KIDS'</p>
                                <p className='header-mobile-menu-item' onClick={() => {
                                    navigate('/orders')
                                    closeMenu();
                                }}>ORDERS</p>
                                <p className='header-mobile-menu-item' onClick={() => {
                                    navigate('/events')
                                    closeMenu();
                                }}>EVENTS</p>
                                <p className='header-mobile-menu-item' onClick={() => {
                                    navigate('/reviews')
                                    closeMenu();
                                }}>REVIEWS</p>
                                <p className='header-mobile-menu-item' onClick={() => {
                                    navigate('/contact')
                                    closeMenu();
                                }}>CONTACT</p>
                                <p className='header-mobile-menu-item' onClick={() => {
                                    navigate('/faq')
                                    closeMenu();
                                }}>FAQ</p>
                            </div>
                        </div>
                    )}
                </div>
                <p className='header-logo' onClick={() => navigate('/')}>SNEAKERAMA</p>
                <div className='header-menu'>
                <p className={location.pathname==="/catalog" ? 'header-menu-item' : 'header-menu-item'} onClick={()=>navigate('/catalog')}>NEW ARRIVALS</p>
                    <p className={location.pathname==="/catalog" ? 'header-menu-item' : 'header-menu-item'} onClick={()=>navigate('/catalog')}>MEN'S</p>
                    <p className={location.pathname==="/catalog" ? 'header-menu-item' : 'header-menu-item'} onClick={()=>navigate('/catalog')}>WOMEN'S</p>
                    <p className={location.pathname==="/catalog" ? 'header-menu-item' : 'header-menu-item'} onClick={()=>navigate('/catalog')}>KIDS'</p>
                    <p className={location.pathname === "/orders" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/orders')}>ORDERS</p>
                    <p className={location.pathname === "/events" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/events')}>EVENTS</p>
                    {
                        user && user.isSeller && 
                        <p className={location.pathname === "/inventory" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/inventory')}>INVENTORY</p>

                    }
                    <p className={location.pathname === "/reviews" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/reviews')}>REVIEWS</p>
                    <p className={location.pathname === "/contact" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/contact')}>CONTACT</p>
                    <p className={location.pathname === "/faq" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/faq')}>FAQ</p>
                </div>
                <div className="header-menu-right">
                    <HeartOutlined className='header-menu-icon' onClick={() => {
                        navigateWishlist();
                    }} />
                    <ShoppingCartOutlined className='header-menu-icon' onClick={() => {
                        document.body.style.overflow = 'hidden'
                        setIsCartOpen(true)
                    }} />
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
    <ToastContainer position='top-right' autoClose={3000} />
        </div>
    );
}

export default Header;
