import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";

 const productos = new ProductManager("../src/products.json")

const carrito = new CartManager("../src/carrito.json")

export default {
    ProductManager,
    CartManager
}