var db = require('../dbconfig/dbconfigs')

const Booking = db.sequelize.define('Booking', {

        //attributes
        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        uname: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        uid: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        iid: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        iname: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        iprice: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        icategory: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        idescription: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        city: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        street: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        quantity: {
            type: db.Sequelize.STRING,
            allowNull: false
        }

    },

    {
        // options
        freezeTableName: true,
        tableName: 'booking'
    }
);

Booking.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    Booking
}
