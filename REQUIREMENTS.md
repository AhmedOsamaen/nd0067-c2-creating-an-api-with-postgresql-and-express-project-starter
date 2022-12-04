# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


### Schemas And REST Routes
### Users

Model:
 users (id serial primary key,firstName varchar(100),lastName varchar (100),password varchar(100));

 EndPoints: 

            token required=> GET index: /users
            token required=> GET show: /users/:id
            token required=> POST create: /users {"firstName":"Ahmed","lastName":"Osama","password":"Ss123456"}
            token required=> DELETE delete: /users/:id
            POST auth: /users/auth {"firstName":"ssww","password":"Ss123456"}

### Products 
 products (id serial primary key,name varchar(150),price integer);

 EndPoints:

                             GET index: /products
                             GET show: /products/:id
            token required=> POST create: /products {"name":"Nike Force","price":"4421"}
                             DELETE delete: /products/:id

### Orders

orders (id serial primary key,user_id bigint [Foreign key for users],order_status varchar(10) not null);

 EndPoints:

           GET index: /orders
           GET  show: /orders/:orderId
           POST create: /orders {"user_id":5}
           DELETE delete: /orders/:orderId
           PUT completeOrder:/orders/complete/:orderId
            token required=> GET getActiveOrderByUser:/orders/user/:userId
            token required=> GET getCompletedOrdersByUserId:/orders/user/complete/:userId
           POST addProductToOrder: /orders/:orderId/products {"productId":"1","quantity":"2"}

The Order is created for user with default order status to active. then you can add products to order and then you can complete the order


### Orders_Prdoucts

orders_products (id serial primary key,product_id bigint [Foreign key for Products],order_id bigint [Foreign key for Orders],quantity integer);

