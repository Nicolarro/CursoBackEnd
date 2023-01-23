import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";

 const productos = new ProductManager()

const carrito = new CartManager()

export default {
    productos,
    carrito,
}