<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 

# Sneakerama
Sneakerama is an online destination designed specifically for sneaker enthusiasts. The main goal of this website is to offer a wide range of options, ensuring a seamless shopping experience. With an extensive collection of sneakers spanning various brands, styles, and categories, we cater to the diverse likes, preferences, and budgets of the users. The main aim is to provide a user-friendly interface that allows customers to easily search, explore, and filter through our various sneakers. Also, the application prioritizes the safety and convenience of the customers by implementing robust security measures to protect their personal and provide convenient payment processing.

* *Date Created*: 22 MAY 2023
* *Last Modification Date*: 10 AUG 2023
* *Hosted URL*: [https://remarkable-sprite-930713.netlify.app/](https://remarkable-sprite-930713.netlify.app/)
* *Git URL*: [https://git.cs.dal.ca/dlad/csci-5709-grp-14](https://git.cs.dal.ca/dlad/csci-5709-grp-14)
* *Github URL*: [https://github.com/LadDeep/Sneakerama](https://github.com/LadDeep/Sneakerama)

## Authors

* [Deep Pravinbhai Lad](dp658583@dal.ca) - *(Developer)*
* [Kush Sutaria](ks428142@dal.ca) - *(Developer)*
* [Dhruv Rajesh Kothari](dh801135@dal.ca) - *(Developer)*
* [Rohin Ashwinkumar Sharma](rh851598@dal.ca) - *(Developer)*
* [Jaimin Kanubhai Desai](jm690660@dal.ca) - *(Developer)*


## Credentials for logging into Sneakerama
User
Email: dummy@dal.ca
Password: Password@123

Seller
Email: seller@dal.ca
Password: Password@123

Admin
Email: admin@dal.ca
Password: Password@123

## For Credit Card Credentials
Go to Add Debit/Credit(Card)
* Card Number: 4000001240000000
* Expiration Date: Future Month/Future/Current Year
* CVV: Any 3 digits

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
* [Formik](https://formik.org/) - Scalable, performant, form helper with a minimal API

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
- https://www.unimedia.tech/paypal-checkout-integration-with-react/ PayPal's code for capturing an approved order was used because it provides a standardized and secure way to handle the finalization of an order and perform necessary actions after a successful payment
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
- https://www.unimedia.tech/paypal-checkout-integration-with-react/ PayPal's code for error handling was used because it provides a standardized way to handle and communicate errors that may occur during the payment process.
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



For user management security, we have used JWT tokens. [5] was used as reference for implementing JWT authentication.

Creating backend flow [6]:
https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608669/View
The above link as a starting point for creating Backend modules such as understanding server.js in the backend and creating models.


### Acknowledgements

* (inventory.jpg)[https://git.cs.dal.ca/dlad/csci-5709-grp-14/-/blob/main/Frontend/src/images/inventory.jpg] - Images by storyset on Freepik
* (add-photos.jpg)[https://git.cs.dal.ca/dlad/csci-5709-grp-14/-/blob/main/Frontend/src/images/add-photos.jpg] - Images by fakhri91 on Vecteezy [https://www.vecteezy.com/vector-art/8018058-vector-icon-add-image-upload-image-file-photo-outline-design]


### References


[1] “MongoDB Documentation.” Available: https://www.mongodb.com/docs/. (Accessed: Jul. 26, 2023)

[2] Sneakers Photos, Download the Best Free Sneakers Stock Photos ... - Pexels, www.pexels.com/search/sneakers/. (Accessed 26 July 2023)

[3]Unimedia. “PayPal Checkout Integration with React.” Unimedia Technology, 9 Oct. 2021, https://www.unimedia.tech/paypal-checkout-integration-with-react/. (Accessed 26 July 2023)

[4]Express Routing. https://expressjs.com/en/guide/routing.html. (Accessed 26 July 2023)


[5] React JWT Authentication - Sign up, Login, Logout & Private Route. www.youtube.com, https://www.youtube.com/watch?v=T5dIjye4b-I. (Accessed 25 July 2023)

[6]https://dal.brightspace.com/d2l/le/content/274269/viewContent/3608669/View. (Accessed 27 July 2023)

[7] “MongoDB Documentation.” Available: https://www.mongodb.com/docs/. [Accessed: Jul. 26, 2023]

[8]Ant Design - The World’s Second Most Popular React UI Framework. https://ant.design/. [Accessed 26 July 2023.]

[9]NodeJS, Express, Mongoose and MongoDB RESTful Web Service - POST Request [Part 1].” B2 Tech, 5 Aug. 2020, http://bushansirgur.in/nodejs-express-mongoose-and-mongodb-restful-web-service-post-request/[Accessed 26 July 2023.]

[10]Fadhil, Rahman. How to Build a REST API with Express and Mongoose – Rahman Fadhil. https://rahmanfadhil.com/express-rest-api/. Accessed 26 July 2023.
