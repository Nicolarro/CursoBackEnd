
import { Router } from "express";
import { ProductManager } from "../../Managers/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductManager.getProducts();

  res.render("home", {
    products,
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export { router as ViewsRouter };