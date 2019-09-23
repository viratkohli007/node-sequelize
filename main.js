const Sequelize = require('sequelize');
const express = require('express')
const port = 8080

var conn = require("./dbconn.js")

var app = express()
conn.connection()

const User = conn.sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    }
  }, {
    // timestamps : false
    });

User.sync({ force: false }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
        firstName: 'John3',
        lastName: 'Hancock3'
    });
});

app.listen(port, ()=>{
    console.log('server is listining on port '+port)
})
