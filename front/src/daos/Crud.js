import axios from "axios";
import config from "./../config";
import { mockRequestAPI } from "./../constants";
import { cloneDeep } from "./../utils";

/**
 * Provides methods to resolve CRUD requests to the API.
 */
export default class Crud {
  constructor(path, headers = {}) {
    this.path = path;
    this.headers = headers;
  }

  /**
   * @param {Ojbect} data, Data to save
   * @returns {Object}
   */
  async create(data) {
    const response = cloneDeep(mockRequestAPI);
    const { success, error } = response;

    try {
      const request = await axios.post(`${config.API_URL}/${this.path}`, data, {
        headers: this.headers
      });
      success.data = request.data;
      return request;
    } catch (err) {
      error.message = err.response;
      return error;
    }
  }

  /**
   * @returns {Array}
   */
  async findAll() {
    const response = cloneDeep(mockRequestAPI);
    const { success, error } = response;
    try {
      const request = await axios.get(`${config.API_URL}/${this.path}`, {
        headers: this.headers
      });
      success.data = request.data;
      return success;
    } catch (err) {
      error.message = err.response;
      return error;
    }
  }

  /**
   * @param {Number} id, Model Id
   * @returns {Object}
   */
  async findById(id) {
    return axios.get(`${config.API_URL}/${this.path}/${id}`);
  }

  /**
   * @param {Number} id, Model Id
   * @returns {Object}
   */
  async update(id) {
    return axios.put(`${config.API_URL}/${this.path}/${id}`);
  }
}
