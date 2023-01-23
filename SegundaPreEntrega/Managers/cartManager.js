import cartModel from "../models/carts.model.js";

export class CartManager {

  /* OK */
  createCart = async () => {
    try {
      const newCart = {
        cart: [],
      };

      const result = await cartModel.create(newCart);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Mostrar todos los carritos
  /* OK */
  getCarts = async () => {
    try {
      const carts = await cartModel.find();

      if (!carts) {
        throw new Error("NO CARTS IN DATABASE");
      }

      return carts;
    } catch (error) {
      console.log(error);
    }
  };

  getCartID = async () => {
    const cart = await this.getCart()
    const count = cart.length;
    const cartId = count > 0 ? cart[count - 1].id + 1 : 1;
    return cartId;
  };

  //Muestra el carrito

  /* OK */
  getCartById = async (cid) => {
    try {
      const cart = await cartModel
        .findById({ _id: cid })
        .populate("cart.product")
        .lean();

      if (!cart) {
        throw new Error("CART NOT FOUND");
      }

      return cart;
    } catch (error) {
      console.log(error);
    }
  };

  //Agregar un prodcuto al carrito
  addProductToCart = async (cid, pid) => {
    try {
      const findProductInCart = await cartModel.findOne({
        "cart.product": pid,
      });

      if (findProductInCart) {
        const upgradeQuantity = await cartModel.updateOne(
          {
            "cart.product": pid,
          },
          {
            $inc: {
              "cart.$.quantity": 1,
            },
          }
        );

        return upgradeQuantity;
      }
      const result = await cartModel.updateOne(
        {
          _id: cid,
        },
        {
          $push: {
            cart: { product: pid },
          },
        }
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  //Actualizar cantidad de un producto
  addQuantityToProduct = async (quantity, cid, pid) => {
    try {
      const findCart = await cartModel.findById({
        _id: cid,
      });

      if (!findCart) {
        throw new NotFoundError("CART NOT FOUND");
      }

      const upgradeQuantity = await cartModel.updateOne(
        {
          "cart.product": pid,
        },
        {
          $inc: {
            "cart.$.quantity": quantity,
          },
        }
      );

      if (!upgradeQuantity) {
        throw new NotFoundError("PRODUCT NOT FOUND IN CART");
      }

      return upgradeQuantity;
    } catch (error) {
      console.log(error);
    }
  };

  // Agregar un array de productos al carrito
  addArrayOfProudcts = async (cid, products) => {
    try {
      const productsMap = products.map((product) => {
        return { product: product._id };
      });

      const result = await cartModel.updateOne(
        { _id: cid },
        {
          $push: {
            cart: { $each: productsMap },
          },
        }
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  };


  deleteProductFromCart = async (cid, pid) => {
    try {
      const deleteOne = await cartModel.updateOne(
        { _id: cid },
        {
          $pull: {
            cart: { product: pid },
          },
        }
      );

      return deleteOne;
    } catch (error) {
      console.log(error);
    }
  };


  emptyCart = async (cid) => {
    try {
      const emptyCart = await cartModel.updateOne(
        {
          _id: cid,
        },
        {
          $set: {
            cart: [],
          },
        }
      );

      return emptyCart;
    } catch (error) {
      console.log(error);
    }
  };
}