import TicketDTO from '../DAOs/DTOs/ticket.dto.js';

export default class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getTickets = async () => {
    return await this.dao.get();
  };
  createTicket = async (ticket) => {
    const ticketToInsert = new TicketDTO(ticket);
    return await this.dao.post(ticketToInsert);
  };
}