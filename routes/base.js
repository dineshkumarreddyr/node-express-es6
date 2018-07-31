import { Router } from "express";
import { request } from "http";

const baseRouter = Router();

baseRouter.get("/", (request, response) => {
  response.send("Welcome");
});

baseRouter.get("/test", (request, response) => {
  response.send("Testing API server");
});

export default baseRouter;
