export default class TicketDTO{
    constructor(ticket){
        this.code = ticket.code;
        this.purchaser = ticket.user_id;
        this.amount = ticket.amount;
    }
}