import { productServices } from "../repositories/services.js";
export const getProducts = async (req, res) => {
    try {
        const products = await productServices.getProducts(req.query);
        
        const jsonResponse = { 
                              status: "success", 
                              payload:products.docs,
                              limit: products.limit,
                              totalPages: products.totalPages,
                              prevPage: products.prevPage,
                              nextPage: products.nextPage,
                              page: products.page,
                              hasNextPage: products.hasNextPage,
                              hasPrevPage: products.hasNextPage,

                            }
        res.status(200).json(jsonResponse);
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await productServices.getProductById(req.params?.pid);
        res.status(200).json({ status: "success", payload:product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

export const createProdut = async (req, res) => {
    try {
        // console.log(req.body)
        const product = await productServices.createProdut(req.body);
        res.status(201).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}
export const updateProductById = async (req, res) => {
    try {
        // console.log(req.params);
        
        const product = await productServices.updateById(req.params?.pid, req.body);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const product = await productServices.deleteById(req.params?.pid);
        res.status(200).json({ status: "success", payload: product });
    } catch (error) {
        res.status(error.code || 500).json({status:"error", message: error.message})
    }
}


