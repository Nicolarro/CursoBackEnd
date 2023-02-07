
import { Router } from "express";
import { productos, carrito } from "../../Managers/indexManager.js";

const router = Router();

//Mostrar todos los productos
router.get("/products", async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const options = {
      limit: limit || 5,
      page: page || 1,
      sort: { price: sort } || { price: 1 },
      lean: true,
    };
    const result = await productos.getProducts(query, options);

    const response = {
      status: "succes",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null,
    };

    res.render("home", {
      style: "styles.css",
      response,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

// Muestra un prodcuto detallado
router.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productos.getProductById(pid);

    res.render("productDetail", {
      style: "styles.css",
      product,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

// Muestra un carrito
router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const result = await carrito.getCartById(cid);

    const cart = result.cart;

    res.render("cart", {
      style: "styles.css",
      cart,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});
export { router as ViewsRouter };