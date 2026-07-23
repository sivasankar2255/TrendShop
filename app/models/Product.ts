import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  id?: number;
  name: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  stock: number;
  image: string;
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    stock: {
      type: Number,
      default: 10,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
