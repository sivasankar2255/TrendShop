import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface IOrder extends Document {
  userEmail: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: "UPI" | "Credit Card" | "COD";
  paymentStatus: "Paid" | "Pending";
  paymentDetails?: {
    upiId?: string;
    cardLast4?: string;
    cardHolderName?: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema<IOrderItem> = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

const ShippingAddressSchema: Schema<IShippingAddress> = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
});

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    items: [OrderItemSchema],
    shippingAddress: { type: ShippingAddressSchema, required: true },
    paymentMethod: { type: String, required: true, default: "UPI" },
    paymentStatus: { type: String, required: true, default: "Paid" },
    paymentDetails: {
      upiId: String,
      cardLast4: String,
      cardHolderName: String,
    },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true },
    status: { type: String, default: "Processing" },
  },
  {
    timestamps: true,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
