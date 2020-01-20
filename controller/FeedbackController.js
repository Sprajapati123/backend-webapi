var feedbackModel = require('../model/FeedbackModel')

function feedbackInsert(req,res,next) {
    feedbackModel.Feedback.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message
    })
        .then(function (result) {
            next()
        })
        .catch(function (error) {
            next({"status":500,"message":"DB error"});
        })
}

module.exports = {
    feedbackInsert
}