import { Router } from "express";
import { getCarts,
         addProductToCart,
         createCart,
         deleteProduct,
         deleteAllProductsFromCart,
         getCartById,
         updateCart,
         updateOneProductById } from "../controllers/carts.controller.js";
const router = Router();

router.get("/", getCarts);

router.get("/:id", getCartById);

router.delete("/:id", deleteAllProductsFromCart);

router.post("/", createCart);

router.put("/:cid", updateCart);

router.post("/:cid/product/:pid", addProductToCart);

router.put("/:cid/product/:pid", updateOneProductById);

router.delete("/:cid/product/:pid", deleteProduct);

export default router;