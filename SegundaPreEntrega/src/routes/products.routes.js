import { Router } from "express";
import  {productos, carrito} from "../../Managers/indexManager.js";

const router = Router();

//Mostrar todos los productos
router.get("/", async (req, res) => {
  try {
    const { sort, query, page, limit } = req.query;
    const options = {
      limit: limit || 5,
      page: page || 1,
      sort: { price: sort } || { price: 1 },
      lean: true,
    };

    const products = await productos.getProducts(query, options);

    res.send({
      status: "succes",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage
        ? `/api/products?page=${products.prevPage}`
        : null,
      nextLink: products.hasNextPage
        ? `/api/products?page=${products.nextPage}`
        : null,
    });
  } catch (error) {
    console.log(error);

    res.send({
      status: "error",
      error: "SOMETHING WENT WRONG",
    });
  }
});

//Traer un solo prodcuto por id
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productos.getProductById(pid);

    res.send({
      status: "succes",
      payload: product,
    });
  } catch (error) {
    console.log(error.message);

    res.send({
      status: "error",
      error: error.message || "SOMETHING WENT WRONG",
    });
  }
});

//Agrego un nuevo producto que llega por req.body
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    if (!newProduct) {
      return res.send({
        status: "error",
        error: "EMPTY PRODUCT",
      });
    }

    const result = await productos.addProduct(newProduct);

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

//Actualizar un producto
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const updates = req.body;

    const result = await productos.updateProduct(pid, updates);

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

// Eliminar un producto
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;

    const result = await productos.deleteProduct(pid);

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


export { router as productRouter };
