const fs = require("fs");

class ProductManager {
  constructor(file) {
    this.products = [];
    this.file = file;
    this.init();
  }

  init = () => {
    try {
      const existFile = fs.existsSync(this.file);
      if (existFile) {
        return this.getProducts();
      } else {
        fs.writeFileSync(this.file, JSON.stringify([]));
      }
    } catch (erorr) {
      console.log("Error");
    }
  };

  getProducts = async () => {
    try {
      const existFile = fs.promises.stat(this.file);
      if (existFile) {
        const productsAll = await fs.promises.readFile(this.file, "utf-8");
        const fileConverted = JSON.parse(productsAll);
        console.log(fileConverted);
        return fileConverted;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProductID = () => {
    const count = this.products.length;
    const productID = count > 0 ? this.products[count - 1].id + 1 : 1;
    return productID;
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const productAdded = { title, description, price, thumbnail, code, stock };

    if (fs.existsSync(this.file)) {
      debugger;
      const id = this.getProductID();
      const productFile = await this.getProducts();

      let newProduct = {
        id: id,
        ...productAdded,
      };

      productFile.push(newProduct);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(productFile, null, 2)
      );
    }
  };

  getProductById = (id) => {
    const busqueda = this.products.find((product) => product.id === id);
    if (busqueda == undefined) {
      return console.log("Not Found");
    } else {
      return console.log(`The product is ${busqueda.title}`);
    }
  };

  updateProduct = async (id, element) => {
    debugger;
    const busqueda = this.products.find((product) => product.id === id);
    console.log(busqueda);
    const product = JSON.stringify(busqueda);
    fs.promises.writeFile();
  };

  deleteProduct = async (id) => {
    if (fs.promises.stat(this.file)) {
      const data = await fs.promises.stat(this.file);

      if (data.some((item) => item.id === id)) {
        const data = await fs.promises.stat(this.file);
        const datos = data.filter((item) => item.id !== id);
        return fs.promises.writeFile(this.file, datos);
      } else {
        throw new Error(`No se encontro el producto con el id ${id}`);
      }
    }
  };
}

const instancia = new ProductManager("./productos.json");

const allProducts = instancia.getProducts();
console.log(allProducts);

const productOneSaved = instancia.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productOneSaved);

const firstGet = instancia.getProducts();
console.log(firstGet);

const productTwoSaved =  instancia.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  300,
  "Sin imagen",
  "abc123",
  25
);

console.log(productTwoSaved);

const deleteProd = instancia.deleteProduct(1);
console.log(deleteProd);

/* investigar qué hace y que devuelve el some, find, include,  */
