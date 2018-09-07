import http from "http";

import express from "./express";
import api from "./api";
import { runNotificationService } from "./notifications/mailgun";

const app = express(api);
const server = http.createServer(app);

const port = normalizePort(process.env.PORT || "5000");

setImmediate(() => {
  if (port) {
    server.listen(port, () => {
      console.log("Express server listening on port %s", port);
    });
  } else {
    console.error("Port from environment is not valid");
    process.exit(1);
  }
});

runNotificationService();

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export default app;
