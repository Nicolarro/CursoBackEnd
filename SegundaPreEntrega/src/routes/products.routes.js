import { Router } from "express";
import mongoose from "mongoose";
import productsModel from "../../models/products.model.js";
import { productos } from "../../Managers/indexManager.js";

const router = Router();

/*  OK */
router.get("/", async (req, res) => {
  try {
    const { sort, query, page, limit } = req.query;
      const options = {
        limit : limit || 5,
        page: page || 1,
        sort: {price: sort} || {price: 1},
      }



    const products = await productsModel.find().
/*     if (!limit || limit < 1 || products.length < limit) {
      return res.send({ sucess: true, products: products });
    } else {
      const productFiltered = productsModel.slice(0, limit);
      res.send({ sucess: true, products: productFiltered });
    } */


  } catch (error) {
    console.log(error);
    res.send({ success: false, error: "Error" });
  }
});
/*  OK */
router.get("/:id", async (req, res) => {
  try {
    const { id: paramId } = req.params;
    const id = Number(paramId);

    if (Number.isNaN(id) || id < 0) {
      return res.send({ success: false, error: "El id no es valido" });
    }

    const productsById = await productos.getProductById(id);

    if (!productsById) {
      return res.send({
        success: false,
        error: "No se encontro el producto",
      });
    } else {
      res.send({ success: true, productsById: productsById });
    }
  } catch (error) {
    console.log(error);
    res.send({ success: false, error: "Error" });
  }
});

/* OK */

router.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code,stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code ) {
      return res.send({ success: false, error: "El campo es obligatorio" });
    } else {
      const productAdded = await productos.addProduct({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });

      req.app
        .get("io")
        .sockets.emit(
          "hello",
          "hola! posteaste un producto, te hablo desde product router!"
        );

      req.app.get("io").sockets.emit("products", await productos.getProducts());

      return res.send({ success: true, productAdded: productAdded });
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: "Ha ocurrido un error" });
  }
});

/* REVISAR */
router.put("/:id", async (req, res) => {
  try {
    const { id: paramId } = req.params;
    const id = Number(paramId);

    if (Number.isNaN(id) || id < 0) {
      res.send({ success: false, error: "Id is not valid" });
    } else {
      const { title, description, price, thumbnail, code, stock } = req.body;
      const updateProduct = await productos.updateProduct(id, {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      res.send({ success: true, updateProduct: updateProduct });
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false, message: "Ha ocurrido un error" });
  }
});

/* OK */
router.delete("/:id", async (req, res) => {
  try {
    const { id: paramId } = req.params;
    const id = Number(paramId);

    if (Number.isNaN(id) || id < 0) {
      return res.send({ success: false, error: "Id invalido" });
    } else {
      const productoBorrado = await productos.deleteProduct(id);
      console.log(productoBorrado);
      return res.send({ success: true, productoBorrado: productoBorrado });
    }
  } catch (error) {
    return res.send({ success: false, error: error });
  }
});

export { router as productRouter };