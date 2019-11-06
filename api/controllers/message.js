const { Message, User } = require("./../models");
const { getUserFromToken } = require("./../utils");

class MessagesController {
  static async create(req, res) {
    const { message, chat_id } = req.body;

    try {
      const userLoggued = await getUserFromToken(req.headers["x-access-token"]);
      const response = await Message.create({
        message,
        chat_id,
        user_id: userLoggued.id
      });

      const messageData = await Message.findByPk(response.dataValues.id, {
        include: [{ model: User }]
      });
      res.status(201).json(messageData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MessagesController;
