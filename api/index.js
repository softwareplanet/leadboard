import { Router } from "express";
import passport from "passport";
import auth from "./auth";
import user from "./user";
import stage from "./stage";
import funnel from "./funnel";
import lead from "./lead";
import contact from "./contact";

const router = new Router();

router.use("/api", auth);

let authenticate = passport.authenticate("jwt", { session: false });
router.use("/api/user", authenticate, user);
router.use("/api/stage", authenticate, stage);
router.use("/api/funnel", authenticate, funnel);
router.use("/api/lead", authenticate, lead);
router.use("/api/contact", authenticate, contact);

export default router;
