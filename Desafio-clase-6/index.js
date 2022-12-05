import express from "express";

import { instancia } from "./db.js";

const app = express();

const port = 8080;

app.get("/api/products", async (req, res) => {
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
    console.log(error);
    res.send({ success: false, error: "Error" });
  }
});

app.get("/api/products/:id"),
  async (req, res) => {
    try {
      const { id } = req.params;
      /*  const id = Number(paramId); */

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
  };

app.listen(port, () => console.log(`Server running on port ${port}`));
