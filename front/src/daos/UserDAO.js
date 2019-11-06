import Crud from "./Crud";
import axios from "axios";
import config from "./../config";
import { mockRequestAPI } from "./../constants";
import { cloneDeep } from "./../utils";

/**
 * Resolves API requests associated with the "Users" model
 */
export default class UserDAO extends Crud {
  constructor(headers) {
    super("users", headers);
  }

  async login({ email, password }) {
    const response = cloneDeep(mockRequestAPI);
    try {
      const request = await axios.post(`${config.API_URL}/login`, {
        email,
        password
      });
      const { success } = response;
      success.data = request.data;
      return success;
    } catch (err) {
      const { error } = response;
      error.message = error.response;
      return error;
    }
  }
}
