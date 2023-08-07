import { backendURL } from "../constants";

const createUser = async (signupPayload) => {

    try {
        const response = await fetch(`${backendURL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupPayload)
        })
        .then ((response) => {

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
            localStorage.setItem('user', JSON.stringify(response.data.accessToken));
        }
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
    }

    return data;
}

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = async() => {
    let token=JSON.parse(localStorage.getItem('user'));
    const response= await fetch(`${backendURL}/auth/getCurrentUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token":token})
    })
    const data = await response.json();
    return data;
};

const getUser = async(userEmail) =>{
    let email = userEmail.email;
    const response= await fetch(`${backendURL}/auth/getUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email})
    })
    const data = await response.json();
    return data;
}
const changePassword= async(userEmail) =>{
    let email = userEmail.email;
    let password = userEmail.password;
    const response= await fetch(`${backendURL}/auth/changePassword`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email,"password":password})
    })
    const data = await response.json();
    return data;
}

//update user details
const updateUserDetails =async(email,updatedValues) =>{

    const response= await fetch(`${backendURL}/auth/updateUserDetails`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email,"updatedValues":updatedValues})
    })
    const data = await response.json();

    return data;
}

const deleteUser = async(email) =>{

    const response= await fetch(`${backendURL}/auth/deleteUser`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email})
    })
    const data = await response.json();

    return data;
}
/*
const pushCartAndWishlistToDatabase = async (user) => {
    const email=user.data.email;
    const cart=user.data.cart;
    const wishlist=user.data.wishlist;
    console.log(email);
    console.log(cart);
    console.log(wishlist);
    const response= await fetch(`${backendURL}/auth/pushCartAndWishlistToDatabase`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email":email,"cart":cart,"wishlist":wishlist})
    })
    const data = await response.json();
    console.log(data);
    return data;
}

*/

export const authService = {
    getUser,
    createUser,
    loginUser,
    logout,
    getCurrentUser,
    changePassword,
    updateUserDetails,
    deleteUser,
   // pushCartAndWishlistToDatabase
};