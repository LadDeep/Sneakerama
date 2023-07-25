import { backendURL } from "../constants";

const createUser = async (signupPayload) => {
    console.log(signupPayload);
    try {
        const response = await fetch(`${backendURL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupPayload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data));
        }

        console.log(response.status);
        return response.status;
    } catch (error) {
        console.log(error);
    }
}
const loginUser = async (loginCredentials) => {
    console.log(loginCredentials)
    await fetch(`${backendURL}/auth/login`, {
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

export const authService = {
    createUser,
    loginUser,
    logout,
    getCurrentUser
};