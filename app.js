import http from "http";
import express from "./express";
import api from "./api";

const app = express(api);
const server = http.createServer(app);

const port = normalizePort(process.env.PORT || "5000");

setImmediate(() => {
  server.listen(port, () => {
    console.log("Express server listening on port %s", port);
  });
});

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
