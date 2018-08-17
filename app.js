import http from "http";
const ip = "127.0.0.1";
const port = 5000;

import express from "./express";
import api from "./api";

const app = express(api);
const server = http.createServer(app);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log("Express server listening on http://%s:%d", ip, port);
  });
});

export default app;
