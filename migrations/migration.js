const Sequelize = require('sequelize');

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