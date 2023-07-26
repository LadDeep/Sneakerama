import { MailOutlined, PhoneOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import '../../css/App.css';

function Footer() {

    const navigate = useNavigate();
    return (
        <div className='footer-bg'>
            <div className='footer-menu-bg'>
                <div className='footer-menu-section'>
                    <p className='footer-menu-header'>ABOUT SNEAKERAMA</p>
                    <p className='footer-menu-item' onClick={() => navigate('/reviews')}>Reviews</p>
                    <p className='footer-menu-item'>About Us</p>
                    <p className='footer-menu-item' onClick={() => navigate('/contact')}>Contact Us</p>
                </div>
                <div className='footer-menu-section'>
                    <p className='footer-menu-header'>CUSTOMER SERVICE</p>
                    <div>
                        <MailOutlined className='footer-menu-icon' />
                        <PhoneOutlined className='footer-menu-icon' />
                    </div>
                </div>
                <div className='footer-menu-section'>
                    <p className='footer-menu-header'>SOCIAL</p>
                    <div>
                        <FacebookOutlined className='footer-menu-icon' />
                        <TwitterOutlined className='footer-menu-icon' />
                        <InstagramOutlined className='footer-menu-icon' />
                    </div>
                </div>
            </div>
            <div className='footer-logo-div'>
                <p className='header-logo' onClick={() => navigate('/')}>SNEAKERAMA</p>
                <p className='footer-rights'>
                    © 2023 Sneakerama.com, Inc. All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;
