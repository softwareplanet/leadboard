import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from './mongoose'
const passport = require ("passport");
export default (routes) => {
  const app = express();

  app.use(passport.initialize());
  require('./api/passport')(passport);

  app.use(cors());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(routes);

  return app
}
