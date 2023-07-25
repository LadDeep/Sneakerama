import { backendURL } from "../constants";

const signup = async(signupPayload) => {
    console.log(signupPayload)
    await fetch(`${backendURL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupPayload)
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

const login = async (loginCredentials) => {
    console.log(loginCredentials)
    const response = await fetch(`${backendURL}/login`, {
        method: 'GET'
    })

    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
}

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export default {
    signup,
    login,
    logout,
    getCurrentUser
};