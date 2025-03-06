import { ticketServices } from "../repositories/services.js";

export const getTickets = async (req, res) => {
    try {
        const tickets = await ticketServices.getTickets(req.query);
        
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
}

export const getTicketsById = async (req, res) => {
    try {
        const ticket = await ticketServices.getTicketById(req.params?.tid);
        res.status(200).json({ status: "success", payload:ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

export const createTicket = async (req, res) => {
    try {
        const ticket = await ticketServices.createTicket(req.body);
        res.status(201).json({ status: "success", payload: ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

export const updateTicket = async (req, res) => {
    try {
        // console.log(req.params);
        
        const ticket = await ticketServices.updateTicket(req.params?.tid, req.body);
        res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
} 

export const deleteTicket = async (req, res) => {
    try {
        const ticket = await ticketServices.deleteById(req.params?.tid);
        res.status(200).json({ status: "success", payload: ticket });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}