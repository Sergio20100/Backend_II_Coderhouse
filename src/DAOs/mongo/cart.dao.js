import ErrorManager from "../../managers/ErrorManager.js";
import { isValidID } from "../../config/database.js";
import { Types } from "mongoose"
import CartModel from "../mongo/models/cart.model.js";

export default class CartManager {
    #cartModel;
    constructor() {
        this.#cartModel = CartModel;
    }
    // metodos

    /**
     * @description Buscar un carrito por su ID
     * @param {*} id 
     * @returns cart found
     */
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID Invalido", 400);
        }
        // almaceno el carrito
        const cart = await this.#cartModel.findById(id).populate("products.product");

        if (!cart) {
            throw new ErrorManager("ID no encontrado", 404);
        }
        return cart;
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

    /** 
     * @description Insertar un carrito en la DB
     * @param cart
     * @returns cart
     */
    async post(cart) {

        const insertData = {
            products: cart.products.map(item => (
                {
                    product: new Types.ObjectId(item),
                    quantity: 1
                }))
        }
        console.log(insertData);
        try {
            const cart = await this.#cartModel.create(insertData);
            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
    /**
     * @description Actualizar un carrito de la DB
     * @param cid
     * @param data
     * @returns cart
     */
    async updateOne(cid, data) {
        try {
            const cart = await this.#findOneById(cid);
            console.log("se encontro el id del carrito a actualizar: ",cid)
            console.log(cart)
            const updateData = {
                products: data.products.map(item => (
                    {
                        product: new Types.ObjectId(item),
                        quantity: 1
                    }))
            }
            const cartUpdated = await this.#cartModel.findByIdAndUpdate(cid, {$set: updateData }, {new: true} )
            return cartUpdated
        } catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }
    /** 
     * @description Agrega un producto al carrito o incrementa la cantidad existente
     * @param {*} cartID
     * @param {*} productID  
     * @returns cart
     */
    async addProductById(cartID, productID) {

        try {
            const cart = await this.#findOneById(cartID);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productID);
            // si lo encuentro le sumo 1 sino lo agrego a la lista de productos del carrito
            productIndex >= 0 ? cart.products[productIndex].quantity++ : cart.products.push({ product: new Types.ObjectId(productID), quantity: 1 })

            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async deleteProductById(cartID, productID) {

        try {
            const cartFound = await this.#findOneById(cartID);
            if (!cartFound) {
                throw new ErrorManager("No se encontro el id del carrito", 400);
            }
            const prouctFoundInCart = cartFound.products.findIndex((item) => item.product._id.toString() === productID)

            if (prouctFoundInCart >= 0) {
                cartFound.products.splice(prouctFoundInCart, 1);
                cartFound.save()
                return cartFound;
            } else {
                throw new ErrorManager("No se encontro el producto en la lista de productos del carrito", 400);
            }
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    async getAll(params) {
        try {
            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                populate: "products.product", // Poblar el campo virtual 'products'
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#cartModel.paginate({}, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }


    async updateOneProductById(cartID, productID, quantity) {
        try {
            const cart = await this.#findOneById(cartID);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productID);
            // si lo encuentro le sumo 1 sino lo agrego a la lista de productos del carrito
            if (productIndex >= 0) {
                cart.products[productIndex].quantity = Number(quantity)
                await cart.save();
                return cart;
            } else {
                throw new ErrorManager("No se encontro el ID del producto en la lista del carrito", 400);
            }



        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    async deleteAllProducts(cartID) {
        try {
            const cartFound = await this.#findOneById(cartID);
            cartFound.products = [];
            cartFound.save();
            return cartFound;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

}