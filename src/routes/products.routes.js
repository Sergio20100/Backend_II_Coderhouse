import { Router } from "express";
import { getProducts, 
         getProductById,
         createProdut, 
         deleteProductById,
         updateProductById } from "../controllers/products.controller.js";
import {handleRolePolicies} from "../middlewares/handle-policies.js";
import passport from "passport";


const router = Router();

router.get("/", passport.authenticate('hasJWT',{session:false}), getProducts);

router.get("/:pid",passport.authenticate('hasJWT',{session:false}), getProductById);

router.post("/",  handleRolePolicies(["ADMIN"]), createProdut);

router.put("/:pid", handleRolePolicies(["ADMIN"]), updateProductById);

router.delete("/:pid", handleRolePolicies(["ADMIN"]), deleteProductById);


export default router;