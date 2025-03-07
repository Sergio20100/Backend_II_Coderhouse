import { cartServices } from "../repositories/services.js";


/**
 * @description Ruta para obtener todos los carritos
 */
export const getCarts = async (req, res) => {
    try {
        const carts = await cartServices.getCarts(req.query);
        res.status(200).json({ status: "success", payload:carts });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

/**
 * @description Ruta para obtener un carrito por ID
 */
export const getCartById = async (req, res) => {
    try {
        const cart = await cartServices.getCartById(req.params?.id);
        res.status(200).json({ status: "success", payload:cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}
export const deleteAllProductsFromCart = async (req, res) => {
    try {
        const cart = await cartServices.deleteAllProducts(req.params?.id);
        res.status(200).json({ status: "success", payload:cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

/**
 * @description Ruta para agregar un carrito
 * @body {"products":["6769f093d6923c74246c7762","6769f0c8d6923c74246c7768"]} o {"products":[]}  
 */
export const createCart = async (req, res) => {
    try {
        // console.log(req.body)
    
        const cart = await cartServices.createCart(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

export const updateCart = async (req, res) => {
    try {
        // console.log(req.body)
        const cart = await cartServices.updateCart(req.params?.cid, req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

/**
 * @description Ruta para incrementar en una unidad o agregar un producto específico en un carrito por su ID
 */
export const addProductToCart = async (req, res) => {
    try {
        console.log("User login:",req.user);
        const { cid, pid } = req.params;
        const cart = await cartServices.addProductById(cid,pid);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

/**
 * @description Ruta para incrementar la cantidad de un producto específico en un carrito por su ID
 */
export const updateOneProductById = async (req, res) => {
    try {
        // console.log(req.body)
        const { quantity } = req.body;
        const cart = await cartServices.updateOneProductById(req.params?.cid,req.params?.pid,quantity);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const cart = await cartServices.deleteProductById(req.params?.cid,req.params?.pid);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

