import productsModel from "../models/products.model.js";

export class ProductManager {
  getProducts = async (query, options) => {
    try {
      if (query === "inStock") {
        const products = await productsModel.paginate({ state: true }, options);

        if (!products) {
          throw new Error("THE DB IS EMPTY");
        }
        return products;
      }

      getProducts = async (query, options) => {
        try {
          if (query === "inStock") {
            const products = await productsModel.paginate({ state: true }, options)

            if (!products) {
              throw new Error("Empty DB")
            }
            else {
              return products
            }
          }
          if (
            query === "Deportivas" ||
            query === "Casual" ||
            query === "Work" ||
            query === "Verano"
          ) {
            const products = await productsModel.paginate(
              { category: query },
              options
            );

            if (!products) {
              throw new Error("THE DB IS EMPTY");
            }

            return products;
          }
          const products = await productsModel.paginate({}, options);

          if (!products) {
            throw new Error("THE DB IS EMPTY");
          }

          return products;
        } catch (error) {
          throw new Error(error.message);
        }

      };


      addProduct = async ({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      }) => {
        const productAdded = { title, description, price, thumbnail, code, stock };

        const products = await this.getProducts();
        console.log(products);

        const id = await this.getProductID();

        const existCode = products.some((product) => product.code == code);

        // me esta dando true existCode, cuando no hay repetidos--> VERIFICAR
        console.log(existCode);
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
        const products = await this.getProducts();
        const busqueda = products.find((product) => product.id === id);

        if (busqueda == undefined) {
          return console.log("Product Not Found");
        } else {
          return busqueda;
        }
      };

      updateProduct = async ({ id, newData }) => {
        const products = await this.getProductById(id);

        const productIndex = products.findIndex((product) => product.id == id);
        if (productIndex === -1) {
          return res.status(404).send("Producto no encontrado");
        } else {
          const product = products[productIndex];

          products[productIndex] = {
            ...product,
            ...newData,
          };
          console.log(products);
          await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2));

          return products[productIndex];
        }
      };

      deleteProduct = async (id) => {
        const data = await this.getProducts();

        const productIndex = data.findIndex((product) => product.id === id);

        if (productIndex === -1) throw new NotFoundError("Product not found");
        else {
          const deletedProduct = data.splice(productIndex, 1);

          await fs.promises.writeFile(this.file, JSON.stringify(data, null, 3));

          return deletedProduct[0];
        }
      };
    }
