import express from "express";
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carrito.routes.js"
import mongoose, {mongo} from "mongoose";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 8080

app.use('/api/products', productRouter)

app.use('/api/carts', cartRouter)

app.use('/', (req,res) => res.send("HOME"))




app.listen(port, () => console.log(`Server running on port ${port}`))

app.on('error', () => console.log("ERROR"))