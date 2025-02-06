import { Router } from "express";
import handlePolicies from "../middlewares/handle-policies.js";
import passport from "passport";

handlePolicies;
const router = Router();

router.get('/current',passport.authenticate('current',{session:false}), (req,res)=>{
  res.send(req.user)
})

export default router;
