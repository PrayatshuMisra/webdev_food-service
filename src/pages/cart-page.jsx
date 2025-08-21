import { useState, useEffect } from 'react'; //useState: for local state like cart and its total amount
import { Link, useNavigate } from 'react-router-dom'; //useNavigate: for navigation
import { FiX, FiPlus, FiMinus, FiArrowLeft, FiClock, FiMapPin, FiCreditCard } from 'react-icons/fi'; //react-icons: for icons
import { useCart } from '../context/cart-context'; //useCart: for accessing the cart context

export default function Cart() { //this will be used to display the cart page
  const { cart, restaurant, updateQuantity, removeFromCart, clearCart, itemCount, total } = useCart(); //useCart: for accessing the cart context
  const [isCheckingOut, setIsCheckingOut] = useState(false); //this will have the checkout status
  const [deliveryAddress, setDeliveryAddress] = useState(''); //this will have the delivery address
  const [deliveryInstructions, setDeliveryInstructions] = useState(''); //this will have the delivery instructions
  const [paymentMethod, setPaymentMethod] = useState('credit_card'); //this will have the payment method
  const navigate = useNavigate(); //this will have the navigate function

  useEffect(() => { //this will be used to load the saved delivery address
    const savedAddress = localStorage.getItem('deliveryAddress');
    if (savedAddress) {
      setDeliveryAddress(savedAddress);
    }
  }, []);

  const handleIncrement = (itemId) => { //this will be used to increment the quantity of an item
    const item = cart.find(item => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId) => { //this will be used to decrement the quantity of an item
    const item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else {
      removeFromCart(itemId);
    }
  };

  const handleRemoveItem = (itemId) => { //this will be used to remove an item from the cart
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(itemId);
    }
  };

  const handleProceedToCheckout = () => { //this will be used to proceed to checkout
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    localStorage.setItem('deliveryAddress', deliveryAddress); //this will save the delivery address
    
    setIsCheckingOut(true); //this will set the checkout status to true

  };

  const handlePlaceOrder = () => { //this will be used to place an order

    alert('Order placed successfully!');
    clearCart();
    navigate('/order-confirmation');
  };

  if (cart.length === 0) { //this will be used to display the empty cart message
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet</p>
          <Link
            to="/restaurants"
            className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = restaurant?.deliveryFee === 'Free' ? 0 : parseFloat(restaurant?.deliveryFee?.replace(/[^0-9.]/g, '') || '2.99'); //this will calculate the delivery fee
  const subtotal = total;
  const tax = subtotal * 0.08; // 8% tax
  const orderTotal = subtotal + deliveryFee + tax;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 mr-2"
            >
              <FiArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {restaurant && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100?text=Restaurant';
                  }}
                />
              </div>
              <div>
                <h2 className="font-medium">{restaurant.name}</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <FiClock className="mr-1" size={14} />
                  <span>{restaurant.deliveryTime} • {restaurant.deliveryFee} delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isCheckingOut ? (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="p-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <span className="font-medium">INR{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        
                        {item.addons && item.addons.length > 0 && (
                          <div className="mt-1 text-sm text-gray-500">
                            {item.addons.map((addon, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>+ {addon.name}</span>
                                <span>+INR{addon.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {item.specialInstructions && (
                          <p className="mt-1 text-xs text-gray-500 italic">
                            Note: {item.specialInstructions}
                          </p>
                        )}
                        
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center border rounded-md">
                            <button
                              type="button"
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleDecrement(item.id)}
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="px-3 py-1 text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              onClick={() => handleIncrement(item.id)}
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="ml-4 text-red-500 text-sm hover:text-red-700"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">INR{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">INR{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">INR{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h2 className="font-medium mb-3">Delivery Address</h2>
              <div className="relative">
                <div className="flex items-center mb-2">
                  <FiMapPin className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Enter your delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    rows="2"
                    placeholder="Delivery instructions (optional)"
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
              <div className="container mx-auto px-4">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                >
                  Proceed to Checkout • INR{orderTotal.toFixed(2)}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Checkout</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4 text-primary focus:ring-primary"
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => setPaymentMethod('credit_card')}
                  />
                  <div className="ml-3">
                    <span className="block font-medium">Credit or Debit Card</span>
                    <span className="text-sm text-gray-500">Pay with Visa, Mastercard, etc.</span>
                  </div>
                  <FiCreditCard className="ml-auto text-gray-400" size={24} />
                </label>
                
                <label className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4 text-primary focus:ring-primary"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  <div className="ml-3">
                    <span className="block font-medium">Cash on Delivery</span>
                    <span className="text-sm text-gray-500">Pay with cash when your order arrives</span>
                  </div>
                </label>
              </div>
            </div>
            
            {paymentMethod === 'credit_card' && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span>INR{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'Free' : `INR${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>INR{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 mt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>INR{orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Place Order • INR{orderTotal.toFixed(2)}
              </button>
              
              <button
                onClick={() => setIsCheckingOut(false)}
                className="w-full bg-white text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
