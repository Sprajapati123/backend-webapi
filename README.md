# MyMart
Name: Sandis Prajapati  

CollegeID: 170012

CU ID: 9637674

Batch: Jan19C

# Getting started
```
To run the server:- ** npm run development **
port3001 is used .
```
These dependencies are used to make the project functional. 
  Bcrypt to decrypt ths user password
  
  body-parser to pass the data from HTML form.
  
  chai, chai-http, chai-like, chai-things for testing
  
  express is a framework
  
  jsonwebtoken for token generation after login
  
  multer to upload image 
  
  mysql2 is the database we used to build this project.
  
  Sequelize is a promise-based ORM for Node.js and io.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite and   MSSQL and features solid transaction support, relations, read replication and more.
  
  Swagger-jsdoc and swagger-ui-express to make api documentation
  
  ```bash
  Syntax to add dependencies
  npm install --save multer
  ```
```bash
  "dependencies": {
    "bcrypt": "^3.0.6",
    "body-parser": "^1.19.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "chai-like": "^1.1.1",
    "chai-things": "^0.2.0",
    "express": "^4.17.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.1",
    "mysql2": "^1.6.5",
    "npm": "^6.10.0",
    "sequelize": "^5.8.7",
    "swagger-jsdoc": "^3.2.9",
    "swagger-ui-express": "^4.0.7"
    }
```
## List of Main Features
- User Registration
If you are new to the system you can register to access the system for purchasing items. If the username already exits before it throws the message user already exits.

- User Login
User can login in the system with valid credentails that they registered with.

- Adding Items to Cart
After login, if they wish to purchase the product. They can add the items to add to cart proceed items from cart to delivery
In the cart page, the items added to cart will be displayed. And if the user is sure to purchase that product, they can click on procedd to payment. It will be deleted from cart after it is procedd to delievery

- Updating user profile
They can accces their details and update their profile if they wish to.

All the data are manipulated by admin such as add update, delete of items, and users as well

## API Documentation
some of the API are

Responses
```re
200 :success
500 :DB error
409 : User already exits
 ```
```a
1. 
POST
http://localhost:3001/v1/users/register
This API registers a single user
username: test
password :test
contact  :test
address  :test
gender   :male
userType  :User

Output -> Registered successfully
        code :-200
```

```b
2.
POST
http://localhost:3001/v1users/login
This API login a registered user
username: test
password :test

output -> Login success
        code:- 200
        
```

```c
3.
POST
http://localhost:3001/v1/addItems
This API registers a item
itemname : abc
itemprice : 1
itemdescription : abc
category: Clothes

output -> Items added
          code200
```
```d
4.
GET
http://localhost:3001/v1/viewItems
Displays all item
{
    "id": 1,
    "itemname": "pant",
    "itemprice": "3000",
    "itemdescription": "for men",
    "category": "clothes",
    "image": "download.jpeg-1561881022689.jpeg",
    "createdAt": "2019-06-30T07:50:22.000Z",
    "updatedAt": "2019-06-30T07:50:32.000Z"
  },
  {
    "id": 3,
    "itemname": "Nike shoes Air force",
    "itemprice": "7000",
    "itemdescription": "limited edition",
    "category": "shoes",
    "image": "nike-air-force-270-1239739-b.jpg-1561881089323.jpg",
    "createdAt": "2019-06-30T07:51:29.000Z",
    "updatedAt": "2019-07-05T16:25:45.000Z"
  },
```

```e
5.
DELETE
DLETE
http://locahost:3001/v1/deleteitem/{id}
id = 3

Deleting items

output -> Items deleted 
        code 200
```

```q
PUT
http://localhost:3001/v1/updateitems/{id}
id = 3
itemname : aaa
itemprice :sasa
itemdescription :sasa

output -> Items updated
        code 200
```
