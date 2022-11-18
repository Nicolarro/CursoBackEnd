class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  getNextID = () => {
    const count = this.products.length;
    const nextID = count > 0 ? this.products[count - 1].id + 1 : 1;

    return nextID;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {

    const id = this.getNextID();

    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (!this.products.includes(product.code)) {
      return this.products.push(product)
    }
    else {
      console.log("El codigo ingresado ya se encuentra agregado")
    }

    if (this.products.lenght == 0) {
      return this.products;

    } else {
      const listadoProductos = this.products.push(product);

      return listadoProductos;
    }
  };



  getProductById = ({ id }) => {
    const busqueda = this.products.find((product) => product.id === id);
    if (busqueda == undefined) {
      return console.log("Not Found")
    } else {
      return product.title;
    }
  };
}

const instancia = new ProductManager();

console.log(instancia)



console.log(instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25))
console.log(instancia.getProducts())
console.log(instancia.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25))
console.log(instancia.getProductById(1))



/* const sameId = (element) => element == product.id;if (!this.products.some(sameId)) {this.products.push(product)} else {console.log("An id is duplicated") */

