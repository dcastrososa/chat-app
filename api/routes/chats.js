const { ChatsController } = require("./../controllers");
const { checkTokenAuth } = require("./../middleware");

module.exports = app => {
  app.post("/chats", checkTokenAuth, ChatsController.create);
  app.get("/chats", checkTokenAuth, ChatsController.index);
};
