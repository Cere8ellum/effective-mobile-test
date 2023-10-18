import express from "express";
// (bodyParser = require("body-parser")),
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const dotenv = require("dotenv").config({
  path: `env/.${process.env.NODE_ENV}.env`,
}).parsed;
import { create, findByUserId } from "./queries/actions-history.query";

// Server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const BASE_URL = `${dotenv.ON_JS_SERVER}${dotenv.ON_JS_PORT}${dotenv.ON_JS_ENDPOINT}`;

//
app.get(`${dotenv.ON_JS_ENDPOINT}`, function (request, response) {
  return response.status(200).send("Всё Ок.");
});

// Создание записи
app.post(`${dotenv.ON_JS_ENDPOINT}/create`, async (request, response) => {
  try {
    const { userId, actionType, createdAt } = request.body;
    const result = await create(userId, actionType, createdAt);

    response.status(200).send(result);
  } catch (e) {
    response.status(400).send(e.message);
  }
});

// Получение по id юзера
app.get(`${dotenv.ON_JS_ENDPOINT}/:userid`, async (request, response) => {
  try {
    const result = await findByUserId(request.params.userid);

    response.status(200).send(result);
  } catch (e) {
    response.status(400).send(e.message);
  }
});

app.listen(dotenv.ON_JS_PORT.replace(":", ""), () =>
  console.log(`Application is running on: ${BASE_URL}`)
);

// HMR
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() =>
    app.close((err) => {
      console.log("server closed");
      process.exit(err ? 1 : 0);
    })
  );
}
