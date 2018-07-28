import { Router } from "express";

import auth from "./auth";
import stage from "./stage";
import funnel from "./funnel";
import lead from "./lead";

const router = new Router();
router.use("/auth", auth);
router.use("/stage", stage);
router.use("/funnel", funnel);
router.use("/lead", lead);

export default router;
