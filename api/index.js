import { Router } from "express";

import auth from "./auth";
import user from "./user";
import stage from "./stage";
import funnel from "./funnel";
import lead from "./lead";
import organization from './organization';

const router = new Router();

router.use("/api", auth);
router.use("/api/user", user);
router.use("/api/stage", stage);
router.use("/api/funnel", funnel);
router.use("/api/lead", lead);
router.use("/api/organization", organization);

export default router;
