import {Router} from "express";
import { ProductManager } from "../products.js";

const router =Router();

export const carrito = new ProductManager("./carrito.json");

router.post("/", async (req,res) => {
    const products = []
    const id = await carrito.
    const carrito = {id, ...products}
    const nuevoCarrito = carrito.
    res.send({status:true, carrito: carrito})
})




export default router;