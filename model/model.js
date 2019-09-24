var conn = require("../dbconn.js")
const Sequelize = require('sequelize');
const User = conn.sequelize.define('user', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING
  },
  email : {
    type : Sequelize.STRING
  },
  password : {
    type : Sequelize.STRING
  }
}, {
  // timestamps : false
  });

  exports.User = User