import { Router } from "express";
import { CartManager } from "../cartManager.js";
import { ProductManager } from "../productManager.js";

const router = Router();

export const carritos = new CartManager("./carrito.json");
export const productos = new ProductManager("./products.json");

router.post("/", async (req, res) => {
    const idCarrito = await carritos.getCartID();
    const carrito = { idCarrito, products: [] }
    const nuevoCarrito = await carritos.addCart(carrito)
    res.send({ success: true, nuevoCarrito: nuevoCarrito })
});

router.get("/:cid", async (req, res) => {
    const idCarrito = parseInt(req.params.cid);
    const findCarrito = await carritos.getCartById(idCarrito);
    if (!findCarrito) {
        res.send({ success: false, message: "Cart Not Found" })
    }
    else {
        res.send({ success: true, carrito: findCarrito })
    }

})

router.post("/:id/products/:pid", async (req, res) => {
    const idCarrito = parseInt(req.params.id);
    const idProducto = req.body.idProducto;
    const carrito = await carritos.getCartById(idCarrito);
    const carritoJson = carrito[0];
    const producto = await productos.getById(idProducto);
    const productoJson = producto[0];
    await carritoJson.productos.push(productoJson);
    await carritos.modify(idCarrito, carritoJson);
    res.status(201).send(carritoJson);
});



export default router;