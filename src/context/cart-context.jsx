import { createContext, useContext, useState, useEffect } from 'react'; 
// createContext: create a React Context for global state.
// useContext: allow components to use this context.
// useState: for local state like cart and its total amount
// useEffect: for existing cart data in local storage.

const CartContext = createContext(); //this will have the cart state globally so any component can access it.

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); //this will have the cart items
  const [restaurant, setRestaurant] = useState(null); //this will have the restaurant info
  const [itemCount, setItemCount] = useState(0); //this will have the total no. of items in the cart
  const [total, setTotal] = useState(0); //this will have the total amount of the cart

  useEffect(() => { 
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []; //this will have the cart items
    const savedRestaurant = JSON.parse(localStorage.getItem('cartRestaurant')); //this will have the restaurant info
    if (savedCart.length > 0) { //if the cart is not empty
      setCart(savedCart);
      setRestaurant(savedRestaurant);
      updateCartTotals(savedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) { //if the cart is not empty
      localStorage.setItem('cart', JSON.stringify(cart));
      if (restaurant) {
        localStorage.setItem('cartRestaurant', JSON.stringify(restaurant));
      }
    } else { //if the cart is empty
      localStorage.removeItem('cart');
      localStorage.removeItem('cartRestaurant');
    }
  }, [cart, restaurant]);

  const updateCartTotals = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setItemCount(count);
    setTotal(cartTotal);
  };

  const addToCart = (item, restaurantInfo) => {
    setCart(prevCart => {

      if (restaurant && restaurant.id !== restaurantInfo.id) { //if the restaurant is not the same
        const updatedCart = [{ ...item, quantity: 1 }];
        updateCartTotals(updatedCart);
        setRestaurant(restaurantInfo);
        return updatedCart;
      }

      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id); //find the index of the item in the cart
      
      let updatedCart;
      if (existingItemIndex >= 0) { //if the item is already in the cart
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
      } else { //if the item is not in the cart
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }
      
      updateCartTotals(updatedCart);
      if (!restaurant) { //if the restaurant is not set
        setRestaurant(restaurantInfo);
      }
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== itemId); //remove the item from the cart
      updateCartTotals(updatedCart);
      
      if (updatedCart.length === 0) { //if the cart is empty
        setRestaurant(null);
      }
      
      return updatedCart;
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) { //if the quantity is less than 1 
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      const updatedCart = prevCart.map(item => //update the quantity of the item 
        item.id === itemId ? { ...item, quantity: newQuantity } : item  //if the item is the same
      );
      updateCartTotals(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]); //clear the cart
    setRestaurant(null); //clear the restaurant
    setItemCount(0); //clear the item count
    setTotal(0); //clear the total
    localStorage.removeItem('cart'); //remove the cart from local storage
    localStorage.removeItem('cartRestaurant'); //remove the restaurant from local storage
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        restaurant,
        itemCount,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => { //this will be used to access the cart context
  const context = useContext(CartContext); //this will have the cart context
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; //export the cart context
