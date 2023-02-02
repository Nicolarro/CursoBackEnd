import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
import { UserManager } from "./userManager.js";

export const productos = new ProductManager();

export const carrito = new CartManager();

export const user = new UserManager ();

