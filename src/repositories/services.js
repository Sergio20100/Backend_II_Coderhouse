//Carrito
import Cart from "../DAOs/mongo/cart.dao.js";
import CartRepository from "./cart.repository.js";
//Productos
import Product from "../DAOs/mongo/product.dao.js";
import ProductRepository from "./product.repository.js";
//Usuarios
import User from "../DAOs/mongo/user.dao.js";
import UserRepository from "./user.repository.js";
//Tickets o Recibo
import Ticket from "../DAOs/mongo/ticket.dao.js";
import TicketRepository from "./ticket.repository.js";

export const cartServices = new CartRepository( new Cart());
export const productServices = new ProductRepository( new Product());
export const userServices = new UserRepository( new User() );
export const ticketServices = new TicketRepository( new Ticket() );