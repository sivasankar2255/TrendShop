"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Smartphone, CheckCircle, ShieldCheck, ArrowLeft, Lock } from "lucide-react";
import type { RootState } from "../store/store";
import { clearCart } from "../store/features/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Credit Card">("UPI");
  const [upiOption, setUpiOption] = useState<"gpay" | "phonepe" | "paytm" | "custom">("gpay");
  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [shippingForm, setShippingForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  useEffect(() => {
    if (user?.name) {
      setShippingForm((prev) => ({ ...prev, fullName: user.name }));
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 shadow-lg space-y-6">
          <Lock className="mx-auto text-blue-600 dark:text-blue-400" size={48} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Authentication Required</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Please log in or create an account to proceed with your checkout and secure payment.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-md"
            >
              Log In to Checkout
            </Link>
            <Link
              href="/signup"
              className="border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Cart is Empty</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-md"
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { fullName, phone, address, city, state, pincode } = shippingForm;
    if (!fullName || !phone || !address || !city || !state || !pincode) {
      setError("Please fill in all shipping address fields.");
      return;
    }

    if (paymentMethod === "UPI" && upiOption === "custom" && !upiId.includes("@")) {
      setError("Please enter a valid UPI ID (e.g. username@upi)");
      return;
    }

    if (paymentMethod === "Credit Card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        setError("Please enter a valid 16-digit Card Number.");
        return;
      }
      if (!cardHolder || !cardExpiry || cardCvv.length < 3) {
        setError("Please complete all credit/debit card details.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const paymentDetails =
        paymentMethod === "UPI"
          ? { upiId: upiOption === "custom" ? upiId : `${user?.name.toLowerCase().replace(/\s+/g, "")}@${upiOption}` }
          : { cardLast4: cardNumber.slice(-4), cardHolderName: cardHolder };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user?.email,
          items: cartItems.map((item) => ({
            productId: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || "/products/watches.jpeg",
          })),
          shippingAddress: shippingForm,
          paymentMethod,
          paymentDetails,
          subtotal,
          shipping,
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to place order.");
      }

      dispatch(clearCart());
      setOrderSuccess(data.order);
    } catch (err: any) {
      setError(err.message || "Order placement failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Success Modal Overlay */}
      {orderSuccess && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle size={36} />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Order Placed Successfully! 🎉</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Thank you for your purchase. Your payment via <span className="font-bold text-blue-600 dark:text-blue-400">{orderSuccess.paymentMethod}</span> was verified.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl text-left space-y-2 text-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Order ID:</span>
                <span className="font-mono font-bold text-gray-900 dark:text-white">{orderSuccess._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Paid:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{orderSuccess.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Estimated Delivery:</span>
                <span className="font-semibold text-gray-900 dark:text-white">3 - 5 Business Days</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/profile"
                className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-md"
              >
                View Your Orders
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart" className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Secure Checkout & Payment</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-medium text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>1. Shipping Address</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shippingForm.fullName}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={shippingForm.phone}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <input
              type="text"
              name="address"
              placeholder="Flat, House no., Building, Street Address"
              value={shippingForm.address}
              onChange={handleFormChange}
              required
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingForm.city}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingForm.state}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={shippingForm.pincode}
                onChange={handleFormChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Options */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              2. Choose Payment Method
            </h2>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("UPI")}
                className={`p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold transition ${
                  paymentMethod === "UPI"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-600/30"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Smartphone size={22} />
                <span>UPI Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("Credit Card")}
                className={`p-4 rounded-2xl border flex items-center justify-center gap-3 font-bold transition ${
                  paymentMethod === "Credit Card"
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-600/30"
                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <CreditCard size={22} />
                <span>Credit / Debit Card</span>
              </button>
            </div>

            {/* UPI Option Section */}
            {paymentMethod === "UPI" && (
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Select your UPI App or Enter UPI ID:
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "gpay", name: "Google Pay", color: "text-blue-600" },
                    { id: "phonepe", name: "PhonePe", color: "text-purple-600" },
                    { id: "paytm", name: "Paytm", color: "text-cyan-600" },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setUpiOption(app.id as any)}
                      className={`p-3 rounded-xl border text-sm font-bold text-center transition ${
                        upiOption === app.id
                          ? "border-blue-600 bg-white dark:bg-gray-900 text-blue-600 shadow-xs"
                          : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {app.name}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Or Enter Custom VPA / UPI ID:
                  </label>
                  <input
                    type="text"
                    placeholder="username@okaxis / username@upi"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      setUpiOption("custom");
                    }}
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Credit Card Section */}
            {paymentMethod === "Credit Card" && (
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="4532 •••• •••• 8921"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim())}
                    required
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name as printed on card"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      CVV Code
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      required
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none text-center font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{shipping}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-blue-600 dark:text-blue-400">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                "Verifying & Placing Order..."
              ) : (
                <>
                  <ShieldCheck size={20} />
                  <span>Pay ₹{total} & Confirm Order</span>
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck size={14} className="text-emerald-500" /> 256-Bit SSL Encrypted & Secured Payment
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
}
