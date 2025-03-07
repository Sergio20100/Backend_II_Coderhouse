import { Router } from "express";
import { handleRolePolicies } from "../middlewares/handle-policies.js";
import passport from "passport";
import { current_admin, current,userLogout } from "../controllers/session.controller.js";
import { registerUser, userLogin } from "../controllers/user.controller.js";

// handleRolePolicies;
const router = Router();

router.get('/current',passport.authenticate('hasJWT',{session:false}), current);
router.get('/current_admin', handleRolePolicies(["ADMIN"]),current_admin);
router.get('/logout',userLogout);
router.post("/login",userLogin);
router.post('/register', registerUser);
export default router;
