import fs from "fs";

export class CartManager {
  constructor(file) {
    this.cart = [];
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

  getCart = async () => {
    const cart = await fs.promises.readFile(this.file, "utf-8");
    const cartParsed = JSON.parse(cart);
    return cartParsed;
  };

  getCartID = async () => {
    const cart = await this.getCart()
    const count = cart.length;
    const cartId = count > 0 ? cart[count - 1].id + 1 : 1;
    return cartId;
  };


  addCart = async (id, productID) => {
    const cart = await this.getCartById(id);

    for (let i = 0; i < cart.products.lenght; i++) {
      const element = array[index];
      let found = false
      if (cart.products[id].id == productID) {
        cart.products[i].quantity++
        found = true
      }
    }

    if (!found) {
      cart.products.push({
        id: productID,
        quantity: 1
      })
    }

    addCart = { quantity };

    let newCart = {
      id: id,
      ...addCart,
    };
    return newCart
  }

  getCartById = async (id) => {
    const cart = await fs.promises.readFile(this.file, "utf-8");
    const cartParsed = JSON.parse(cart);
    const cartFinded = cartParsed.find((cart) => cart.id == id);

    console.log(cartFinded);

    if (cartFinded == undefined) {
      return console.log("Cart Not Found");
    } else {
      return cartFinded;
    }
  };

}
