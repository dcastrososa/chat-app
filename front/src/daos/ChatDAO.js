import Crud from "./Crud";

export default class ChatDao extends Crud {
  constructor(headers) {
    super("chats", headers);
  }
}
