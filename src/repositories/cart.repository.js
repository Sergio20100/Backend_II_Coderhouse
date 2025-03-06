import CartDTO from '../DAOs/DTOs/cart.dto.js';

export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getCarts = async (query) => {
    return await this.dao.get(query);
  };
  getCartById = async (id) => {
    return await this.dao.getById(id);
  };
  createCart = async (cart) => {
    const cartToInsert = new CartDTO(cart);
    return await this.dao.post(cartToInsert.cart);
  };
  updateCart = async (id,cart) => {
    const cartToInsert = new CartDTO(cart);
    return await this.dao.put(id,cartToInsert.cart);
  };
  deleteById = async (id) => {
    return await this.dao.delete(id);
  };
  addProductById = async (cid,pid) => {
    return await this.dao.addProductById(cid,pid);
  };
  deleteProductById = async (cid,pid) => {
    return await this.dao.deleteProductById(cid,pid);
  };

  deleteAllProducts = async (cid) => {
    return await this.dao.deleteAllProducts(cid);
  };
}