import { Router } from "express";
import { ProductManager } from "../products.js";

export const instancia = new ProductManager("./products.json");


const router = Router();

router.get("/api/products", async (req, res) => {
  try {
    const { limit } = req.query;

    const products = await instancia.getProducts();
    if (!limit || limit < 1) {
      return res.send({ sucess: true, products: products });
    } else {
      const productFiltered = products.slice(0, limit);
      res.send({ sucess: true, products: productFiltered });
    }
  } catch {
    res.send({ success: false, error: "Error" });
  }
});

router.get("/api/products/:id", async (req, res) => {
  try {
    const { id: paramId } = req.params;
    const id = Number(paramId);

    const productsById = await instancia.getProductById(id);

    if (!productsById) {
      return res.send({
        success: false,
        error: "No se encontro el producto",
      });
    } else {
      res.send({ success: true, productsById: productsById });
    }
  } catch (error) {
    res.send({ success: false, error: "Error" });
  }
});

router.post("/api/products"),
  async (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.send({ success: false, error: "El campo es obligatorio" });
      } else {
        const productAdded = await instancia.addProduct({
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
        res.send({ success: true, productAdded: productAdded });
      }
    } catch (error) {
      throw new Error();
    }
  };

router.put("/api/products/:id")
/* el id no se debe enviar por params,
 */,
  async (req, res) => {
    try {
      const { id } = req.params;

      if (!id || id < 0) {
        res.send({ success: false, error: "Id is not valid" });
      } else {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const updateProduct = await instancia.updateProduct(id, {
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
      throw new Error();
    }
  };

export default router;
