import { Router } from 'express'
import {carrito} from "../../Managers/indexManager.js";


const router = Router()


// Mostrar todos los carritos
router.get("/", async (req, res) => {
  try {
    const carts = await carrito.getCarts();

    res.send({
      status: "succes",
      payload: carts,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMTHING WENT WRONG",
    });
  }
});

//Crea un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const result = await carrito.createCart();

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

//Muestra un carrito en particular y sus productos
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await carrito.getCartById(cid);

    if (!result) {
      return res.send({
        status: "error",
        error: "CART NOT FOUND",
      });
    }

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

// Agrego un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const result = carrito.addProductToCart(cid, pid);

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMTHING WENT WRONG",
    });
  }
});

// Eliminar del carrito el producto seleccionado
router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const result = await carrito.deleteProductFromCart(cid, pid);

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WORNG",
    });
  }
});

// Agregar al carrito un array de productos
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const products = req.body;

    const result = await carrito.addArrayOfProudcts(
      cid,
      products
    );

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMTHING WENT WRONG",
    });
  }
});

// Actualizar la cantidad de un producto
router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { quantity } = req.body;

    const { cid, pid } = req.params;

    const result = await carrito.addQuantityToProduct(
      quantity,
      cid,
      pid
    );

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMTHING WENT WRONG",
    });
  }
});

//Vaciar el carrito
router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await carrito.emptyCart(cid);

    res.send({
      status: "succes",
      payload: result,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMTHING WENT WRONG",
    });
  }
});

export {router as carritoRouter } ;