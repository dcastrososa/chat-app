const { UsersController } = require("./../controllers");
const { checkTokenAuth } = require("./../middleware");

/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *      email:
 *        type: string
 */

module.exports = app => {
  /**
   * @swagger
   * /users:
   *  post:
   *    tags:
   *      - Users
   *    name: Save user
   *    summary: Save user
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: body
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *            password:
   *              type: string
   *          required:
   *            - email
   *            - password
   *    responses:
   *      201:
   *        description: User saved
   *      500:
   *        description: Internal server error
   */
  app.post("/users", UsersController.create);

  /**
   * @swagger
   * /login:
   *  post:
   *    tags:
   *      - Users
   *    name: Login
   *    summary: Login
   *    consumes:
   *      - application/json
   *    produces:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: body
   *        schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *            password:
   *              type: string
   *    responses:
   *      200:
   *        description: Success
   *        schema:
   *          type: object
   *          properties:
   *            message:
   *              type: string
   *            token:
   *              type: string
   *      401:
   *       description: Invalid credentials
   */
  app.post("/login", UsersController.login);

  app.get("/users", checkTokenAuth, UsersController.index);
};
