var db = require('../dbconfig/dbconfigs')

const User = db.sequelize.define('User', {

        //attributes
        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        username: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        password: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        address: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        contact: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        gender: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        userType: {
            type: db.Sequelize.STRING,
            allowNull: false
        }
    },

    {
        // options
        freezeTableName: true,
        tableName: 'users'
    }
);

User.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    User
}
