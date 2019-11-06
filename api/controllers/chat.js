const { Chat, User, Message } = require("./../models");
const { getUserFromToken } = require("./../utils");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

class ChatsController {
  static async create(req, res) {
    const { user_id } = req.body;

    try {
      const userLoggued = await getUserFromToken(req.headers["x-access-token"]);
      const response = await Chat.create({
        user_one_id: parseInt(user_id),
        user_two_id: userLoggued.id
      });

      const chat = await Chat.findByPk(response.dataValues.id, {
        include: [{ model: Message, include: [User] }]
      });
      const user = await User.findByPk(user_id);
      chat.dataValues.user = user;
      delete chat.dataValues.user_one_id;
      delete chat.dataValues.user_two_id;

      res.status(201).json(chat);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async index(req, res) {
    try {
      const userLoggued = await getUserFromToken(req.headers["x-access-token"]);

      const response = await Chat.findAll({
        where: {
          [Op.or]: [
            { user_one_id: userLoggued.id },
            { user_two_id: userLoggued.id }
          ]
        },
        include: [{ model: Message, include: [User] }],
        order: [[{ model: Message, as: "messages" }, "created_at", "ASC"]]
      });

      const chats = [];
      for (let i = 0; i < response.length; i++) {
        const value = response[i].dataValues;

        const userId =
          value.user_one_id !== userLoggued.id
            ? value.user_one_id
            : value.user_two_id;
        const user = await User.findByPk(userId);
        value.user = user.dataValues;
        delete value.user_one_id;
        delete value.user_two_id;

        chats.push(value);
      }

      res.status(200).json(chats);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ChatsController;
