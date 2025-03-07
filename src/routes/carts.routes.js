import { Router } from "express";
import passport from "passport";
import { getCarts,
         addProductToCart,
         createCart,
         deleteProduct,
         deleteAllProductsFromCart,
         getCartById,
         updateCart,
         updateOneProductById } from "../controllers/carts.controller.js";
import { handleRolePolicies } from "../middlewares/handle-policies.js";



const router = Router();

router.get("/", passport.authenticate('hasJWT',{session:false}), getCarts);

router.get("/:id",passport.authenticate('hasJWT',{session:false}), getCartById);

router.delete("/:id",passport.authenticate('hasJWT',{session:false}), deleteAllProductsFromCart);

router.post("/",passport.authenticate('hasJWT',{session:false}), createCart);

router.put("/:cid",passport.authenticate('hasJWT',{session:false}), updateCart);

router.post("/:cid/product/:pid",handleRolePolicies(["USER"]), addProductToCart);

router.put("/:cid/product/:pid", passport.authenticate('hasJWT',{session:false}),updateOneProductById);

router.delete("/:cid/product/:pid", passport.authenticate('hasJWT',{session:false}),deleteProduct);

export default router;