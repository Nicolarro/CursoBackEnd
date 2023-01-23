
import { Router } from "express";
import { productos } from "../../Managers/indexManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await productos.getProducts();

  res.render("home", {
    products,
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export { router as ViewsRouter };