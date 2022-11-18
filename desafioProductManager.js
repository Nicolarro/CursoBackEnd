class ProductManager {
  constructor() {
    this.products = [];
  }
  debugger;
  getProducts = () => {
    return this.products;
  };

  getNextID = () => {
    const count = this.products.length;
    const nextID = count > 0 ? this.products[count - 1].id + 1 : 1;

    return nextID;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.getNextID(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);

    if (this.products.lenght == 0) {
      console.log(products);
      return products;
    } else {
      const listadoProductos = this.products.push(product);
      console.log(listadoProductos);
      return listadoProductos;
    }
  };

  getProductById = (param) => {
    const busqueda = products.find(({ id }) => this.products.id === param);
    if (busqueda.lenght > 0) {
      console.log(busqueda);
      return busqueda;
    } else {
      console.log("Not found");
    }
  };
}

const instancia = new ProductManager();

console.log(instancia.addProduct());
