import CartDTO from '../DAOs/DTOs/cart.dto.js';

export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getCarts = async () => {
    return await this.dao.get();
  };
  createCart = async (cart) => {
    const cartToInsert = new CartDTO(cart);
    return await this.dao.post(cartToInsert);
  };
}