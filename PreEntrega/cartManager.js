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
    }

    getCart = async () => {
        const cart = await fs.promises.readFile(this.file, "utf-8");
        const cartParsed = JSON.parse(cart);
        return cartParsed;
    };

    getCartID = async () => {
        const count = this.cart.length;
        const cartId = count > 0 ? this.cart[count - 1].id + 1 : 1;
        return cartId;
    }

    addCart = async (quantity) => {
        const id = await this.getCartID();
            addCart = {cquantity};
        
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

}