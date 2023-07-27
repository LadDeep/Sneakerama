# Assignment 3 - Sneakerama
Sneakerama is an online destination designed specifically for sneaker enthusiasts. The main goal of this website is to offer a wide range of options, ensuring a seamless shopping experience. With an extensive collection of sneakers spanning various brands, styles, and categories, we cater to the diverse likes, preferences, and budgets of the users. The main aim is to provide a user-friendly interface that allows customers to easily search, explore, and filter through our various sneakers. Also, the application prioritizes the safety and convenience of the customers by implementing robust security measures to protect their personal and provide convenient payment processing.

* *Date Created*: 26/07/2023
* *Last Modification Date*: 26/07/2023
* *Hosted URL*: [link](https://remarkable-sprite-930713.netlify.app/)
* *Git URL*: [GitLab Link](https://git.cs.dal.ca/dlad/csci-5709-grp-14)
* *Git branch URL*: [GitLab Link](https://git.cs.dal.ca/dlad/csci-5709-grp-14/-/tree/dhruv-kothari?ref_type=heads)

## Credentials for logging into Sneakerama
email:dhruvkothari7777.dk@gmail.com
Password:Dhruv@1234
## Author
Name: Dhruv Kothari
Banner Id: B00933282
Email:dh801135@dal.ca 

## For Credit Card Credentials
Go to Add Debit/Credit(Card)
* Card Number: 4000001240000000
* Expiration Date: Future Month/Future/Current Year
* CVV: Any 3 digits

## Feature Developed
Payment Feature
Go to Cart add items in it and click on Procedd to Checkout

OR

Go to - /payment

## Author's work
## frontend
## File-Frontend/src/Components/Payment.js
Payment.js
Payment.css
## backend
Models- Payment.js
Route-paymentRoute.js
Services-payment.js


## Deployment
Link to hosted project : [Netlify app](https://remarkable-sprite-930713.netlify.app/)
Platform for deployment: [Netlify](https://www.netlify.com/)

Link to Render deployment : [Render](https://sneakerama-backend.onrender.com/)

Steps performed to deploy the applicaion (backend):
* Push code to GitHub
* Create an account on Render for Backend Deployment
* Go to the Render dashboard and click on "New".
* Choose the github option for deploying
* Selected my github repo hosted on github.
* change build command to npm
* Clicked on "Deploy" to start the deployment process and deployed the application

Steps performed to deploy the application (frontend):
* Push code to GitHub.
* Create a Netlify account for frontend Deployment.
* Connect GitHub repository in Netlify.
* Configure build settings (build command and directory).
* Click "Deploy" on Netlify dashboard.
* Test deployed app using the provided URL.


## Built With

* [nodejs](https://nodejs.org/en) - Runtime
* [VScode](https://code.visualstudio.com/download) - Code editor 
* [express.js](https://expressjs.com/) - The backend library 
* [npm](https://www.npmjs.com/) - Node package manager for node.js
* [Bootstrap](https://getbootstrap.com/) - UI library
* [React](https://reactjs.org/) - UI framework 

## Sources Used
### Payment.js

*Lines 113 - 134*

```
const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "Payment for ",
                        amount: {
                            currency_code: "USD",
                            value: (subtotal + 45).toFixed(2),
                        },
                    },
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };


```

The code above was created by adapting the code in Paypal(https://www.unimedia.tech/paypal-checkout-integration-with-react/) as shown below:

```
 const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Payment for ",
            amount: {
              currency_code: "USD",
              value: (subtotal + 15).toFixed(2),
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };



```

- The code in(https://www.unimedia.tech/paypal-checkout-integration-with-react/) PayPal's documentation is for creating a PayPal order and was implemented by the PayPal development team. They designed the code to handle the process of creating an order using the PayPal API.
- https://www.unimedia.tech/paypal-checkout-integration-with-react/ay PayPal's code for creating a PayPal order was used by me because it provides a standardized and secure way to create an order and process payments through PayPal.
- The modifications made by me to PayPal's code involved changing the description, currency, and value in the purchase_units array. In my code, the description is modified to "Payment for" and the value is calculated based on the subtotal plus 45.


### Payment.js

*Lines 136-140*

```
const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            setSuccess(true);
        });
    };

```

The code above was created by adapting the code in Paypal(https://www.unimedia.tech/paypal-checkout-integration-with-react/) as shown below:

```
const onApprove = (data, actions) => {
   return actions.order.capture().then(function (details) {
     const { payer } = details;
     setSuccess(true);
   });
 };
```

- The code in PayPal's((https://www.unimedia.tech/paypal-checkout-integration-with-react/))  documentation for capturing an approved PayPal order was implemented by the PayPal development team. They designed the code to handle the process of capturing the details of an approved order using the PayPal API.
-https://www.unimedia.tech/paypal-checkout-integration-with-react/ PayPal's code for capturing an approved order was used because it provides a standardized and secure way to handle the finalization of an order and perform necessary actions after a successful payment
- The modifications made to PayPal's code involved removing the reference to the 'payer 'variable from the code block. In my code, the 'const { payer }= details'; line is removed since I am not using the 'payer' information in my  implementation.

### Payment.js

*Lines 158 - 161*

```
const onError = (data, actions) => {
        setErrorMessage("An Error occurred with your payment ");
        console.log(data);
    };


```
The code above was created by adapting the code in Paypal(https://www.unimedia.tech/paypal-checkout-integration-with-react/) as shown below:

```
//capture likely error
 const onError = (data, actions) => {
   setPaypalErrorMessage("An Error occured with your payment ");
 };

```

- The code in  PayPal's (https://www.unimedia.tech/paypal-checkout-integration-with-react/) documentation is for handling errors during the payment process was implemented by the PayPal development team. They designed the code to handle error scenarios that may occur during the payment flow and provide appropriate error messages or actions.
-https://www.unimedia.tech/paypal-checkout-integration-with-react/ PayPal's code for error handling was used because it provides a standardized way to handle and communicate errors that may occur during the payment process.
- The modifications made to PayPal's code involved setting the specific error message.In your code, the line 'setErrorMessage("An Error occurred with your payment ");' sets the error message in your application state to inform the user about the error.



### Payment.js

*Lines 163 - 187*

```
 useEffect(() => {
        // eslint-disable-next-line
        if (success) {
            notify();
            console.log("success");
        }
    },

```
The code above was created by adapting the code in Paypal(https://www.unimedia.tech/paypal-checkout-integration-with-react/) as shown below:

```
 useEffect(() => {
      if (success) {
        alert("Payment successful!!");
      }
    },
    [success]
  );


```

- The PayPal code(https://www.unimedia.tech/paypal-checkout-integration-with-react/)   in the provided link ) was implemented by using the useEffect hook. It listens for changes in the success variable and executes the code inside the callback function when success is true.
-The PayPal code was used because it provides a way to handle successful payments. By using the useEffect hook, the code sets up an effect that runs when the success variable changes.
-The  code was modified by me by adding additional functionality inside the useEffect hook. In addition to calling the notify function and logging "success" when success is true, the code was modified to display an alert message using the alert function when success is true.

### References


[1] “MongoDB Documentation.” Available: https://www.mongodb.com/docs/. [Accessed: Jul. 26, 2023]

[2] Sneakers Photos, Download the Best Free Sneakers Stock Photos ... - Pexels, www.pexels.com/search/sneakers/. (Accessed 26 July 2023.)

[3]Unimedia. “PayPal Checkout Integration with React.” Unimedia Technology, 9 Oct. 2021, https://www.unimedia.tech/paypal-checkout-integration-with-react/. (Accessed 26 July 2023.)

[4]Express Routing. https://expressjs.com/en/guide/routing.html. (Accessed 26 July 2023.)




