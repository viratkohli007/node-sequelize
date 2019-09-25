const Sequelize = require('sequelize');

const dbname = "test"
const user = "aniket"
const password = ""
const host = "localhost"

const sequelize = new Sequelize(dbname, user, password, {
    host: host,
    dialect: 'postgres'
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


