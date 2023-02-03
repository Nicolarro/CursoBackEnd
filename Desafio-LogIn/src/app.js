import express from "express";
import { productRouter } from "./routes/products.routes.js";
import { ViewsRouter } from "./routes/views.routes.js";
import { carritoRouter } from "./routes/carrito.routes.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import bodyParser from "body-parser";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import { AuthRouter } from "./routes/auth.router.js";
import mongoose from "mongoose";

const fileStorage = FileStore(session);

const app = express();

const uri =
  "mongodb+srv://nicolas:JQ06zRLxcaq0cVa0@cluster0.y1vt4dq.mongodb.net/?retryWrites=true&w=majority";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" })
);
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: uri,
      dbName: "ecommerce",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 200,
    }),
    secret: "india",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/", AuthRouter);
app.use("/home", ViewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", carritoRouter);

// Conexion a DB Mongo Atlas

mongoose.set("strictQuery", false);
mongoose.connect(uri, (error) => {
  if (error) {
    console.error("No se pudo conectar a la DB");
    return;
  }

  console.log("DB connected!");
  app.listen(port, () => console.log("Server listenming..."));
});
