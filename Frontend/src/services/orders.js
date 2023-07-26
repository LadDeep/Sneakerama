import { backendURL } from "../constants";

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
