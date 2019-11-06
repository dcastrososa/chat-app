module.exports = app => {
  require("./users")(app);
  require("./chats")(app);
  require("./message")(app);
};
