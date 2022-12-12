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

    const products = await this.getProducts();

    const id = this.getProductID();

    const codeValidation = products.some((product) => product.code === code);

    if (!codeValidation) {
      let newProduct = {
        id: id,
        ...productAdded,
      };

      products.push(newProduct);
      await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2));

      return products;
    } else {
      throw new Error("Codigo repetido");
    }
  };

  getProductById = async (id) => {
    const products = await fs.promises.readFile(this.file, "utf-8");
    const productParsed = JSON.parse(products);
    const busqueda = productParsed.find((product) => product.id === id);

    console.log(busqueda);

    if (busqueda == undefined) {
      return console.log("Product Not Found");
    } else {
      return busqueda;
    }
  };

  updateProduct = async (
    id,
    { title, description, price, thumbnail, code, stock }
  ) => {
    const data = await this.getProducts();
    const busqueda = this.products.findIndex((product) => product.id === id);
    if (busqueda === -1) {
      throw new Error();
    } else {
      const product = this.products[busqueda];
      products[product] = {
        ...product,
        ...{ title, description, price, thumbnail, code, stock },
      };
      await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2));

      return products[busqueda];
    }
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
