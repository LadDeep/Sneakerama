import { backendURL } from "../constants";

export const getReviews = async () => {
    const response = await fetch(`${backendURL}/getReviews`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            return {
                reviews: data.data
            };
        })
        .catch(error => {
            console.log(error)
            return {
                reviews: []
            }
        })
    console.log(response)
    return response;
}

export const addReview = async (review) => {
    console.log(review)
    await fetch(`${backendURL}/addReview`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            return {
                data: data
            };
        })
        .catch(error => {
            console.log(error)
            return {
                reviews: []
            }
        })
}