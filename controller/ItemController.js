var itemModel = require('../model/ItemModel')

function itemRegister(req,res,next) {
    itemModel.Items.create({
        itemname:req.body.itemname,
        itemprice:req.body.itemprice,
        itemdescription:req.body.itemdescription,
        category:req.body.category,
        image: req.file.filename
    })
        .then(function (result) {
            next()
        })
        .catch(function (error) {
            next({"status":500,"message":"DB error"});
        })
}

module.exports = {
    itemRegister
}