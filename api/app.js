const express = require("express");
const sequelize = require("./database");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  next();
});

// Swagger
const swaggerDefinition = {
  info: {
    title: "Example API",
    version: "1.0.0",
    description: "Documentation"
  },
  host: "localhost:3000",
  basePath: "/"
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};
const swaggerSpec = swaggerJSDoc(options);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require("./routes")(app);

const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("./socket")(io);

sequelize.sync().then(() => {
  server.listen(3000, () => {
    console.log("listening on 3000");
  });
});
