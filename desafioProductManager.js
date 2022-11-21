class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  getProductID = () => {
    const count = this.products.length;
    const productID = count > 0 ? this.products[count - 1].id + 1 : 1;

    return productID;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    
    const id = this.getProductID();

    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };


    const validationCode = this.products.some(
      (element) => element.code == product.code
    );

    if (!validationCode) {
      return this.products.push(product);
    } else {
      return console.log("The code already exists, check Code");
    }
  }

  getProductById = (id) => {
    const busqueda = this.products.find((product) => product.id === id);
    if (busqueda == undefined) {
      return console.log("Not Found");
    } else {
      return console.log(`The product is ${busqueda.title}`);
    }
  };
}

const instancia = new ProductManager();

console.log(instancia.getProducts());

console.log(instancia.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
));

console.log(instancia.getProducts())

instancia.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  300,
  "Sin imagen",
  "abc123",
  25
);
console.log(instancia.getProductById(1));


/* investigar qué hace y que devuelve el some, find, include,  */
