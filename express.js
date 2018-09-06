import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import passport from "passport";
import { connectToMongoose } from "./mongoose";
import path from "path";

export default (routes) => {
  const app = express();
  connectToMongoose();
  app.use(passport.initialize());
  require("./api/passport")(passport);

  app.use(cors());
  app.use(compression());
  app.use(morgan("dev"));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(routes);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build/", "index.html"));
    });
    app.use(morgan("common"));
  } else {
    app.use(morgan("dev"));
  }

  return app;
};
