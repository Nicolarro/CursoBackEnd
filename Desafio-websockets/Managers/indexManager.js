import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";

export const productos = new ProductManager("../src/products.json")

export const carrito = new CartManager("../src/carrito.json")

