var db = require('../dbconfig/dbconfigs')

const Items = db.sequelize.define('Items', {

        //attributes
        id: {
            type: db.Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        itemname: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        itemprice: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        itemdescription: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        category: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

        image: {
            type: db.Sequelize.STRING,
            allowNull: false
        },

    },

    {
        // options
        freezeTableName: true,
        tableName: 'items'
    }
);

Items.sync({force: false})
    .then(function (result) {
        console.log(result);
    })
    .catch(function (err) {
        console.log(err)
    })


module.exports = {
    Items
}
