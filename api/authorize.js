import jwt from "jsonwebtoken";

export const secret = "jf49jfJ.4004k3k3nd";

// Check token middleware
export const require_auth = (req, res, next) => {
  var token = req.body.token || req.params.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(400).json({ status: "error", message: "Failed to authenticate token." });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({ status: "error", message: "No token provided." });
  }
};
