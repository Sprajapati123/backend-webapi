var db = require('../dbconfig/dbconfigs')

const query = db.sequelize.query
("SELECT * from booking where busername='user'",
    { type: db.sequelize.QueryTypes.SELECT})
    .then(users => {
        console.log(users)
    })

module.exports={
    query
}