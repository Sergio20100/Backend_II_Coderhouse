import { Router } from "express";
import { ticketServices } from "../repositories/services.js";
const router = Router();

router.get("/", async (req, res) => {
    try {
        const tickets = await ticketServices.getAll(req.query);
        
        const jsonResponse = { 
                              status: "success", 
                              payload:tickets.docs,
                              limit: tickets.limit,
                              totalPages: tickets.totalPages,
                              prevPage: tickets.prevPage,
                              nextPage: tickets.nextPage,
                              page: tickets.page,
                              hasNextPage: tickets.hasNextPage,
                              hasPrevPage: tickets.hasNextPage,

                            }
        res.status(200).json(jsonResponse);
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.get("/:tid", async (req, res) => {
    try {
        const ticket = await ticketServices.getOneById(req.params?.tid);
        res.status(200).json({ status: "success", payload:ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        const ticket = await ticketServices.insertOne(req.body);
        res.status(201).json({ status: "success", payload: ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});

router.put("/:tid", async (req, res) => {
    try {
        // console.log(req.params);
        
        const ticket = await ticketServices.updateOneById(req.params?.tid, req.body);
        res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}); 

router.delete("/:tid", async (req, res) => {
    try {
        const ticket = await ticketServices.deleteOneById(req.params?.tid);
        res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
});


export default router;