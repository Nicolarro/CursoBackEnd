import fs from "fs";

export class ProductManager {
  constructor(file) {
    this.products = [];
    this.file = file;
    this.#read();
  }

  #read = () => {
    const existFile = fs.existsSync(this.file);
    if (existFile) {
      return;
    } else {
      return fs.writeFileSync(this.file, JSON.stringify([]));
    }
  };

  getProducts = async () => {
    const productsAll = await fs.promises.readFile(this.file, "utf-8");
    /*     console.log(productsAll); */
    const productParsed = JSON.parse(productsAll);
    return productParsed;
  };

  getProductID = () => {
    const count = this.products.length;
    const productID = count > 0 ? this.products[count - 1].id + 1 : 1;
    return productID;
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const productAdded = { title, description, price, thumbnail, code, stock };

    if (fs.existsSync(this.file)) {
      const id = this.getProductID();
      const productFile = await this.read();

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

  getProductById = async (id) => {
    const products = await fs.promises.readFile(this.file, "utf-8");
    const busqueda = products.find((product) => product.id === id);
    if (busqueda == undefined) {
      return console.log("Not Found");
    } else {
      return busqueda;
    }
  };

  updateProduct = async (id, obj) => {
    const data = await this.getProducts();
    const busqueda = this.products.find((product) => product.id === id);
    console.log(busqueda);
    const product = JSON.stringify(busqueda);
    await fs.promises.writeFile();
  };

  deleteProduct = async (id) => {
    const data = await this.getProducts();
    JSON.parse(data);
    if (data.some((item) => item.id === id)) {
      const data = await fs.promises.readFile(this.file);
      const datos = data.filter((item) => item.id !== id);
      return await fs.promises.writeFile(this.file, datos);
    }
  };
}

/* const allProducts = instancia.getProducts();

console.log(allProducts);

const productOneSaved = instancia.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

const firstGet = instancia.getProducts(); */
/* 
const productTwoSaved = instancia.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  300,
  "Sin imagen",
  "abc123",
  25
);

console.log(productTwoSaved); */

/* const deleteProd = instancia.deleteProduct(1);
console.log(deleteProd); */
