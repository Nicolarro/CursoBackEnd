import { Router } from "express";
import { CartManager } from "../cartManager.js";

const router = Router();

/* OK */
router.get("/", async (req, res) => {
  try {
    const carts = await CartManager.getCarts();
    res.send({
      status: "succes",
      payload: carts,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

/* OK */
router.post("/", async (req, res) => {
  try {
    const result = await CartManager.createCart();

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

/* OK */
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await CartManager.getCartById(cid);

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

/* OK */
Router.post("/:id/product/:pid", async (req, res) => {
    try {
      const { id, pid } = req.params;
  
      const result = CartManager.addProductToCart(id, pid);
  
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
Router.delete("/:id/product/:pid", async (req, res) => {
    try {
      const { id, pid } = req.params;
  
      const result = await CartManager.deleteProductFromCart(id, pid);
  
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
Router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const products = req.body;
  
      const result = await CartManager.addArrayOfProudcts(
        id,
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
Router.put("/:cid/product/:pid", async (req, res) => {
    try {
      const { quantity } = req.body;
  
      const { cid, pid } = req.params;
  
      const result = await CartManager.addQuantityToProduct(
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
  Router.delete("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
  
      const result = await CartManager.emptyCart(cid);
  
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




export default router;
