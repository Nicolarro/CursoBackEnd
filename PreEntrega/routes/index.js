import { Router } from "express";
import products from "./products.routes.js";
import carrito from "./carrito.routes.js"


const router = Router();

router.use("/api/productos", products);

router.use("/api/carrito", carrito);

