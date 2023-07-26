import '../css/App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';

import banner from '../images/banner.png'
import banner2 from '../images/banner-2.png'
import banner3 from '../images/banner-3.png'
import adidas from '../images/adidas.png'
import nike from '../images/nike.png'
import converse from '../images/converse.png'
import newBalance from '../images/new-balance.png'
import on from '../images/on.png'
import NikeAir from '../images/nike-air-force-1.png'
import jordan from '../images/jordan-air-1-mid-se.png'
import nb550 from '../images/new-balance-550.png'
import adidasUltra from '../images/nike-air-force-1.png'
import ASICS from '../images/ASICS®-gel-1130.png'
import converseRun from '../images/converse-run-star-hike.png'
import promo1 from '../images/promo1.png'
import promo2 from '../images/promo2.png'
import promo3 from '../images/promo3.png'

function Home() {
    return (
        <div>
            <Header />
            <div className='home-banner-container'>
                <img src={banner} className='home-banner-img' alt='banner' />
                <div className='home-banner-centered-text'>
                    The Freshest Kicks of Summer
                    <div className='home-new-arrivals-btn'>
                        SHOP NEW ARRIVALS
                    </div>
                </div>
            </div>
            <div className='home-brand-div'>
                <img src={adidas} className='home-brand-img' alt='adidas' />
                <img src={nike} className='home-brand-img' alt='nike' />
                <img src={converse} className='home-brand-img' alt='converse' />
                <img src={newBalance} className='home-brand-img' alt='newBalance' />
                <img src={on} className='home-brand-img' alt='on' />
            </div>
            <div className='home-banner-container'>
                <img src={banner2} className='home-banner-img' alt='banner2' />
                <div className='home-banner2-centered-text'>
                    Hoops-Inspired Sneakers
                    <div className='home-banner2-btn'>
                        SHOP NEW BALANCE COURT CLASSICS
                    </div>
                </div>
            </div>
            <p className='home-featured-header'>Featured Sneakers</p>
            <div className='home-featured-div'>
                <div>
                    <img src={NikeAir} className='home-featured-img' alt='adidas' />
                    <p className='home-featured-item'>Nike Air Force 1</p>
                </div>
                <div>
                    <img src={jordan} className='home-featured-img' alt='adidas' />
                    <p className='home-featured-item'>Jordan Air Jordan 1 Mid SE</p>
                </div>
                <div>
                    <img src={nb550} className='home-featured-img' alt='adidas' />
                    <p className='home-featured-item'>New Balance 550</p>
                </div>
                <div>
                    <img src={adidasUltra} className='home-featured-img' alt='adidas' />
                    <p className='home-featured-item'>adidas Ultra Bounce</p>
                </div>
                <div>
                    <img src={ASICS} className='home-featured-img' alt='adidas' />
                    <p className='home-featured-item'>ASICS® Gel-1130</p>
                </div>
                <div>
                    <img src={converseRun} className='home-featured-img' alt='adidas' />
                    <p className='home-featured-item'>Converse Run Star Hike</p>
                </div>
            </div>
            <div className='home-banner-container'>
                <img src={banner3} className='home-banner-img' alt='banner3' />
                <div className='home-banner2-centered-text'>
                    Forever in Style
                    <div className='home-banner2-btn'>
                        SHOP CLASSICS
                    </div>
                </div>
            </div>
            <div className='home-promo-div'>
                <div>
                    <img src={promo1} className='home-promo-img' alt='promo1' />
                    <p className='home-promo-header'>Fun is Velcro</p>
                    <div className='home-new-arrivals-btn'>
                        SHOP KIDS' LACELESS SNEAKERS
                    </div>
                </div>
                <div>
                    <img src={promo2} className='home-promo-img' alt='promo2' />
                    <p className='home-promo-header'>Get into Fresh Mode: Lacoste</p>
                    <div className='home-new-arrivals-btn'>
                        SHOP LACOSTE NEW ARRIVALS
                    </div>
                </div>
                <div>
                    <img src={promo3} className='home-promo-img' alt='promo3' />
                    <p className='home-promo-header'>Slide & Sandal Season is Here</p>
                    <div className='home-new-arrivals-btn'>
                        SHOP SLIDES & SANDALS
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
