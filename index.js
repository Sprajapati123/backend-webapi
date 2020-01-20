var controller=require('./controller/userController');

var itemController = require('./controller/ItemController')

var bookingController  = require('./controller/BookingController')

var itemModel = require('./model/ItemModel')

var bookingModel = require('./model/BookingModel')

var feedbackModel = require('./model/FeedbackModel')

var userModel  =require('./model/userModel')

var feedbackController = require('./controller/FeedbackController')

var express=require('express');


var authController = require('./controller/AuthController')

var path=require('path');

var app=express();

var bodyParser = require('body-parser');

var db = require('./dbconfig/dbconfigs')

var swaggerJSdoc = require('swagger-jsdoc');

var swaggerUi = require('swagger-ui-express');

var swaggerDefinition ={
    info: {
        // API informations (required)
        title: 'MyMart', // Title (required)
        version: 'v1', // Version (required)
        description: 'A sample API for assignment', // Description (optional)
    },
    host:'localhost:3001', // Host (optional)
    basePath: '/', // Base path (optional)
    securityDefinitions :{
        bearerAuth : {
            type: 'apiKey',
            name: 'authorization',
            scheme : 'bearer',
            in : 'header'
        }
    }

}


var options = {
    swaggerDefinition,
    apis: ['./index.js'], // <-- We add this property:

}

var swaggerSpec = swaggerJSdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

var multer = require('multer');

var mystorage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'uploads')
    },

    filename: (req, file, cb) => {
        cb(null,file.originalname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});

var uploads= multer({storage: mystorage});


app.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type,X-Requested-With,authorization');
    next();
})

app.use(bodyParser.json());



/**
 * @swagger
 * /v1/users/register:
 *   post:
 *    tags:
 *     - User registration
 *    name: Register name
 *    summary: This API registers a single user
 *    description: Register a single user
 *    produces: application/json
 *    parameters:
 *    - name: user
 *      in: body
 *      schema:
 *        type: object
 *        properties:
 *         username:
 *          type: string
 *         password:
 *          type: string
 *         address:
 *          type: string
 *         contact:
 *          type: string
 *         gender:
 *          type:string
 *         userType:
 *          type:string
 *    responses:
 *      201:
 *        description: User was registered
 *      409:
 *       description: username already exists
 *      500:
 *       description: DB Error
 *
 */

app.post('/v1/users/register',controller.validator,controller.hashGenerator,controller.registerUser,function (req,res,next) {
    res.status(201);
    res.send({"message":"successfully registered"});
})



/**
 * @swagger
 * /v1/users/login:
 *   post:
 *    tags:
 *     - User login
 *    name: login
 *    summary: This API login a registered user
 *    description: login a registered user
 *    produces: application/json
 *    parameters:
 *    - name: user
 *      in: body
 *      schema:
 *        type: object
 *        properties:
 *         username:
 *          type: string
 *         password:
 *          type: string
 *    responses:
 *      205:
 *        description: Login success
 *      500:
 *       description: credientals didn't match
 *
 */

app.post('/v1/users/login',authController.verify,authController.check,authController.jwtTokenGen,authController.sendUserData,function (req,res,next) {
    res.status(205);
    res.send(
        {
            "message": "Login success !",
            "token": req.genToken,
        }
        );

    console.log(req.genToken)
})



/**
 * @swagger
 * /v1/addItems:
 *   post:
 *    tags:
 *     - Item registration by admin
 *    name: Register item
 *    summary: This API registers a item
 *    description: Register a item
 *    produces: application/json
 *    parameters:
 *    - name: user
 *      in: body
 *      schema:
 *        type: object
 *        properties:
 *         itemname:
 *          type: string
 *         itemprice:
 *          type: string
 *         itemdescription:
 *          type: string
 *         category:
 *          type: string
 *         image:
 *          type:string
 *    responses:
 *      206:
 *        description: Items added succesfully
 *      500:
 *       description: DB Error
 *
 */


app.post('/v1/addItems',uploads.single('image'),itemController.itemRegister,authController.tokenVerify,function (req,res,next) {
res.status(206);
res.send({"message":"Items added succesfully"})
})


/**
 * @swagger
 * /v1/viewItems:
 *   get:
 *     tags:
 *       - View Items
 *     name: Viewing all items
 *     summary: Displays all item
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of items is displayed
 *       500:
 *         description: DB error
 */

app.get('/v1/viewItems',function (req,res,next) {
    // console.log(req.headers)
itemModel.Items.findAll({
    // attributes:['id','itemname','itemprice','itemdescription','category','image']
})
    .then(function (result) {
        // console.log(result)
        res.status(200)
        res.json(result);
    })
    .catch(function (err) {
        console.log(err)
    })
})


/**
 * @swagger
 * /v1/viewbooking:
 *   get:
 *     tags:
 *       - View Items Added to cart
 *     name: Viewing all items added to cart
 *     summary: Displays items added to cart
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of items Which is added to cart is displayed
 *       500:
 *         description: DB error
 */

app.get('/v1/viewbooking',function (req,res,next) {
    bookingModel.Booking.findAll({
        // attributes:['id','itemname','itemprice','itemdescription','category','image']
    })
        .then(function (result) {
            // console.log(result)
            res.status(200)
            res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        })
})

/**
 * @swagger
 * /v1/viewbooking/{id}:
 *   get:
 *     tags:
 *       - View Items added to cart
 *     name: Viewing all items added to cart
 *     summary: Displays items added to cart
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     responses:
 *       200:
 *         description: A list of items added to cart is displayed
 *       500:
 *         description: DB error
 */



app.get('/v1/viewbooking/:id',function (req,res,next) {
    console.log(req.params.id)
    bookingModel.Booking.findAll({
        // attributes:['id','itemname','itemprice','itemdescription','category','image']
        where :{uid:req.params.id}
    })
        .then(function (result) {
            // console.log(result)

            res.status(200)
            res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        })
})



/**
 * @swagger
 * /v1/viewmessages:
 *   get:
 *     tags:
 *       - View Message
 *     name: Viewing all message from users
 *     summary: Viewing all messages
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Message form user can be seen by admin
 *       500:
 *         description: DB error
 */


app.get('/v1/viewmessages',authController.tokenVerify,function (req,res,next) {
    feedbackModel.Feedback.findAll({
        attributes:['id','name','email','phone','message']
    })
        .then(function (result) {
            // console.log(result)
            res.status(200)
            res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        })
})

/**
 * @swagger
 * /v1/deleteitem/{id}:
 *   delete:
 *     tags:
 *       - Deleting items
 *     name: Deleting items
 *     summary: Deleting items
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     responses:
 *       200:
 *         description: A item is deleted
 *       500:
 *         description: Error in deleting items
 */


app.delete('/v1/deleteitem/:item_id',authController.tokenVerify,function (req,res) {
    console.log(req.params.item_id)

    itemModel.Items.destroy({
        where: { id : req.params.item_id }
    })
        .then(function () {
        res.status(200)
            res.send({"message":"Deleted successfully"})
        })
        .catch(function (err) {
            next({"status":"500","message":"Error in deleting items"})
        })
})



/**
 * @swagger
 * /v1/deletecart/{id}:
 *   delete:
 *     tags:
 *       - Deleting items from cart
 *     name: Deleting items from cart
 *     summary: Deleting items from cart
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     responses:
 *       200:
 *         description: A item is deleted from cart
 *       500:
 *         description: Error in deleting items
 */

app.delete('/v1/deletecart/:item_id',function (req,res) {
    console.log(req.params.item_id)

    bookingModel.Booking.destroy({
        where: { id : req.params.item_id }
    })
        .then(function () {
            res.status(200)
            res.send({"message":"Deleted successfully"})
        })
        .catch(function (err) {
            next({"status":"500","message":"Error in deleting items"})
        })
})


/**
 * @swagger
 * /v1/geteachitem/{id}:
 *   get:
 *     tags:
 *       - Fetching each item
 *     name: Fetching each item
 *     summary: Fetching each item
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: fetching each item
 *       500:
 *         description: error
 */

app.get('/v1/geteachitem/:item_id',authController.tokenVerify,function (req,res) {
    // console.log()

    itemModel.Items.findOne({
        where:{ id:req.params.item_id }

    })
        .then(function (result) {
            res.status(201)
            res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})


/**
 * @swagger
 * /v1/updateitems/{id}:
 *   put:
 *     tags:
 *      - Items
 *     description: Updates item.
 *     produces: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          itemname:
 *           type: string
 *          itemprice:
 *           type:string
 *          itemdescription:
 *           type:string
 *          category:
 *           type:string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       500:
 *         description: error
 */

app.put('/v1/updateitems/:item_id', authController.tokenVerify, function(req, res) {

    itemModel.Items.update({
        itemname: req.body.itemname,
        itemprice: req.body.itemprice,
        itemdescription: req.body.itemdescription,
        category: req.body.category,

    }, {
        where: {
            id: req.params.item_id
        }
    })
        .then(function(result) {
            res.status(201);
            res.send({
                "message": "Item Edited succesfully"
            })
        })
        .catch(function(err) {

        })
})


/**
 * @swagger
 * /v1/viewusers:
 *   get:
 *     tags:
 *       - Getting registered users
 *     name: Fetching users
 *     summary: Fetching users
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: fetching users
 *       500:
 *         description: error
 */

app.get('/v1/viewusers',authController.tokenVerify,function (req,res) {
    userModel.User.findAll({
        attributes:['id','username','password','address','contact','gender','userType']
    })
        .then(function (result) {
            // console.log(result)
            res.status(200)
            res.json(result);
        })
        .catch(function (err) {
            console.log(err)
        })
})




/**
 * @swagger
 * /v1/deleteuser/{id}:
 *   delete:
 *     tags:
 *       - Deleting users
 *     name: Deleting users
 *     summary: Deleting users.
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     responses:
 *       200:
 *         description: A user is deleted
 *       500:
 *         description: Error in deleting Users
 */

app.delete('/v1/deleteuser/:user_id',authController.tokenVerify,function (req,res) {

    userModel.User.destroy({
        where: { id : req.params.user_id }
    })
        .then(function () {
            res.status(200)
            res.send({"message":"Deleted successfully"})
        })
        .catch(function (err) {
            next({"status":"500","message":"Error in deleting Users"})
        })
})



/**
 * @swagger
 * /v1/geteachuser/{id}:
 *   get:
 *     tags:
 *       - Fetching each user
 *     name: Fetching each user
 *     summary: Fetching each user
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: fetching each user
 *       500:
 *         description: error
 */

app.get('/v1/geteachuser/:user_id',authController.tokenVerify,function (req,res) {
    // console.log()

    userModel.User.findOne({
        where:{ id:req.params.user_id }

    })
        .then(function (result) {
            res.status(201)
            res.json(result)
        })
        .catch(function (err) {
            next({"status":500,"message":"error"})
        })
})


/**
 * @swagger
 * /v1/updateusers/{id}:
 *   put:
 *     tags:
 *      - Updating user profile admin panel
 *     description: Updates a user by admin
 *     produces: application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          username:
 *           type: string
 *          address:
 *           type:string
 *          contact:
 *           type:string
 *          gender:
 *           type:string
 *          userType:
 *           type:string
 *     responses:
 *       200:
 *         description: User Edited successfully
 *       500:
 *         description: Error
 */

app.put('/v1/updateusers/:user_id',authController.tokenVerify, function(req, res) {

    userModel.User.update({
        username: req.body.username,
        address: req.body.address,
        contact: req.body.contact,
        gender: req.body.gender,
        userType: req.body.userType
    }, {
        where: {
            id: req.params.user_id
        }
    })
        .then(function(result) {
            res.status(201);
            res.send({
                "message": "User Edited successfully"
            })
        })
        .catch(function(err) {
        console.log(err)
        })
})


/**
 * @swagger
 * /v1/updatemydetail/{id}:
 *   put:
 *     tags:
 *      - Updating User profile user panel
 *     description: Updataing user details by user
 *     produces: application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id
 *     - name: user
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          username:
 *           type: string
 *          address:
 *           type:string
 *          contact:
 *           type:string
 *          gender:
 *           type:string
 *     responses:
 *       201:
 *         description: Profile Updated successfully
 *       500:
 *         description: Error
 */

app.put('/v1/updatemydetail/:uid',function(req, res) {
-
  
    userModel.User.update({
        username: req.body.username,
        address: req.body.address,
        contact: req.body.contact,
        gender: req.body.gender,

    }, {
        where: {
            id: req.params.uid
        }
    })
        .then(function(result) {
            res.status(201);
            res.send({
                "message": "Profile Updated successfully"
            })
        })
        .catch(function(err) {

        })
})


/**
 * @swagger
 * /v1/addtocart:
 *   post:
 *    tags:
 *     - Items added to cart
 *    name: Add items to cart
 *    summary: This API adds item to cart
 *    description: Add items to cart
 *    produces: application/json
 *    parameters:
 *    - name: Items
 *      in: body
 *      schema:
 *        type: object
 *        properties:
 *         uname:
 *          type: string
 *         uid:
 *          type: string
 *         iid:
 *          type: string
 *         iname:
 *          type: string
 *         iprice:
 *          type:string
 *         icategory:
 *          type:string
 *         idescription:
 *          type:string
 *         city:
 *          type:string
 *         street:
 *          type:string
 *         quantity:
 *          type:string
 *    responses:
 *      202:
 *        description: Added to Cart
 *      500:
 *       description: DB Error
 *
 */

app.post('/v1/addtocart',bookingController.addtocart,authController.tokenVerify,function (req,res) {
    res.status(202);
    res.send({"message":"Added to Cart"});
})



/**
 * @swagger
 * /v1/feedback:
 *   post:
 *    tags:
 *     - User feedback
 *    name: Feedback
 *    summary: This API sends feedback to admin
 *    description: send feedback
 *    produces: application/json
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *    - name: feedback
 *      in: body
 *      schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *         email:
 *          type: string
 *         phone:
 *          type: string
 *         message:
 *          type: string
 *    responses:
 *      201:
 *        description: Message sent successful
 *      500:
 *       description: DB Error
 *
 */

app.post('/v1/feedback',feedbackController.feedbackInsert,authController.tokenVerify,function (req,res) {
    res.status(201);
    res.send({"message":"Message sent successful"});
})


app.use(function (err,req,res,next) {
    res.status(err.status);
    res.send({"message":err.message});
})

/*hosting uploads folder */

var publicDir = require('path').join(__filename,'/uploads');
app.use(express.static(publicDir));

app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/uploads', express.static(__dirname + '/uploads'));


app.get("/uploads",function(req,res,next){
    res.send(publicDir)
})






app.listen(3001);

module.exports = app;