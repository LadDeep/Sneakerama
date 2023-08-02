import { backendURL } from "../constants";

export const getWishlist = async (ids) => {
    const response = await fetch(`${backendURL}/product/?ids=${ids}`, {
        method: 'GET'
    })
        .then( async response => await response.json())
        .then(data => {
            return {
                products: data
            };
        })
        .catch(error => {
            console.log(error)
            return {
                products: []
            }
        })
    console.log(response)
    return response;
}
