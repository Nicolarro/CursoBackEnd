import express from "express";
import { productRouter } from "./routes/products.routes.js";
import { ViewsRouter } from "./routes/views.routes.js";
import { carritoRouter } from "./routes/carrito.routes.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { productos, carrito } from "../Managers/indexManager.js";
import mongoose from "mongoose";


const port = 8080;

const app = express();


app.use(express.static("public"));

app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("io", io);

app.use("/", ViewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", carritoRouter);

const server = httpServer.listen(port, () =>
  console.log(`Server running on port ${server.address().port}`)
);

server.on("error", (error) => {
  console.log(error);
});

// Conexion a DB Mongo Atlas
const MONGO_URI  = 'mongodb+srv://nicolas:JQ06zRLxcaq0cVa0@cluster0.y1vt4dq.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false) 
mongoose.connect(MONGO_URI, error => {
    if(error) {
        console.error('No se pudo conectar a la DB');
        return
    }

    console.log('DB connected!');
    app.listen(8080, () => console.log('Server listenming...'))
})
