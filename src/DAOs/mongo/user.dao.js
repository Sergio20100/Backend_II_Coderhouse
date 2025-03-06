import UserModel from "./models/user.model.js";
import ErrorManager from "../../managers/ErrorManager.js";
import { isValidID } from "../../config/database.js";

export default class UserManager {
    #userModel;
    constructor() {
        this.#userModel = UserModel;
    }
    // metodos

    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID Invalido", 400);
        }
        const user = await this.#userModel.findById(id).populate("cart");

        if (!user) {
            throw new ErrorManager("ID no encontrado", 404);
        }
        return user;
    }
    /** */
    // Obtiene un carrito específico por su ID
    async getById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async getByEmail(email) {
        try {
            return await this.#userModel.findOne({ email });
        } catch (error) {
            throw ErrorManager.handleError(error);
        }

    }

    async get(params) {
        try {
            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                populate: "cart", // Poblar el campo virtual 'cart'
                lean: true, // Convertir los resultados en objetos planos
            };
            return await this.#userModel.paginate({}, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async post(data) {

        // console.log(data)
        try {
            const user = await this.#userModel.create(data);
            return user;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
    async delete(id) {
        try {
            const user = await this.#findOneById(id);
            await user.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}