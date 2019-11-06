const Sequelize = require("sequelize");
const config = require("config");
const { db } = config;

const sequelize = new Sequelize(db.name, db.user, db.password, {
  dialect: "postgres",
  host: db.host,
  port: db.port,
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = sequelize;
