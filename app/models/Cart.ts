import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ICart extends Document {
  userEmail: string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema: Schema<ICartItem> = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, required: true },
});

const CartSchema: Schema<ICart> = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
