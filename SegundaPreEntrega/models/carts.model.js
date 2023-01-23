import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartsCollection = "Carts";

const cartSchema = new Schema({
    cart: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Products",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      default: [],
    },
  });
  
  const cartsModel = mongoose.model(cartsCollection, cartSchema);
  
  export default cartsModel;