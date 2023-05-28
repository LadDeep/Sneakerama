<h6> Project URL:  https://a1individualkush.netlify.app/ </h6>




Technologies/Frameworks/Libraries used: <h5> React, Bootstrap, Formik, Yup </h5> 


Reason for using React: 
As per one Stack Overflow survey [1], React framework was the most common Frontend technology used by Professional Developers and those learning to code in 2022.\
Job opportunities also increase exponentially when using React as compared to Angular or Vue.


The webpage has 2 pages: Log in and Signup.\
A dummy button for resetting the password is also available on the login page but it just prints in the console on clicking it.


The code uses React Formik library [2] to create login and signup forms. https://formik.org/


For validation, Yup library [3] is used:  https://www.npmjs.com/package/yup


## Functioning of the webpage

The website has basic input validation such as empty fields, invalid input, and inputs not matching.\
The user can navigate to both pages using the buttons below the submit form (login/signup) button.\
The webpage is cross-browser compatible (tested with Brave, Chrome, and Edge).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# References:

[1] “Stack overflow developer survey 2022,” Stack Overflow, https://survey.stackoverflow.co/2022/#most-popular-technologies-webframe (accessed May 16, 2023). 

[2] Formik, https://formik.org/ (accessed May 27, 2023). 

[3] J. Quense, “Yup,” npm, https://www.npmjs.com/package/yup (accessed May 27, 2023).
