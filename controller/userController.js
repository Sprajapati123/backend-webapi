var userModel = require('../model/userModel')

var bcrypt = require('bcrypt');
var saltRounds = 10;

function hashGenerator(req,res,next) {

   bcrypt.hash(req.body.password,saltRounds)
       .then(function (hash) {
           // console.log(hash);
           req.hashvalue = hash;
           next();

       })
       .catch(function (err) {

       })
}


function registerUser(req,res,next) {

    userModel.User.create({
        username: req.body.username,
        password:req.hashvalue,
        address: req.body.address,
        contact: req.body.contact,
        gender: req.body.gender,
        userType: 'User'


    })
        .then(function (result) {

            next();
        })
        .catch(function (err) {
                console.log('bnm')
            next({"status":500,"message":"DB error"});
        })
}

function validator(req,res,next){
    userModel.User.findOne({
        where:{username:req.body.username}
    })
        .then(function (result) {

        if (result.dataValues != ''){
            next({"status":400,"message":"user already exists"})
        }
        })
        .catch(function (err) {
           next();

        })
}
module.exports = {
    registerUser,
    hashGenerator,
    validator
}