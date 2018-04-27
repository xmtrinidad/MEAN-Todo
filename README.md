# MEAN TODO

This is a walkthrough for creating a basic todo application using the MEAN stack.

## Features

* User authentication:
    * Username, email, password to register
    * Username and password to login
* Authentication using JWT
* Full CRUD todo list functionality

## Getting Started

### NPM & app.js

1.  Initialize NPM with ```npm init``` to create a **package.json** file.

2.  This application will use several dependencies.  To get started, copy and paste the following line into your terminal:

    ```
    npm i bcryptjs cors express jsonwebtoken mongoose mongoose-unique-validator passport passport-jwt
    ```
    
    #### About the Dependencies
    
    | Test | Test |
    | ----- | ----- |
    | [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Used to hash passwords before storing in database |
    | [cors](https://www.npmjs.com/package/cors) | Usage described in [Project Introduction](#cors)  |
    | [express](https://www.npmjs.com/package/express) | Node.js framework  |
    | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | Usage described in [Project Introduction](#token-generation-and-authentication)  |
    | [mongoose](https://github.com/jaredhanson/passport) | Used to interact with MongoDB with Node.js  |
    | [passport-jwt](https://www.npmjs.com/package/passport-jwt) | Passport strategy for authenticating users using JSON Web Tokens  |
    
3. Set up an app.js file, using the initial template found at: <ENTER LINK HERE>

### Database

For this application, I am using a database set up on [mLab](https://mlab.com/).  After signing up and creating a database from their Sandbox tier (which is free), the following steps will get the database working in the application:

1.  Click your newly created database then click the **users** tab

2.  Click on **Add database user** and create a user with a password

3.  The link required to put in the application so that it can connect will look something like ```mongodb://<dbuser>:<dbpassword>@ds259119.mlab.com:59119/your_db```

4.  In the application, create a *config* directory then a **database.js** file

5.  Paste the following snippet into the file:
    
    ```js
    module.exports = {
        database: 'mongodb://<dbuser>:<dbpassword>@ds259119.mlab.com:59119/your_db',
        secret: '<dbpassword>'
    };
    ```
    
    The database connection is made in the app.js file, which imports/requires the database.js file:
    ```js
    // Mongoose Connection
    mongoose.connect(config.database);
    // On Mongoose Connection
    mongoose.connection.on('connected', () => {
        console.log(`Connected to database ${config.database}`);
    });
    // On Mongoose Error
    mongoose.connection.on('error', (err) => {
        console.log(`Database error: ${err}`);
    });
    ```
    The database secret will later be used to configure passport for authentication

## Models

This application will have two models for storing data. The User and Todo

1.  Create a models directory

2.  Create a **user.js** file and a **todo.js** file

3.  The User model can take on many forms, check out the repo for my setup <HERE>

4.  The Todo model can also take on several forms, check out the model I made <HERE>

5.  Remember to export the model because it will be used to interact with the controllers

### Routes and Controllers

Since this is a MEAN application, most of the route changes will be handled on the front-end.  The back-end route interactivity that will mainly be used is for posting and getting data from the database.

1.  Create a routes directory

2.  Create a *user.js* file