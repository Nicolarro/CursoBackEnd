import express from "express";
import productRouter from "./routes/products.routes.js"
import carritoRouter from "./routes/carrito.routes.js"

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080

app.use('/api/products', productRouter)
app.use('/api/carts', carritoRouter)
app.use('/', (req,res) => res.send({success: true, message: "Pagina inicial"}))

app.listen(port, () => console.log(`Server running on port ${port}`))
