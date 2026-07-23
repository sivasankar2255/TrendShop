import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlistItem {
  productId: string;
  name: string;
  price: number;
  category?: string;
  image: string;
}

export interface IWishlist extends Document {
  userEmail: string;
  items: IWishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistItemSchema: Schema<IWishlistItem> = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  image: { type: String, required: true },
});

const WishlistSchema: Schema<IWishlist> = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    items: [WishlistItemSchema],
  },
  {
    timestamps: true,
  }
);

const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default Wishlist;
