import { Router } from "express";
import { cartServices } from "../repositories/services.js";
const router = Router();

/**
 * @description Ruta para obtener todos los carritos
 */
router.get("/", async (req, res) => {
    try {
        const carts = await cartServices.getAll(req.query);
        res.status(200).json({ status: "success", payload:carts });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

/**
 * @description Ruta para obtener un carrito por ID
 */
router.get("/:id", async (req, res) => {
    try {
        const cart = await cartServices.getOneById(req.params?.id);
        res.status(200).json({ status: "success", payload:cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const cart = await cartServices.deleteAllProducts(req.params?.id);
        res.status(200).json({ status: "success", payload:cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

/**
 * @description Ruta para agregar un carrito
 * @body {"products":["6769f093d6923c74246c7762","6769f0c8d6923c74246c7768"]} o {"products":[]}  
 */
router.put("/:cid", async (req, res) => {
    try {
        // console.log(req.body)
        const cart = await cartServices.updateOne(req.params?.cid, req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});
router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
    
        const cart = await cartServices.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

/**
 * @description Ruta para incrementar en una unidad o agregar un producto específico en un carrito por su ID
 */
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        // console.log(req.body)
        const { cid, pid } = req.params;
        const cart = await cartServices.addProductById(cid,pid);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});
router.put("/:cid/product/:pid", async (req, res) => {
    try {
        // console.log(req.body)
        const { quantity } = req.body;
        const cart = await cartServices.updateOneProductById(req.params?.cid,req.params?.pid,quantity);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const cart = await cartServices.deleteProductById(req.params?.cid,req.params?.pid);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

export default router;