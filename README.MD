### Welcome to The Eccommerce Store BackEnd App for EGPFWD Advanced WEB By Ahmed Osama

This Repo is a fork for the FWD Starter project

### 1 DB Setup And Configuration

    1- create .env file in your project directory
    2- Add the DB & APP Configraution as follows:
                POSTGRES_HOST=127.0.0.1
                POSTGRES_DB=eccommerce_store
                POSTGRES_TEST_DB=eccommerce_store_test
                POSTGRES_USER=postgres (Your created user for postgres)
                POSTGRES_PASSWORD=#### (Your created password for postgres)
                BCRYPT_PASSWORD=################ (Your string crypted password as desired)
                SALT_ROUNDS=10 (or any number as desired)
                TOKEN_SECRET=################ (Your string token secret as desired)
                ADMIN_PASS=######## (Your Admin desired password will be discussed later in API ENDPOINTS Instructions)
                ENV=dev (will be changed to test when we run test)
    3-Update database.json file with your postgres user and password
    4-Open the terminal and run 'npm i' to install the dependencies

    5-run 'npm run create-db' to create the database (if an error happened that tells you the database is not found you need to add a present database to your database.json dev database option then run the script again and after it runs successfully return back the 'eccommerce_store' database)

    6-run 'npm run create-ddl' to migrate the ddl to the db

### 2 running the project
    To be able to run the project:
        1-In the terminal run 'npm run build'
        2- run'node dist/server' after that the app will start on port localhost:3000

### API ENDPOINTS Access
    You can access all the api endpoints i have created via postman.
    I added a postman collection file that you can import and use in postman as follows:

    1- Find the postman collection json file in assets folder in the project directory named'FWD_ECCOMERCE_PROJECT.postman_collection.json'
    2- Open your postman and click on the collections tab on the left sidebar and click on import
    3- upload the 'FWD_ECCOMERCE_PROJECT.postman_collection.json' file to the postman
    4- You can now access all the endpoints i created.

### API ENDPOINTS Instructions

### Authentication
    Most of the Endpoints are protected via JWT Authentication so first you need to get a token from the system.
    to be able to get a token do the following:

        1- in postman create post request localhost:3000/users/auth (or open it if you accessed my collection in users folder 'Authenticate user to get token') 
        2- in the .env file we added an ADMIN_PASS key. this password and the firstName to be 'Admin' is the only option to get a token without any users created
        3- in the request body add {
                            "firstName":"Admin",
                            "password":"#######" ( replace ####### with  your ADMIN_PASS password you set in the .env )
                            }
        4- send the request and recieve the token.
        5- you need to add the token in request header Authorization parameter as follows 'Bearer generated token'

    You can then create users and authenticate with them instead of the default admin user.

    I will explain all the endpoints and all the ones that require a token

### Users

Model:
 users (id serial primary key,firstName varchar(100),lastName varchar (100),password varchar(100));

 EndPoints: 

            token required=> index: /users
            token required=> show: /users/:id
            token required=> create: /users {"firstName":"Ahmed","lastName":"Osama","password":"Ss123456"}
            token required=> delete: /users/:id
            auth: /users/auth {"firstName":"ssww","password":"Ss123456"}

### Products 
 products (id serial primary key,name varchar(150),price integer);

 EndPoints:

            index: /products
            show: /products/:id
            token required=> create: /products {"name":"Nike Force","price":"4421"}
            delete: /products/:id

### Orders

orders (id serial primary key,user_id bigint [Foreign key for users],order_status varchar(10) not null);

 EndPoints:

            index: /orders
            show: /orders/:orderId
            create: /orders {"user_id":5}
            delete: /orders/:orderId
            completeOrder:/orders/complete/:orderId
            token required=> getActiveOrderByUser:/orders/user/:userId
            token required=> getCompletedOrdersByUserId:/orders/user/complete/:userId
            addProductToOrder: /orders/:orderId/products {"productId":"1","quantity":"2"}

The Order is created for user with default order status to active. then you can add products to order and then you can complete the order


### Tests

To run tests do the following:

        1- open .env file in the project directory
        2- change the ENV parameter to test
        3- Make sure th database.json test attributes are correct 
        4- open terminal and run 'npm run test'
        5- After finishing testing open .env file and change ENV parameter to dev again if you want to re run the application.


### Extra Scripts

'npm run remove-db' to remove the dev db
'npm run remove-test-db' to remove the test db
'npm run start' to run the nodemon and dev files.








    