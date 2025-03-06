import TicketDTO from '../DAOs/DTOs/ticket.dto.js';

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getTickets = async (query) => {
    return await this.dao.get(query);
  };
  getTicketById = async (id) => {
    return await this.dao.getById(id);
  };
  createTicket = async (ticket) => {
    const ticketToInsert = new TicketDTO(ticket);
    return await this.dao.post(ticketToInsert);
  };
  updateTicket = async (id,ticket) => {
    const ticketToInsert = new TicketDTO(ticket);
    return await this.dao.put(id,ticketToInsert.ticket);
  };
  deleteById = async (id) => {
    return await this.dao.delete(id);
  };
}