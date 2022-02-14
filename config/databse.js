require("dotenv").config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect,
    operatorsAliases: false,

    pool: {
        max: parseInt(process.env.max),
        min: parseInt(process.env.min),
        acquire: parseInt(process.env.acquire),
        idle: parseInt(process.env.idle),
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('../models/user.model.js')(sequelize, Sequelize);

module.exports = db;
