const { eventsMessages } = require("./../constants");

module.exports = io => {
  const chatSpace = io.of("/chat");

  chatSpace.on("connection", function(socket) {
    socket.on(`${eventsMessages.NEW_MESSAGE}`, function(message) {
      // Broadcast the event again to the chat.
      chatSpace.emit(
        `${eventsMessages.NEW_MESSAGE}-${message.chatId}`,
        message.message
      );
    });

    socket.on(`${eventsMessages.NEW_CHAT}`, function(data) {
      const { userId, chat } = data;

      chatSpace.emit(`${eventsMessages.NEW_CHAT}-${userId}`, chat);
    });
  });
};
