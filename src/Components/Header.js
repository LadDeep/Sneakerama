import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

import '../App.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className='header-bg'>
            <p className='header-logo' onClick={() => navigate('/')}>SNEAKERAMA</p>
            <div className='header-menu'>
                <p className='header-menu-item'>NEW ARRIVALS</p>
                <p className='header-menu-item'>MEN'S</p>
                <p className='header-menu-item'>WOMEN'S</p>
                <p className='header-menu-item'>KIDS'</p>
                <p className='header-menu-item'>ORDERS</p>
                <p className='header-menu-item'>EVENTS</p>
                <p className='header-menu-item'>REVIEWS</p>
                <p className={location.pathname === "/contact" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/contact')}>CONTACT</p>
                <p className={location.pathname === "/faq" ? 'header-menu-item-selected' : 'header-menu-item'} onClick={() => navigate('/faq')}>FAQ</p>
            </div>
            <div className="header-menu-right">
                <HeartOutlined className='header-menu-icon' />
                <ShoppingCartOutlined className='header-menu-icon' />
                <UserOutlined className='header-menu-icon' onClick={()=> navigate('/login')} />
            </div>
        </div>
    );
}

export default Header;
