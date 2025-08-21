import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiClock, FiStar, FiMapPin, FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiChevronLeft } from 'react-icons/fi';
import { useCart } from '../context/cart-context';


const mockRestaurant = { //this will be used to display the restaurant details
  id: 1,
  name: 'Burger Palace',
  cuisine: 'American, Fast Food',
  rating: 4.5,
  reviewCount: 1245,
  deliveryTime: '20-30 min',
  deliveryFee: 'Free',
  minOrder: '$10',
  image: '/assets/restos/resto1.jpg',
  coverImage: '/assets/restos/resto1-cover.jpg',
  isOpen: true,
  isFavorite: true,
  tags: ['Burgers', 'Fries', 'Shakes', 'American', 'Fast Food'],
  distance: '0.5 miles',
  address: '123 Food Street, Cuisine City, FC 12345',
  phone: '(555) 123-4567',
  hours: [
    { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Thursday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Friday', hours: '11:00 AM - 11:30 PM' },
    { day: 'Saturday', hours: '10:00 AM - 11:30 PM' },
    { day: 'Sunday', hours: '10:00 AM - 10:00 PM' },
  ],
  about: 'Burger Palace has been serving delicious, high-quality burgers since 1995. We use only the freshest ingredients to create mouthwatering burgers that keep our customers coming back for more.',
  menu: [
    {
      category: 'Burgers',
      items: [
        {
          id: 101,
          name: 'Classic Burger',
          description: 'Juicy beef patty with lettuce, tomato, onion, pickles, and our special sauce on a toasted bun',
          price: 8.99,
          image: '/assets/dishes/burger1.jpg',
          isVeg: false,
          isSpicy: false,
          isPopular: true,
          addons: [
            { id: 1, name: 'Cheese', price: 1.00 },
            { id: 2, name: 'Bacon', price: 2.00 },
          ],
        },

      ],
    },

  ],
};

export default function RestaurantDetail() {  //this will be used to display the restaurant details
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const openItemModal = (item) => {
    setSelectedItem(item);
    setSelectedAddons({});
    setSpecialInstructions('');
    setQuantity(0);
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState({});
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => { //this will be used to fetch the restaurant details
    const fetchRestaurant = async () => { //this will be used to fetch the restaurant details
      await new Promise(resolve => setTimeout(resolve, 500));
      setRestaurant(mockRestaurant);
      setIsFavorite(mockRestaurant.isFavorite);
      
      if (mockRestaurant.menu.length > 0) { //this will be used to fetch the restaurant details
        setActiveCategory(mockRestaurant.menu[0].category);
        const expanded = {};
        mockRestaurant.menu.forEach(cat => {
          expanded[cat.category] = true;
        });
        setExpandedSections(expanded);
      }
    };
    
    fetchRestaurant();
  }, [id]);


  
  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="relative">
        <div className="h-48 md:h-64 w-full overflow-hidden">
          <img 
            src={restaurant.coverImage || restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x400?text=Restaurant+Cover';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative -mt-16">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="flex items-center">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{restaurant.name}</h1>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="ml-3 text-2xl"
                  >
                    {isFavorite ? '❤️' : '🤍'}
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
                
                <div className="flex flex-wrap items-center mt-3 text-sm text-gray-600">
                  <div className="flex items-center mr-4 mb-2">
                    <FiStar className="text-yellow-500 mr-1" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{restaurant.reviewCount}+ ratings</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <FiClock className="text-gray-500 mr-1" />
                    <span>{restaurant.deliveryTime} delivery</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FiMapPin className="text-gray-500 mr-1" />
                    <span>{restaurant.distance} away</span>
                  </div>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {restaurant.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 p-4 border border-gray-200 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Delivery Fee</div>
                  <div className="text-lg font-bold text-primary">{restaurant.deliveryFee}</div>
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Min. Order</div>
                  <div className="text-lg font-bold">{restaurant.minOrder}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">

          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="font-bold text-lg mb-4">Menu Categories</h2>
              <div className="space-y-2">
                {restaurant.menu.map((category) => (
                  <button
                    key={category.category}
                    onClick={() => setActiveCategory(category.category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === category.category
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-3/4">
            {restaurant.menu.map((category) => (
              <div key={category.category} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
                  {category.category}
                  <button
                    onClick={() => toggleCategory(category.category)}
                    className="md:hidden text-gray-500"
                  >
                    {expandedSections[category.category] ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                </h2>
                
                <div className={`${expandedSections[category.category] ? 'block' : 'hidden md:block'}`}>
                  <div className="grid grid-cols-1 gap-4">
                    {category.items.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-4 flex">
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h3 className="font-bold text-gray-900">{item.name}</h3>
                              <span className="ml-2 font-bold text-gray-900">${item.price.toFixed(2)}</span>
                            </div>
                            <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                            {item.isPopular && (
                              <span className="inline-block mt-2 text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="w-24 h-24 rounded-md overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/100x100?text=Food+Image';
                                }}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedItem(item);
                                  setQuantity(prev => Math.max(0, prev - 1));
                                  if (quantity === 1) {
                                    // Remove from cart when quantity reaches 0
                                    return;
                                  }
                                }}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l-md hover:bg-gray-300 transition-colors"
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="w-10 text-center text-sm font-medium">
                                {quantity}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedItem(item);
                                  setQuantity(prev => prev + 1);
                                }}
                                className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors"
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeItemModal}>
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {selectedItem.name}
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={closeItemModal}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-500">
                      {selectedItem.description}
                    </p>
                    
                    {selectedItem.addons.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Add-ons</h4>
                        <div className="space-y-2">
                          {selectedItem.addons.map((addon) => (
                            <label key={addon.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                  checked={!!selectedAddons[addon.id]}
                                  onChange={() => toggleAddon(addon.id)}
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                  {addon.name}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">+${addon.price.toFixed(2)}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <label htmlFor="special-instructions" className="block text-sm font-medium text-gray-700 mb-1">
                        Special Instructions
                      </label>
                      <textarea
                        id="special-instructions"
                        rows="2"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm"
                        placeholder="Any special requests?"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <button
                          type="button"
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <FiMinus />
                        </button>
                        <span className="px-4 py-1">{quantity}</span>
                        <button
                          type="button"
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <FiPlus />
                        </button>
                      </div>
                      
                      <div className="text-lg font-bold">
                        ${(selectedItem.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddToCart}
                >
                  Add to Cart - ${(selectedItem.price * quantity).toFixed(2)}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeItemModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
