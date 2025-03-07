import { Router } from "express";
import { getTickets,createTicket,deleteTicket,getTicketsById,updateTicket } from "../controllers/tickets.controller.js";
import passport from "passport";
const router = Router();

router.get("/", passport.authenticate('hasJWT',{session:false}),getTickets);

router.get("/:tid",passport.authenticate('hasJWT',{session:false}), getTicketsById);

router.post("/",passport.authenticate('hasJWT',{session:false}), createTicket);

router.put("/:tid",passport.authenticate('hasJWT',{session:false}), updateTicket); 

router.delete("/:tid",passport.authenticate('hasJWT',{session:false}), deleteTicket);


export default router;