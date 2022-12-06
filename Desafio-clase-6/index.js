import express from "express";

import { instancia } from "./db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080;

app.get("/products", async (req, res) => {
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

app.get("/products/:id",
  async (req, res) => {
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

app.listen(port, () => console.log(`Server running on port ${port}`));

/* -------------------------------- */
