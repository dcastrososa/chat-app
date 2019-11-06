const sequelize = require("./../database");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Message = sequelize.define("messages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  message: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  },
  chat_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "chats",
      key: "id"
    }
  }
});

Message.belongsTo(User, { foreignKey: "user_id" });

module.exports = Message;
