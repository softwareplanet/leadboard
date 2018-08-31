import { Router } from "express";
import passport from "passport";
import auth from "./auth";
import user from "./user";
import stage from "./stage";
import funnel from "./funnel";
import lead from "./lead";
import organization from "./organization";
import contact from "./contact";
import activity from "./activity"
const router = new Router();
const authenticate = passport.authenticate("jwt", { session: false });

router.use("/api", auth);
router.use("/api/user", authenticate, user);
router.use("/api/stage", authenticate, stage);
router.use("/api/funnel", authenticate, funnel);
router.use("/api/lead", authenticate, lead);
router.use("/api/organization", authenticate, organization);
router.use("/api/contact", authenticate, contact);
router.use("/api/activity", authenticate, activity);

export default router;
