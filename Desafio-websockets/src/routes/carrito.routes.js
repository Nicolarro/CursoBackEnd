import { Router } from "express";
import { CartManager } from "../../Managers/cartManager.js";
import { ProductManager } from "../../Managers/productManager.js";

const router = Router();

const carritos = new CartManager("../carrito.json");
const productos = new ProductManager("../products.json");

router.get("/", async (req, res) => {
  const carts = await carritos.getCart();
  console.log(carts);
  res.json({ carts });
});

router.post("/", async (req, res) => {
  const idCarrito = await carritos.getCartID();
  const carrito = { idCarrito, products: [] };
  const nuevoCarrito = await carritos.addCart(carrito);
  res.send({ success: true, nuevoCarrito: nuevoCarrito });
});

router.get("/:cid", async (req, res) => {
  const idCarrito = parseInt(req.params.cid);
  const findCarrito = await carritos.getCartById(idCarrito);
  if (!findCarrito) {
    res.send({ success: false, message: "Cart Not Found" });
  } else {
    res.send({ success: true, carrito: findCarrito });
  }
});

router.post("/:id/products/:pid", async (req, res) => {
  const idCarrito = parseInt(req.params.id);
  const idProducto = parseInt(req.params.idProducto);
  const carrito = await carritos.getCartById(idCarrito);
  const carritoJson = carrito[0];
  const producto = await productos.getById(idProducto);
  const productoJson = producto[0];
  await carritoJson.productos.push(productoJson);
  await carritos.modify(idCarrito, carritoJson);
  res.status(201).send(carritoJson);
});

router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const productToUpdate = req.body;
  const productAdded = await carritos.getCartById(id);

  if (!productAdded) return res.status(404).send("Producto No Encontrado");
  for (const key of i);
});

export default {carritos, productos}


