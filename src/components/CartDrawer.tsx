import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Gift, CreditCard, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useApp } from "../utils/store";
import { BrandLogo } from "./BrandLogo";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart
  } = useApp();

  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [giftEnabled, setGiftEnabled] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isCartOpen, setCartOpen]);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 45 ? 0 : 5; // Free shipping over $45
  const total = subtotal + shipping;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCheckoutOpen(false);
        clearCart();
        setCartOpen(false);
      }, 5000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && <div className="fixed inset-0 z-50 flex justify-end no-print" role="dialog" aria-modal="true" aria-label="Your Shoresh shopping bag">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isCheckoutOpen) setCartOpen(false);
          }}
          className="absolute inset-0 bg-brand/50 backdrop-blur-sm"
        />

        {/* Sliding Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white text-brand h-full shadow-2xl flex flex-col justify-between z-10"
        >
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand/15">
            <div className="flex items-center gap-2">
              <BrandLogo format="mark" className="w-9" decorative />
              <h2 className="font-serif text-2xl font-medium text-brand">Your shopping bag</h2>
            </div>
            <button
              ref={closeRef}
              onClick={() => setCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              aria-label="Close shopping bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-brand">Preview order complete.</h3>
                <p className="text-sm text-stone-600 max-w-xs">
                  This was a demonstration for <span className="font-semibold">{email}</span>. No payment was taken, no email was sent, and no package will be shipped.
                </p>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-500 space-y-1 w-full text-left">
                  <p className="font-semibold text-stone-700">Receipt Details:</p>
                  <p>Order ID: SHRS-{Math.floor(Math.random() * 90000) + 10000}</p>
                  <p>Sourced from Greenfield, Pittsburgh</p>
                  <p>No card was charged.</p>
                </div>
              </div>
            ) : isCheckoutOpen ? (
              /* MOCK STRIPE CHECKOUT FORM */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 pt-2">
                <div className="border-b border-stone-200 pb-4 mb-4">
                  <h3 className="font-serif text-lg font-bold text-stone-800 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand" />
                    <span>Preview checkout</span>
                  </h3>
                  <p className="text-base text-brand-muted">Demo only. No payment details are collected.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Frances or Mark"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-base focus:border-brand"
                    />
                  </div>

                  <p className="text-base text-brand-muted">Live checkout will use Stripe's hosted payment page once the payment service is connected. Do not enter payment details in this preview.</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl space-y-2 border border-stone-200 mt-6 text-sm">
                  <div className="flex justify-between font-bold">
                    <span>Total Charged:</span>
                    <span className="text-brand">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(false)}
                    className="flex-1 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-700 text-sm font-semibold text-center cursor-pointer"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="brand-button flex-1 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Complete preview</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full space-y-4 py-12">
                <BrandLogo format="mark" className="w-28" />
                <p className="text-stone-500 font-serif text-lg">Your coffee cup is empty.</p>
                <p className="text-xs text-stone-400 max-w-xs">
                  Browse our curated catalog of fresh home-roasted Greenfield blends, mugs, and books.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="brand-button"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              /* CART LISTINGS */
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 bg-white p-3.5 rounded-2xl border border-stone-100 hover:border-brand/20 transition-all duration-300"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-stone-800 text-sm truncate">{item.product.title}</h4>
                      <p className="text-xs text-stone-400 mt-0.5">{item.product.category}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-stone-200 rounded-full bg-stone-50">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 text-base text-brand font-semibold"
                            aria-label={`Decrease quantity of ${item.product.title}`}
                          >
                            -
                          </button>
                          <span className="px-1 text-xs font-bold text-stone-800">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 text-base text-brand font-semibold"
                            aria-label={`Increase quantity of ${item.product.title}`}
                          >
                            +
                          </button>
                        </div>

                        <span className="text-brand font-semibold text-base">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-brand-muted hover:text-brand transition-colors self-start shrink-0"
                      aria-label={`Remove ${item.product.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Gift Selection option */}
                <div className="pt-4 border-t border-brand/15 space-y-3">
                  <button
                    onClick={() => setGiftEnabled(!giftEnabled)}
                    className="flex items-center gap-2 text-base font-medium text-brand hover:underline cursor-pointer"
                  >
                    <Gift className="w-4.5 h-4.5" />
                    <span>{giftEnabled ? "Remove Gift Message" : "Send as a gift (+ Free Greeting Card)"}</span>
                  </button>

                  {giftEnabled && (
                    <textarea
                      rows={2}
                      placeholder="Write your blessing or message here... (e.g., 'Mazel Tov on the new home! Enjoy this coffee together.')"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl p-3 text-base focus:border-brand"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {!isSuccess && cart.length > 0 && (
            <div className="p-6 bg-white border-t border-brand/15 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-brand font-semibold">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-stone-400 text-right font-light">
                    Add ${(45 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between font-bold text-stone-800 text-base pt-2 border-t border-stone-100">
                  <span>Total (Inc. Taxes)</span>
                  <span className="text-brand">${total.toFixed(2)}</span>
                </div>
              </div>

              {!isCheckoutOpen ? (
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="brand-button w-full"
                >
                  <CreditCard className="w-4.5 h-4.5" />
                  <span>Proceed to Checkout</span>
                </button>
              ) : null}
            </div>
          )}
        </motion.div>
      </div>}
    </AnimatePresence>
  );
};
