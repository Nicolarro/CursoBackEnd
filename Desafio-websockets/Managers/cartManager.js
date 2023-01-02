import fs from "fs";

/* export class CartManager {
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

  getCartID = () => {
    const count = this.cart.length;
    const cartId = count > 0 ? this.cart[count - 1].id + 1 : 1;
    return cartId;
  };

  addCart = async (quantity) => {
    const id = this.getCartID();
    const addCart = { quantity };

    let newCart = {
      id: id,
      ...addCart,
    };
    return newCart
  };

    getCartID = async () => {
        const count = this.cart.length;
        const cartId = count > 0 ? this.cart[count - 1].id + 1 : 1;
        return cartId;
    }

    addCart = async (quantity) => {
        const id = await this.getCartID();
            addCart = {quantity};
        
        let newCart = {
            id: id,
            ...addCart,
          };
          return newCart
    }

    getCartById = async (id) => {
        const cart = await fs.promises.readFile(this.file, "utf-8");
        const cartParsed = JSON.parse(cart);
        const busqueda = cartParsed.find((cart) => cart.id == id);

        console.log(busqueda);

        if (busqueda == undefined) {
            return console.log("Cart Not Found");
        } else {
            return busqueda;
        }
    };

} */

/* ---- */

export class CartManager {
  constructor(file) {
    this.cart = [];
    this.file = file;
  }

read = () => {
  const existFile = fs.existsSync(this.file);
  if (existFile) {
    return fs.promises.readFile(this.file, "utf-8").then(r => JSON.parse(r))
  } else {
    return fs.writeFileSync(this.file, JSON.stringify([]));
  }
};

getCart = async () => {
  const cart = await this.read()
  const cartParsed = JSON.parse(cart);
  return cartParsed;
};

getCartID = async () => {
  const cart = await this.getCart()
  const count = cart.length;
  const cartId = count > 0 ? cart[count - 1].id + 1 : 1;
  return cartId;
};


create = async () => {
  const carts = await this.read()
  const nextID = this.getNextID(carts)

  const newCart = {
    id: nextID,
    products: []
  }
  carts.push(newCart)
  await this.write(carts)
  return newCart
}

update = async (id, obj) => {
  obj.id = id
  const list = await this.read()

  for (let i = O; i < list.length; i++) {

    if (list[i].id == id) {
      list[i] = obj
      break
    }
  }
}

addCart = async (cartID, productID) => {
  const cart = await this.getCartById(cartID);
  let found = false
  for (let i = 0; i < cart.products.lenght; i++) {
    if (cart.products[id].id == productID) {
      cart.products[i].quantity++
      found = true
      break
    }
  }

  if (!found) {
    cart.products.push({
      id: productID,
      quantity: 1
    })
  }
  await this.update(cartID, cart)
  return cart

}

getCartById = async (id) => {
  const cart = await this.read()
  /*     const cartParsed = JSON.parse(cart); */
  const cartFinded = cartParsed.find((cart) => cart.id == id);

  console.log(cartFinded);

  if (cartFinded == undefined) {
    return console.log("Cart Not Found");
  } else {
    return cartFinded;
  }
};

}

