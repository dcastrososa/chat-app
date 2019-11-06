import socketIOClient from "socket.io-client";
import config from "./../config";

/**
 * Singleton class for socket
 */
export default class Socket {
  constructor(socket = null, socketChatSpace = null) {
    if (!!Socket.instance) {
      return Socket.instance;
    }

    Socket.instance = this;

    this.socket = socket;
    this.socketChatSpace = socketChatSpace;

    return this;
  }

  init() {
    this.socket = socketIOClient(`${config.API_URL}`);
  }

  getSocket() {
    return this.socket;
  }

  initSocketChatSpace() {
    this.socketChatSpace = socketIOClient(`${config.API_URL}/chat`);
  }

  getSocketChatSpace() {
    return this.socketChatSpace;
  }
}
