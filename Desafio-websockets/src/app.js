import express from "express";
import productRouter from "./routes/products.routes.js";
import carritoRouter from "./routes/carrito.routes.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const port = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "handlebar",
  handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" })
);

app.set("views engine", "hbs");
app.set("views", `${__dirname}/views`);

app.get("/", (req, res) => {
  res.render("HOME")
})

app.set("io", io);

app.use("/api/products", productRouter);
app.use("/api/carts", carritoRouter);

const server = httpServer.listen(port, () =>
  console.log(`Server running on port ${server.address().port}`)
);

server.on("error", (error) => {
  console.log(error);
});

io.on("connection", async (socket) => {
  console.log(`New client connected, id: ${socket.id}`);

  io.sockets.emit("hello", "HOLA!");

  const products = await productManager.getProducts();

  io.sockets.emit("products", products);

  socket.on("addProduct", async (product) => {
    try {
      await productManager.saveProduct(product);

      // volvemos a enviar todos los productos
      io.sockets.emit("products", await productManager.getProducts());
    } catch (error) {
      console.log(error);
    }
  });
});
