import { Router } from "express";
import { getTickets,createTicket,deleteTicket,getTicketsById,updateTicket } from "../controllers/tickets.controller.js";
const router = Router();

router.get("/", getTickets);

router.get("/:tid", getTicketsById);

router.post("/", createTicket);

router.put("/:tid", updateTicket); 

router.delete("/:tid", deleteTicket);


export default router;