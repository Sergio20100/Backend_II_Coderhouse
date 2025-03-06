import { Router } from "express";
import { getProducts, 
         getProductById,
         createProdut, 
         deleteProductById,
         updateProductById } from "../controllers/products.controller.js";
const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/", createProdut);

router.put("/:pid", updateProductById);

router.delete("/:pid", deleteProductById);


export default router;