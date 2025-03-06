import { Router } from "express";
import handleRolePolicies from "../middlewares/handle-policies.js";
import passport from "passport";
import { current_admin, current } from "../controllers/session.controller.js";

// handleRolePolicies;
const router = Router();

router.get('/current',passport.authenticate('current',{session:false}), current)

router.get('/current_admin',handleRolePolicies(["ADMIN",]),current_admin)

export default router;
