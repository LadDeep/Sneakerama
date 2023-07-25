import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const signup = ( email, password, firstName, lastName, address, city, state, country, phoneNumber, userQuestion, userAnswer, termsAndConditions, seller) => {
    return axios.post(API_URL + 'signup', {
        email,
        password,
        firstName,
        lastName,
        address,
        city,
        state,
        country,
        phoneNumber,
        userQuestion,
        userAnswer,
        termsAndConditions,
        seller
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    })
    .catch((error) => {
        console.log(error);
    });
    }

const login = (username, password) => {
    return axios
    .post(API_URL + 'login', {
        username,
        password
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
}