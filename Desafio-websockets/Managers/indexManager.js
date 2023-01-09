import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";

export const productos = new ProductManager("../products.json")

export const carrito = new CartManager ("../carrito.json")

