import { Router } from "express";
import Contact from "../../models/contact";

const router = new Router();

router.get("/", function(req, res) {
  const domain = req.query.domain || req.body.domain;
  if(!domain) {
    return res.status(400).json({ errors: {domain: "Domain cannot be empty"} });
  }

  Contact.find({ domain: domain, name: {$exists: true} }, "name")
    .populate("organization")
    .then(contacts => {
      res.json({ data: contacts })
    })
    .catch(error => {
      res.status(400).json({ errors: {message: error} })
    })
});

export default router;