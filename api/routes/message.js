const { MessagesController } = require("./../controllers");
const { checkTokenAuth } = require("./../middleware");

module.exports = app => {
  app.post("/messages", checkTokenAuth, MessagesController.create);
};
