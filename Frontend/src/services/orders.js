import { backendURL } from "../constants";
import { authService } from "./authService";

export const addOrderDetails = async (orderData) => {
    try {
        const response = await fetch(`${backendURL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();

        return {
            response: data,
            status: response.status,
        };
    } catch (error) {
        console.error('Error adding order details:', error);
        throw new Error('An error occurred while adding order details.');
    }
};

export const getOrders = async () => {
    try {
        const user = await authService.getCurrentUser();
        const response = await fetch(`${backendURL}/orders/${user.data.email}`, {
            method: 'GET'
        });

        const data = await response.json();
        console.log(data,"dataaaaaaaaaaaaaaaaaa")
        return {
            response: data.orders,
            status: response.status,
        };
    } catch (error) {
        console.error('Error getting order details:', error);
        throw new Error('An error occurred while fetting order details.');
    }
};
