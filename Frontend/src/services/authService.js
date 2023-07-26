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
        })
        .then ((response) => {
            console.log(response);

            return response;
        })
        .catch(error => {
            console.log(error)
        });
        return response;
    }
    catch (error) {
        console.log(error)
    }

}

const loginUser = async (loginCredentials) => {
    console.log(loginCredentials)
    const response= await fetch(`${backendURL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginCredentials)
    })
    .then((response) =>{
        if(response.body.accessToken)
        {
            console.log(response);
            console.log(response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.accessToken));
            console.log(response.data.accessToken);
        }
        console.log(response);
        return response;
    })
    .catch(error => {
        console.log(error)
    }
    )
    const data = await response.json();
    if(data.accessToken)
    {
        let storage={}
        storage.isSeller=data.data.Seller;
        storage.email=data.data.email;
        storage.isAdmin=data.data.isAdmin;
        storage.isVerified=data.data.isVerifiedSeller;
        localStorage.setItem('user', JSON.stringify(data.accessToken));
        console.log(data.accessToken);  
    }
    console.log(data)
    console.log(response)
    return data;
}

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = async() => {
    let token=JSON.parse(localStorage.getItem('user'));
    console.log(token);
    const response= await fetch(`${backendURL}/auth/getCurrentUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token":token})
    })
    const data = await response.json();
    console.log(response);
    console.log(data);
    return data;
};

const getUser = async(userEmail) =>{
    let email = userEmail.email;
    console.log(email);
    const response= await fetch(`${backendURL}/auth/getUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email})
    })
    const data = await response.json();
    console.log(data);
    return data;
}
const changePassword= async(userEmail) =>{
    let email = userEmail.email;
    let password = userEmail.password;
    console.log(email);
    const response= await fetch(`${backendURL}/auth/changePassword`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email,"password":password})
    })
    const data = await response.json();
    console.log(data);
    return data;
}

export const authService = {
    getUser,
    createUser,
    loginUser,
    logout,
    getCurrentUser,
    changePassword
};