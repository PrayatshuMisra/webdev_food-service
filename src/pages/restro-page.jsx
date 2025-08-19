import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiStar, FiClock, FiHeart, FiChevronDown } from 'react-icons/fi';
import { formatCurrency } from '../utils/formatters';

const featuredRestaurants = [
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

const cuisines = [
  'All Cuisines',
  'North Indian',
  'South Indian',
  'Indian Chinese',
];

const sortOptions = [
  { value: 'rating-desc', label: 'Rating: High to Low' },
  { value: 'delivery-time', label: 'Delivery Time' },
  { value: 'min-order', label: 'Minimum Order' },
];

export default function Restaurants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredRestaurants, setFilteredRestaurants] = useState(featuredRestaurants);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
    
    let result = [...featuredRestaurants];
    
    if (query) {
      const queryLower = query.toLowerCase();
      result = result.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(queryLower) ||
          restaurant.cuisine.toLowerCase().includes(queryLower)
      );
    }
    
    if (selectedCuisine !== 'All Cuisines') {
      result = result.filter((restaurant) =>
        restaurant.cuisine.includes(selectedCuisine)
      );
    }
    
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          return b.rating - a.rating;
        case 'delivery-time':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'min-order':
          return a.minOrder - b.minOrder;
        default:
          return 0;
      }
    });
    
    setFilteredRestaurants(result);
  }, [searchQuery, selectedCuisine, sortBy, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  const handleToggleFavorite = (restaurantId) => {
    setFavorites(prev => 
      prev.includes(restaurantId) 
        ? prev.filter(id => id !== restaurantId) 
        : [...prev, restaurantId]
    );
  };

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
 
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">
            {searchParams.get('search') 
              ? `Search Results for "${searchParams.get('search')}"` 
              : 'All Restaurants'}
          </h1>
          <p className="text-gray-600">
            {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-between w-full md:w-48 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <span className="truncate">{selectedCuisine}</span>
                <FiChevronDown className={`ml-2 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isFilterOpen && (
                <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="py-1 max-h-60 overflow-y-auto">
                    {cuisines.map((cuisine) => (
                      <button
                        key={cuisine}
                        onClick={() => {
                          setSelectedCuisine(cuisine);
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedCuisine === cuisine
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center justify-between w-full md:w-56 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <span>Sort by: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                <FiChevronDown className={`ml-2 transition-transform ${isSortOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 z-10 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          sortBy === option.value
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <motion.div 
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
              >
                <div className="relative h-48">
                  <Link to={`/restaurants/${restaurant.id}`} className="block w-full h-full">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
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
                   <button 
                    onClick={() => handleToggleFavorite(restaurant.id)}
                    className={`absolute top-2 left-2 p-2 rounded-full transition-colors ${favorites.includes(restaurant.id) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-red-100'}`}>
                    <FiHeart className={`w-5 h-5 ${favorites.includes(restaurant.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/restaurants/${restaurant.id}`} className="block">
                      <h3 className="font-bold text-lg text-gray-900 hover:text-primary transition-colors">{restaurant.name}</h3>
                      <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                    </Link>
                    <div className="flex items-center bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                      <FiStar className="text-yellow-500 mr-1" />
                      {restaurant.rating}
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between text-sm text-gray-600">
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg 
                  className="mx-auto h-16 w-16" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No restaurants found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any restaurants matching your search. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('All Cuisines');
                  setSearchParams({});
                }}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {filteredRestaurants.length > 0 && (
          <div className="mt-10 text-center">
            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors">
              Load More Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
