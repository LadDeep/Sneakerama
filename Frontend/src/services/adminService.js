import { backendURL } from "../constants";

export const getPendingSellers = async () => {
    try {
        const response = await fetch(`${backendURL}/all-pending-sellers`, {
            method: 'GET'
        });
        
        const data = await response.json();
        
        return {
            seller: data.sellerlist
        };
    } catch (error) {
        console.log(error);
        return {
            seller: []
        };
    }
}


export const getTotalSellers = async () => {
    try {
        const response = await fetch(`${backendURL}/count-sellers`, {
            method: 'GET'
        });
        
        const data = await response.json();
        
        return {
            count: data.count
        };
    } catch (error) {
        console.log(error);
        return {
            count: []
        };
    }
}

export const getVerifiedSellers = async () => {
    try {
        const response = await fetch(`${backendURL}/count-verified-sellers`, {
            method: 'GET'
        });
        
        const data = await response.json();
        
        return {
            count: data.count
        };
    } catch (error) {
        console.log(error);
        return {
            count: []
        };
    }
}

export const getUnVerifiedSellers = async () => {
    try {
        const response = await fetch(`${backendURL}/count-unverified-sellers`, {
            method: 'GET'
        });
        
        const data = await response.json();
        
        return {
            count: data.count
        };
    } catch (error) {
        console.log(error);
        return {
            count: []
        };
    }
}

export const verifySeller = async (sellerid) => {
    try {
        const response = await fetch(`${backendURL}/verify-seller/${sellerid}`, {
            method: 'GET'
        });
        
        const data = await response.json();
        console.log(data);
        return {
            success: data.success,
            message: data.message
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'Error connecting to Server'
        };
    }
}

export const getAdminInfo = async () => {
    try {
        const response = await fetch(`${backendURL}/admin-user`, {
            method: 'GET'
        });
        
        const data = await response.json();
        console.log(data);
        return {
           admin: data.user
        };
    } catch (error) {
        return {
            admin: []
        };
    }
}

export const updateAdminInfo = async (info) => {
    try {
    const response = await fetch(`${backendURL}/update-user/${info._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    });
    const data = await response.json();
    return {
        success: data.success,
        message: data.message
     };
    } catch (error) {
        return {
            success: false,
            message: 'Error connecting to Server'
        };
    }
}



