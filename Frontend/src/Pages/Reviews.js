import { useEffect, useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd'

import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ReactStars from "react-rating-stars-component";

import '../Styles/Reviews.css'

function Reviews() {

    const starInput = useRef(0);
    const { TextArea } = Input

    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'John Doe',
            rating: 4,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultricies, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl. Sed euismod, diam sit amet dictum ultricies, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl.',
            title: 'Great Product',
        },
        {
            id: 2,
            name: 'David James',
            rating: 4.5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultricies, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl. Sed euismod, diam sit amet dictum ultricies, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl.',
            title: 'Great Product',
        },
        {
            id: 3,
            name: 'Donald Trump',
            rating: 3.5,
            review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum ultricies, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl. Sed euismod, diam sit amet dictum ultricies, nunc nisl ultricies nunc, quis aliquam nisl nunc eu nisl.',
            title: 'Great Product',
        },
    ]);

    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(4);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setTotalReviews(reviews.length);
        setAverageRating(4);
    }, [])

    const renderReviews = () => {
        if (!reviews || reviews.length === 0)
            return;
        // setTotalReviews(reviews.length);
        return reviews.map((review, index) => {
            return (
                <div className='review-item' key={index}>
                    <div className='review-item-header'>
                        <div className='review-customer-name'>
                            {review.name}
                        </div>
                        <div className='review-rating'>
                            <ReactStars
                                count={5}
                                ref={starInput}
                                isHalf={true}
                                value={review.rating}
                                edit={false}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                    </div>
                    <div className='review-item-body'>
                        <div className='review-title'>
                            {review.title}
                        </div>
                        <div className='review-text'>
                            {review.review}
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <Header />
            <div className='reviews-container'>
                <div className='reviews-header'>
                    <div className='reviews-title'>
                        Customer Reviews
                    </div>
                    <div className='reviews-rating-div'>
                        <div className='reviews-rating-value'>
                            {averageRating.toFixed(1)}
                        </div>
                        <div className='reviews-rating'>
                            <ReactStars
                                count={5}
                                isHalf={true}
                                value={averageRating}
                                edit={false}
                                size={24}
                                activeColor="#ffd700"
                            />
                            {totalReviews} reviews
                        </div>
                    </div>
                    <div className='reviews-add-btn' onClick={() => {
                        document.body.style.overflow = 'hidden'
                        setIsModalOpen(true)
                    }} >
                        Leave a Review
                    </div>
                </div>
                {renderReviews()}
            </div>
            <Footer />
            {
                isModalOpen
                    ?
                    <div style={{ position: 'fixed', top: '0px', width: '100%', height: '100vh', zIndex: '9999', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div className='reviews-modal' onClick={() => {
                            setIsModalOpen(false);
                            document.body.style.overflowY = 'scroll'
                        }}>
                        </div>
                        <div className='reviews-modal-content'>
                            <div className='reviews-modal-title'>
                                Leave a Review
                            </div>
                            <CloseOutlined className='reviews-modal-close-btn' onClick={() => {
                                document.body.style.overflow = 'scroll'
                                setIsModalOpen(false)
                            }} />
                            <div className='reviews-modal-body'>
                                <div className='reviews-modal-rating'>
                                    <ReactStars
                                        count={5}
                                        isHalf={true}
                                        value={0}
                                        edit={true}
                                        size={36}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <div className='reviews-modal-input'>
                                    <Input placeholder='Title' />
                                </div>
                                <div className='reviews-modal-input'>
                                    <TextArea placeholder='Review' />
                                </div>
                                <div className='reviews-modal-submit-btn' onClick={() => {
                                    document.body.style.overflow = 'scroll'
                                    setIsModalOpen(false)
                                }} >
                                    Submit
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default Reviews;