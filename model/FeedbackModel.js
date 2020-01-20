var db = require('../dbconfig/dbconfigs')

const Feedback = db.sequelize.define('Feedback', {

        //attributes
        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        email: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        phone: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        message: {
            type: db.Sequelize.STRING,
            allowNull: false
        },


    },

    {
        // options
        freezeTableName: true,
        tableName: 'feedback'
    }
);

Feedback.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    Feedback
}
