import express from "express";
// (bodyParser = require("body-parser")),
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const dotenv = require("dotenv").config({
  path: `env/.${process.env.NODE_ENV}.env`,
}).parsed;
import { create } from "./queries/actions-history.query";

// Server
const app = express();
const globalPrefix = "api";
const BASE_URL = `${dotenv.ON_JS_SERVER}${dotenv.ON_JS_PORT}${dotenv.ON_JS_ENDPOINT}`;

// Swagger

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Actions History API",
    },
    servers: [
      {
        url: `${BASE_URL}`,
      },
    ],
  },
  apis: [`${__dirname}/routes/*.js`],
};

const specs = swaggerJsdoc(options);
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.post("/create", function (request, response) {
  create();
});

app.listen(3000, () => console.log(`Application is running on: ${BASE_URL}`));

// HMR
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => void app.close());
}
