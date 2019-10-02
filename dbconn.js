const Sequelize = require('sequelize');

const dbname = process.env.DB_NAME
const user = process.env.DB_USER
const password = ""
const host = process.env.DB_HOST

const sequelize = new Sequelize(dbname, user, password, {
    host: host,
    dialect: 'postgresql'
});

function connectionCheck(){
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
}

exports.sequelize = sequelize
exports.connection = connectionCheck