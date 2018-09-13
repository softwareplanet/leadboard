import { Router } from "express";
import { loadLeads } from "./searchAggregation";
const router = new Router();

// @route   GET api/searchResults
// @desc    Search result by domain and regex
// @access  Private
router.get("/",async (req, res) => {
  try {
    let leads = await loadLeads(req.user.domain, req.query.query);
    res.json({
      result: [ ...leads ],
    });
  } catch (error) {
    res.status(404).json({ errors: { message: error } });
  }
});

export default router;
