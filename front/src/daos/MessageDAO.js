import Crud from "./Crud";

export default class MessageDAO extends Crud {
  constructor(headers) {
    super("messages", headers);
  }
}
