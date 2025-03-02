import { Router } from "express";
import { productServices } from "../repositories/services.js";
const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await productServices.getProducts(req.query);
        
        const jsonResponse = { 
                              status: "success", 
                              payload:products.docs,
                              limit: products.limit,
                              totalPages: products.totalPages,
                              prevPage: products.prevPage,
                              nextPage: products.nextPage,
                              page: products.page,
                              hasNextPage: products.hasNextPage,
                              hasPrevPage: products.hasNextPage,

                            }
        res.status(200).json(jsonResponse);
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const product = await productServices.getProductById(req.params?.pid);
        res.status(200).json({ status: "success", payload:product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        const product = await productServices.createProdut(req.body);
        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.put("/:pid", async (req, res) => {
    try {
        // console.log(req.params);
        
        const product = await productServices.updateById(req.params?.pid, req.body);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const product = await productServices.deleteById(req.params?.pid);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});


export default router;