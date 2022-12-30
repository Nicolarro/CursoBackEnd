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

  getProductID = async () => {
    const products = await this.getProducts();
    const count = products.length;
    const productID = count > 0 ? products[count - 1].id + 1 : 1;
    return productID;
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const productAdded = { title, description, price, thumbnail, code, stock };

    const products = await this.getProducts();

    const id = await this.getProductID();
    console.log(id)

    const existCode = products.some((product) => product.code === code);
    // me esta dando true existCode, cuando no hay repetidos--> VERIFICAR

    if (!existCode) {
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
    const products = await this.getProducts()
    const busqueda = products.find((product) => product.id === id);

    if (busqueda == undefined) {
      return console.log("Product Not Found");
    } else {
      return busqueda;
    }
  };

  updateProduct = async ({ id, newData }
  ) => {
    const products = await this.getProductById((id));

    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return res.status(404).send("Producto no encontrado")
    } else {
      const product = products[productIndex];

      products[productIndex] = {
        ...product,
        ...newData
      };
      console.log(products)
      await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2));

      return products[productIndex];
    }
  };

  deleteProduct = async (id) => {
    const data = await this.getProducts();
    /*     const dataParsed = JSON.parse(data); */
    /*     const productIndex = products.findIndex((product) => product.id === id) */

    const productIndex = data.findIndex((product) => product.id === id);

    if (productIndex === -1) throw new NotFoundError("Product not found");

    else {
      const deletedProduct = data.splice(productIndex, 1);

      await fs.promises.writeFile(this.file, JSON.stringify(data, null, 3));

      return deletedProduct[0];
    }
  }
};

