import { useState, useEffect, useContext } from 'react'; //useState and useEffect are hooks for state management like isOpen...
import { Link, useNavigate } from 'react-router-dom'; //Link is used to navigate to different pages without page reloads
import { motion } from 'framer-motion'; //motion is used for animations
import { FiClock, FiStar, FiTruck, FiPlus, FiMinus, FiShoppingCart, FiHeart, FiCheck } from 'react-icons/fi'; //react-icons: for icons
import { formatCurrency } from '../utils/formatters'; //formatCurrency: for currency formatting
import { useCart } from '../context/cart-context'; //useCart: for accessing the cart context
import { useAuth } from '../context/user-login-auth'; //useAuth: for accessing the user context

const featuredRestaurants = [ //this will have the featured restaurants
  {
    id: 1,
    name: 'Spice Garden',
    cuisine: 'North Indian',
    rating: 4.6,
    deliveryTime: '20-30 min',
    image: '/assets/dishes/north1.jpg',
    isOpen: true,
    minOrder: 199,
    discount: '30% OFF',
  },
  {
    id: 2,
    name: 'Dosa Plaza',
    cuisine: 'South Indian',
    rating: 4.5,
    deliveryTime: '25-35 min',
    image: '/assets/dishes/north5.jpg',
    isOpen: true,
    minOrder: 149,
    discount: '20% OFF',
  },
  {
    id: 3,
    name: 'Punjabi Dhaba',
    cuisine: 'North Indian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    image: '/assets/dishes/north8.jpg',
    isOpen: true,
    minOrder: 249,
    discount: '40% OFF',
  },
  {
    id: 4,
    name: 'Chinese Wok',
    cuisine: 'Indian Chinese',
    rating: 4.4,
    deliveryTime: '20-30 min',
    image: '/assets/dishes/chinese3.jpg',
    isOpen: true,
    minOrder: 179,
    discount: '25% OFF',
  },
];

const popularDishes = [ //this will have the popular dishes
  {
    id: 1,
    name: 'Butter Chicken',
    description: 'Tender chicken in a creamy tomato gravy.',
    price: 299,
    image: '/assets/dishes/north2.jpg',
    category: 'north-indian',
    rating: 4.7,
    deliveryTime: '25 min',
    isVeg: false
  },
  {
    id: 2,
    name: 'Masala Dosa',
    description: 'Crispy crepe with spiced potato filling.',
    price: 149,
    image: '/assets/dishes/north6.jpg',
    category: 'south-indian',
    rating: 4.5,
    deliveryTime: '20 min',
    isVeg: true
  },
  {
    id: 3,
    name: 'Paneer Tikka',
    description: 'Grilled paneer cubes marinated in spices.',
    price: 229,
    image: '/assets/dishes/north3.jpg',
    category: 'north-indian',
    rating: 4.6,
    deliveryTime: '15 min',
    isVeg: true
  },
  {
    id: 4,
    name: 'Chicken Biryani',
    description: 'Aromatic rice with succulent chicken.',
    price: 249,
    image: '/assets/dishes/north4.jpg',
    category: 'hyderabadi',
    rating: 4.8,
    deliveryTime: '30 min',
    isVeg: false
  },
  {
    id: 5,
    name: 'Gulab Jamun',
    description: 'Milk-solid dumplings in sugar syrup.',
    price: 99,
    image: '/assets/dishes/cake3.jpg',
    category: 'dessert',
    rating: 4.9,
    deliveryTime: '10 min',
    isVeg: true
  },
  {
    id: 6,
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry with fried bread.',
    price: 179,
    image: '/assets/dishes/north7.jpg',
    category: 'north-indian',
    rating: 4.7,
    deliveryTime: '20 min',
    isVeg: true
  },
  {
    id: 7,
    name: 'Hakka Noodles',
    description: 'Stir-fried noodles with vegetables.',
    price: 179,
    image: '/assets/dishes/chinese1.jpg',
    category: 'indo-chinese',
    rating: 4.3,
    deliveryTime: '15 min',
    isVeg: true
  },
  {
    id: 8,
    name: 'Dal Makhani',
    description: 'Creamy slow-cooked black lentils.',
    price: 199,
    image: '/assets/dishes/north9.jpg',
    category: 'north-indian',
    rating: 4.7,
    deliveryTime: '20 min',
    isVeg: true
  },
  {
    id: 9,
    name: 'Idli Sambar',
    description: 'Steamed rice cakes with lentil soup.',
    price: 129,
    image: '/assets/dishes/north10.jpg',
    category: 'south-indian',
    rating: 4.6,
    deliveryTime: '15 min',
    isVeg: true
  },
  {
    id: 10,
    name: 'Samosa Chaat',
    description: 'Samosas with yogurt and chutneys.',
    price: 99,
    image: '/assets/dishes/north11.jpg',
    category: 'street-food',
    rating: 4.8,
    deliveryTime: '10 min',
    isVeg: true
  },
  {
    id: 11,
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken in a creamy tomato sauce.',
    price: 279,
    image: '/assets/dishes/north12.jpg',
    category: 'north-indian',
    rating: 4.8,
    deliveryTime: '25 min',
    isVeg: false
  },
  {
    id: 12,
    name: 'Rajma Chawal',
    description: 'Kidney bean curry with steamed rice.',
    price: 159,
    image: '/assets/dishes/north13.jpg',
    category: 'north-indian',
    rating: 4.5,
    deliveryTime: '20 min',
    isVeg: true
  },
  {
    id: 13,
    name: 'Vada Pav',
    description: 'Spicy potato fritter in a bun.',
    price: 49,
    image: '/assets/dishes/north14.jpg',
    category: 'street-food',
    rating: 4.7,
    deliveryTime: '10 min',
    isVeg: true
  },
  {
    id: 14,
    name: 'Mutton Rogan Josh',
    description: 'Aromatic Kashmiri lamb curry.',
    price: 349,
    image: '/assets/dishes/north15.jpg',
    category: 'north-indian',
    rating: 4.8,
    deliveryTime: '30 min',
    isVeg: false
  },
  {
    id: 15,
    name: 'Pani Puri',
    description: 'Hollow puris with spicy water.',
    price: 59,
    image: '/assets/dishes/north16.jpg',
    category: 'street-food',
    rating: 4.9,
    deliveryTime: '10 min',
    isVeg: true
  },
  {
    id: 16,
    name: 'Butter Naan',
    description: 'Soft leavened bread with butter.',
    price: 49,
    image: '/assets/dishes/north2.jpg',
    category: 'bread',
    rating: 4.7,
    deliveryTime: '15 min',
    isVeg: true
  },
];
const containerVariants = { //this will have the container variants
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = { //this will have the item variants
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() { //this will be used to display the home page
  const { addToCart, cart } = useCart(); //useCart: for accessing the cart context
  const { isAuthenticated } = useAuth(); //useAuth: for accessing the user context
  const navigate = useNavigate(); //this will have the navigate function
  
  const [quantities, setQuantities] = useState({}); //this will have the quantities of the dishes
  const [favorites, setFavorites] = useState(() => { //this will have the favorites
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState(''); //this will have the search query
  const [activeCategory, setActiveCategory] = useState('all'); //this will have the active category

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleQuantityChange = (dishId, amount) => { //this will be used to change the quantity of a dish
    setQuantities(prev => ({ //this will be used to set the quantities of the dishes
      ...prev,
      [dishId]: Math.max(1, (prev[dishId] || 1) + amount), //this will be used to change the quantity of a dish
    }));
  };

  const handleToggleFavorite = (dishId) => { //this will be used to toggle the favorite status of a dish
    setFavorites(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId) 
        : [...prev, dishId]
    );
  };

  const handleAddToCart = (dish) => { //this will be used to add a dish to the cart
    if (!isAuthenticated) { //this will check if the user is authenticated
      navigate('/login'); //this will navigate to the login page
      return;
    }
    addToCart({ //this will be used to add a dish to the cart
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image,
    }, quantities[dish.id] || 1); //this will be used to add a dish to the cart
  };

  const isInCart = (dishId) => cart.some(item => item.id === dishId); //this will check if a dish is in the cart

  const filteredDishes = popularDishes.filter(dish => { //this will filter the dishes
    const matchesCategory = activeCategory === 'all' || dish.category.toLowerCase() === activeCategory.toLowerCase(); //this will check if the dish matches the active category
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()); //this will check if the dish matches the search query
    return matchesCategory && matchesSearch; //this will return the dishes that match the active category and search query
  });

  const foodCategories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'north-indian', name: 'North Indian', icon: '🥘' },
    { id: 'south-indian', name: 'South Indian', icon: '🍛' },
    { id: 'hyderabadi', name: 'Hyderabadi', icon: '🍲' },
    { id: 'indo-chinese', name: 'Chinese', icon: '🍜' },
    { id: 'street-food', name: 'Street Food', icon: '🌭' },
    { id: 'dessert', name: 'Desserts', icon: '🍰' },
    { id: 'bread', name: 'Breads', icon: '🥖' },
  ];

  const handleSearch = (e) => { //this will be used to handle the search
    e.preventDefault(); //this will prevent the default action
    if (searchQuery.trim()) { //this will check if the search query is not empty
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`); //this will navigate to the search page
    }
  };

  return (
    <div className="pt-16">
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-dark mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Delicious food delivered to your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">doorstep</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Order from your favorite restaurants with just a few clicks. Fast delivery, great prices, and amazing food!
            </motion.p>
            
            <motion.form 
              onSubmit={handleSearch} //this will be used to handle the search
              className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  className="w-full p-4 text-lg border-none focus:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} //this will be used to change the search query
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <button 
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg"
              >
                Find Food
              </button>
            </motion.form>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <FiClock className="text-primary mr-2" />
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <FiStar className="text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Top Rated</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-md">
                <FiTruck className="text-green-500 mr-2" />
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-3">Food Categories</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="flex overflow-x-auto pb-6 -mx-2 scrollbar-hide">
            <div className="flex space-x-4 px-2">
              {foodCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)} //this will be used to set the active category
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark">Browse by Category</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-2 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {foodCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }} //this will be used to animate the category button on hover
                whileTap={{ scale: 0.95 }} //this will be used to animate the category button on tap
                className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                  activeCategory === category.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setActiveCategory(category.id)} //this will be used to set the active category
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Restaurants Near You</h2>
          <Link to="/restaurants" className="text-orange-600 font-medium hover:text-orange-700 flex items-center">
            View All <span className="ml-1">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="block">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} //this will be used to animate the restaurant card on load
                animate={{ opacity: 1, y: 0 }} //this will be used to animate the restaurant card on load
                transition={{ duration: 0.3 }} //this will be used to animate the restaurant card on load
                whileHover={{ y: -5 }} //this will be used to animate the restaurant card on hover
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
              >
                <div className="relative h-48">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover"
                />
                {restaurant.isOpen ? (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 bg-white rounded-full mr-1"></span> Open Now
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Closed
                  </span>
                )}
                {restaurant.discount && (
                  <div className="absolute bottom-0 left-0 bg-yellow-400 text-yellow-900 font-bold text-xs px-2 py-1 rounded-tr-md">
                    {restaurant.discount}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                  </div>
                  <div className="flex items-center bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                    <FiStar className="text-yellow-500 mr-1" />
                    {restaurant.rating}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div>
                    <span className="text-xs">Min. </span>
                    <span className="font-medium">{formatCurrency(restaurant.minOrder)}</span>
                  </div>
                </div>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <section className="bg-gradient-to-r from-orange-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Popular Dishes</h2>
            <Link to="/dishes" className="text-orange-600 font-medium hover:text-orange-700 flex items-center">
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredDishes.map((dish, index) => (
              <motion.div 
                key={dish.id}
                variants={itemVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 card-hover"
              >
                <div className="relative h-48">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Dish+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => handleToggleFavorite(dish.id)}
                      className={`p-2 rounded-full transition-colors ${favorites.includes(dish.id) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-red-100'}`}
                    >
                      <FiHeart className={`w-5 h-5 ${favorites.includes(dish.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-bold">{dish.name}</h3>
                  <p className="text-sm text-gray-500">{dish.description}</p>
                  <p className="text-lg font-bold text-primary mt-2">{formatCurrency(dish.price)}</p>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleQuantityChange(dish.id, -1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                      <FiMinus />
                    </button>
                    <span className="font-bold text-lg">{quantities[dish.id] || 1}</span>
                    <button onClick={() => handleQuantityChange(dish.id, 1)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                      <FiPlus />
                    </button>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(dish)}
                    disabled={isInCart(dish.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${isInCart(dish.id) ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-secondary text-white hover:bg-secondary-dark'}`}>
                    {isInCart(dish.id) ? (
                      <>
                        <FiCheck />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <FiShoppingCart />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-12">
            <Link 
              to="/restaurants" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              View All Restaurants
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-dark mb-4">Download Our Mobile App</h2>
              <p className="text-gray-600 mb-6">
                Get the best food delivery experience with our mobile app. Order your favorite meals with just a few taps and track your delivery in real-time.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => alert('Redirecting to Google Play...') } className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm.921.49L15.077 12l-10.547 9.696V2.304zM5 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm4 1v6a1 1 0 1 1-2 0V9a1 1 0 1 1 2 0zm11.919-4.814L11.698 12l9.22 10.186a.992.992 0 0 0 1.09.214.99.99 0 0 0 .35-.302.987.987 0 0 0 .24-.74V2.734a1 1 0 0 0-.609-.92 1.01 1.01 0 0 0-1.08.22z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button onClick={() => alert('Redirecting to Google Play...') } className="flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm.921.49L15.077 12l-10.547 9.696V2.304zM5 8a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1zm4 1v6a1 1 0 1 1-2 0V9a1 1 0 1 1 2 0zm11.919-4.814L11.698 12l9.22 10.186a.992.992 0 0 0 1.09.214.99.99 0 0 0 .35-.302.987.987 0 0 0 .24-.74V2.734a1 1 0 0 0-.609-.92 1.01 1.01 0 0 0-1.08.22z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
                <img 
                  src="/assets/phone-mockup.png" 
                  alt="FoodOS App" 
                  className="relative z-10 w-64 h-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-64 h-96 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500';
                    placeholder.textContent = 'App Preview';
                    e.target.parentNode.appendChild(placeholder);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
