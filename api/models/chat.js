const sequelize = require("./../database");
const { DataTypes } = require("sequelize");
const Message = require("./message");

const Chat = sequelize.define("chats", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_one_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  },
  user_two_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id"
    }
  }
});

Chat.hasMany(Message, { foreignKey: "chat_id" });

module.exports = Chat;
