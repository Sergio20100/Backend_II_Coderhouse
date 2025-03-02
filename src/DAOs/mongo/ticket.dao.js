import TicketModel from "./models/ticket.model.js";
import ErrorManager from "../../managers/ErrorManager.js";
import { isValidID } from "../../config/database.js";

export default class TicketManager{
    #ticketModel;
    constructor(){
        this.#ticketModel = TicketModel;
    }
    // metodos

        async #findOneById(id) {
            if (!isValidID(id)) {
                throw new ErrorManager("ID Invalido", 400);
            }
            const ticket = await this.#ticketModel.findById(id).populate("cart");
    
            if (!ticket) {
                throw new ErrorManager("ID no encontrado", 404);
            }
            return ticket;
        }
        /** */
        // Obtiene un carrito específico por su ID
        async getOneById(id) {
            try {
                return await this.#findOneById(id);
            } catch (error) {
                throw ErrorManager.handleError(error);
            }
        }

        async get(params){
            try {
                const paginationOptions = {
                    limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                    page: params?.page || 1, // Página actual (por defecto 1)
                    populate: "purchaser", // Poblar el campo virtual 'cart'
                    lean: true, // Convertir los resultados en objetos planos
                };
                return await this.#ticketModel.paginate({},paginationOptions);
            } catch (error) {
                throw ErrorManager.handleError(error);
            }
        }

        async post(data){
            
            console.log(data)
            try {
                const ticket = await this.#ticketModel.create(data);
                return ticket;
            } catch (error) {
                throw ErrorManager.handleError(error);
            }
        }
}