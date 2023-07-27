import { backendURL } from "../constants";

export const addPaymentDetails = async (payment) => {
    console.log(payment,"ssss");
    try {
        const response = await fetch(`${backendURL}/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payment)
        });
        const data = await response.json();
        return {
          response: data,
          status: response.status
        };
    } catch (error) {
        console.error('Error processing payment:', error);
        throw new Error('An error occurred while processing the payment.');
    }
}
