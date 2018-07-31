import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import winston from "./config/winston";

import baseRouter from "./routes/base";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined", { stream: winston.stream }));
app.use("/", baseRouter);

// Error handling
app.use((error, request, response, next) => {
  response.locals.error = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  winston.error(
    `${error.status || 500} - ${error.message} - ${request.originalUrl} - ${
      request.method
    } - ${request.ip}`
  );

  response.status(error.status || 500);
  response.render("error");
});

const server = app.listen(3000, () => {
  console.log("App running at 3000 !!");
});
