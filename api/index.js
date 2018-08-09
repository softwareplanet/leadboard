import { Router } from "express";
const passport = require('passport');
import auth from "./auth";
import user from "./user";
import stage from "./stage";
import funnel from "./funnel";
import lead from "./lead";
const router = new Router();

router.use("/api", auth);
router.use("/api/user",passport.authenticate('jwt', { session: false }),user);
router.use("/api/stage",passport.authenticate('jwt', { session: false }), stage);
router.use("/api/funnel",passport.authenticate('jwt', { session: false }), funnel);
router.use("/api/lead",passport.authenticate('jwt', { session: false }), lead);

export default router;
