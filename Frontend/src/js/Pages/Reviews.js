import { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Input, Rate } from 'antd'

import Footer from '../Components/Footer';
import Header from '../Components/Header';

import '../../css/Reviews.css'
import { addReview, getReviews } from '../../services/reviews';
import { authService } from '../../services/authService';

function Reviews() {

    const { TextArea } = Input

    const [reviews, setReviews] = useState([]);

    const [totalReviews, setTotalReviews] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [rating, setRating] = useState(0);
    const [isRatingValid, setIsRatingValid] = useState(true);
    const [title, setTitle] = useState('');
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [review, setReview] = useState('');
    const [isReviewValid, setIsReviewValid] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, [])

    const handleTitleChange = (value) => {
        setTitle(value)
        if (value === '') {
            setIsTitleValid(false)
            return;
        }
        setIsTitleValid(true)
    }

    const handleReviewChange = (value) => {
        setReview(value)
        if (value === '') {
            setIsReviewValid(false)
            return;
        }
        setIsReviewValid(true)
    }

    const fetchReviews = async () => {
        const response = await getReviews();
        await console.log(response)
        if (response) {
            if (response.reviews.length === 0) {
                await setReviews([]);
                await setTotalReviews(0);
                await setAverageRating(0);
            } else {
                await setReviews(response.reviews);
                await setTotalReviews(response.reviews.length);
                var sum = 0;
                await response.reviews.forEach(review => {
                    sum += review.rating;
                })
                await setAverageRating(sum / response.reviews.length);
            }
        }
    }

    const submitReview = async () => {

        if (rating === 0) {
            setIsRatingValid(false)
            return;
        }
        if (title === '') {
            setIsTitleValid(false)
            return;
        }
        if (review === '') {
            setIsReviewValid(false)
            return;
        }
        if (isRatingValid && isTitleValid && isReviewValid) {
            const user = await authService.getCurrentUser();
            const newReview = {
                name: user.data.name,
                rating: rating,
                title: title,
                review: review
            }
            await addReview(newReview);
            await fetchReviews();
            document.body.style.overflowY = 'scroll'
            setIsModalOpen(false)
            emptyModal();
        }
    }

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
                            <Rate value={review.rating} disabled={true} />
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

    const emptyModal = () => {
        setRating(0);
        setTitle('');
        setReview('');
        setIsRatingValid(true);
        setIsTitleValid(true);
        setIsReviewValid(true);
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
                            <div>
                                <Rate value={averageRating} disabled={true} allowHalf />
                            </div>
                            {totalReviews} reviews
                        </div>
                    </div>
                    <div className='reviews-add-btn' onClick={() => {
                        document.body.style.overflowY = 'hidden'
                        setIsModalOpen(true)
                    }} >
                        Leave a Review
                    </div>
                </div>
                {
                    totalReviews === 0
                        ?
                        <>
                            <div style={{ width: '100%', textAlign: 'center', marginTop: '3%' }}>Be the first one to leave a review!!</div>
                        </>
                        :
                        <>
                            {renderReviews()}
                        </>
                }
            </div>
            <Footer />
            {
                isModalOpen
                    ?
                    <div style={{ position: 'fixed', top: '0px', width: '100%', height: '100vh', zIndex: '9999', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div className='reviews-modal' onClick={() => {
                            emptyModal();
                            setIsModalOpen(false);
                            document.body.style.overflowY = 'scroll'
                        }}>
                        </div>
                        <div className='reviews-modal-content'>
                            <div className='reviews-modal-title'>
                                Leave a Review
                            </div>
                            <CloseOutlined className='reviews-modal-close-btn' onClick={() => {
                                document.body.style.overflowY = 'scroll'
                                emptyModal();
                                setIsModalOpen(false)
                            }} />
                            <div className='reviews-modal-body'>
                                <div className='reviews-modal-rating'>
                                    <Rate
                                        value={rating}
                                        allowHalf
                                        onChange={(newRating) => {
                                            setRating(newRating)
                                            if (newRating !== 0) {
                                                setIsRatingValid(true)
                                            }
                                        }}
                                    />
                                    <p className='registration-error-message' style={{ display: isRatingValid ? 'none' : 'block' }}>Select the star to give ratings.</p>
                                </div>
                                <div className='reviews-modal-input'>
                                    <Input status={isTitleValid ? 'success' : 'error'} value={title} onChange={(e) => {
                                        handleTitleChange(e.target.value)
                                    }} placeholder='Title' />
                                    <p className='registration-error-message' style={{ display: isTitleValid ? 'none' : 'block' }}>Title should not be empty.</p>
                                </div>
                                <div className='reviews-modal-input'>
                                    <TextArea value={review} status={isReviewValid ? 'success' : 'error'} onChange={(e) => {
                                        handleReviewChange(e.target.value)
                                    }} placeholder='Review' />
                                    <p className='registration-error-message' style={{ display: isReviewValid ? 'none' : 'block' }}>Review should not be empty.</p>
                                </div>
                                <div className='reviews-modal-submit-btn' onClick={() => {
                                    submitReview();
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