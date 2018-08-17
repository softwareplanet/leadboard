import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "./mongoose";

export default routes => {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(routes);

  if (process.env.ENV === "PROD") app.use(express.static(path.join(__dirname, "/client/build")));

  return app;
};
