import { backendURL } from "../constants";

export const getProducts = async () => {
    try {
        const response = await fetch(`${backendURL}/products`, {
            method: 'GET'
        });
        
        const data = await response.json();
        console.log(data);
        return {
            product: data
        };
    } catch (error) {
        console.log(error);
        return {
            product: []
        };
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${backendURL}/product/${id}`, {
            method: 'GET'
        });

        const data = await response.json();
        return {
            product: data
        };
    } catch (error) {
        console.log(error);
        return {
            product: null
        };
    }
}