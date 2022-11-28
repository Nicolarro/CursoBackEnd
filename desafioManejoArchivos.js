const fs = require("fs");

class ProductManager {
  constructor(file) {
    this.products = [];
    this.file = file;
    this.init();
  }

  init = () => {
    debugger;
    try {
      const existFile = fs.existsSync(this.file);
      if (existFile) {
        return this.getProducts()
      }
      else {
        fs.writeFileSync(this.file, JSON.stringify([]));
      }
    } catch (erorr) {
      console.log("Error");
    }
  };

  getProducts = async () => {
    const existFile = fs.existsSync(this.file);
    if (existFile) {
      debugger;
      console.log("The file already exists");
      const productsAll = await fs.promises.readFile(this.file, "utf-8");
      const fileConverted = JSON.parse(productsAll);
      console.log(fileConverted)
      return fileConverted;
    } else {

    }
  };

  getProductID = () => {
    const count = this.products.length;
    const productID = count > 0 ? this.products[count - 1].id + 1 : 1;
    return productID;
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {

    let productAdded = {title, description, price, thumbnail, code, stock}

    if (fs.existsSync(this.file)) {
      debugger;
      const id = this.getProductID();
      const productFile = await this.getProducts();
      let newProduct = {
        id: id,
        ...this.productFile,
      };


      productFile.push(newProduct);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(productFile, null, 2)
      );

      /*       if ((title, description, price, thumbnail, code, stock)) {
              const validationCode = this.products.some(
                (element) => element.code == product.code
              ); */

      /*         if (!validationCode) {
                return this.products.push(product);
              } else {
                return console.log("The code already exists, check Code");
              }
            } else {
              console.log("Check the product elements");
            } */

    }

    getProductById = (id) => {
      debugger;
      const busqueda = this.products.find((product) => product.id === id);
      if (busqueda == undefined) {
        return console.log("Not Found");
      } else {
        return console.log(`The product is ${busqueda.title}`);
      }
    };
  };

  updateProduct = async (id) => {
    const busqueda = this.products.find((product) => product.id === id);
    const product = JSON.stringify(busqueda);
    fs.promises.writeFile();
  };

  deleteProduct = async (id) => {
    if (this.exists(this.file)) {
      const data = await this.promises.readFile(this.file);
      console.log(`Borrando datos...`);
      if (data.some((item) => item.id === id)) {
        const data = await this.promises.readFile(this.file);
        const datos = data.filter((item) => item.id !== id);
        this.writeFile(this.file, datos);
      } else {
        throw new Error(`No se encontro el producto con el id ${id}`);
      }
    }
  };
}

const instancia = new ProductManager("./productos.json");

console.log(instancia.getProducts());

console.log(
  instancia.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  )
);

console.log(instancia.getProducts());

instancia.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  300,
  "Sin imagen",
  "abc123",
  25
);
/* console.log(instancia.getProductById(1));

console.log(deleteProduct(1)); */

/* investigar qué hace y que devuelve el some, find, include,  */
