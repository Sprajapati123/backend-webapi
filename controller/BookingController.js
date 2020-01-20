var bookingModel = require('../model/BookingModel')

function addtocart(req,res,next) {

    bookingModel.Booking.create({

        uname:req.body.uname,
        uid:req.body.uid,
        iname:req.body.iname,
        iid:req.body.iid,
        iprice:req.body.iprice,
        icategory:req.body.icategory,
        idescription:req.body.idescription,
        street:req.body.street,
        city:req.body.city,
        quantity:req.body.quantity,

    })

        .then(function (result) {
            next()
        })
        .catch(function (error) {
            console.log(error)
            next({"status":500,"message":"DB error"});
        })
}

module.exports = {
    addtocart
}