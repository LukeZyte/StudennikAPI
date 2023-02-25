const { username, password, schema } = require("./credentials");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(schema, username, password, {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
