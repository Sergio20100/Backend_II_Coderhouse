import ProductDTO from '../DAOs/DTOs/product.dto.js'

export default class ProdutRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getProducts = async () => {
    return await this.dao.get();
  };
  getProductById = async (id) => {
    return await this.dao.getById(id);
  };
  createProdut = async (produt) => {
    const productToInsert = new ProductDTO(produt);
    return await this.dao.post(productToInsert);
  };
  updateById = async (id, produt) => {
    const productToInsert = new ProductDTO(produt);
    return await this.dao.put(id,productToInsert.product);
  };
  deleteById = async (id) => {
    return await this.dao.delete(id);
  };
}