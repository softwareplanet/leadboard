import { Router } from "express";
import Contact from "../../models/contact";

const router = new Router();

router.get("/", (req, res) => {
  Contact.find({ domain: req.user.domain, name: {$exists: true} }, "name")
    .populate("organization", "_id name")
    .then(contacts => {
      res.json({ data: contacts })
    })
    .catch(error => {
      res.status(400).json({ errors: {message: error} })
    })
});

export default router;