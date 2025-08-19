import { useState, useEffect } from 'react'; //useState and useEffect are hooks for state management like isOpen...
import { Link, useNavigate } from 'react-router-dom'; //Link is used to navigate to different pages without page reloads
import { useCart } from '../context/cart-context'; //useCart is used to access the cart data, no. of items
import { useAuth } from '../context/user-login-auth'; //useAuth is used to access the user data
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi'; //Feather icons are used for icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); //isOpen is used to toggle the mobile menu like open/close
  const [searchQuery, setSearchQuery] = useState(''); //searchQuery is used to store the search query given by user
  const [scrolled, setScrolled] = useState(false); //scrolled is used to track the users scroll and update the bg accordingly
  const { itemCount } = useCart(); //itemCount is used to get the number of items in the cart
  const { user, isAuthenticated, logout } = useAuth(); //user is used to get the user data
  const navigate = useNavigate(); //navigate is used to navigate to different pages

  useEffect(() => { //useEffect is used to perform side effects
    const handleScroll = () => { //handleScroll is used to handle the scroll event
      if (window.scrollY > 10) { //if the scroll position is greater than 10
        setScrolled(true); //setScrolled is used to toggle the translucent background
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll); //add event listener for scroll event
    return () => window.removeEventListener('scroll', handleScroll); //remove event listener for scroll event
  }, []);

  const handleSearch = (e) => { //handleSearch is used to handle the search event
    e.preventDefault();
    if (searchQuery.trim()) { //if the search query is not empty
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`); //navigate to the search page
      setSearchQuery(''); //clear the search query
      setIsOpen(false); //close the mobile menu
    }
  };

  const handleLogout = () => { //handleLogout is used to handle the logout event 
    logout();
    setIsOpen(false); //close the mobile menu
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${ //fixed position, z-index 50, transition duration 300ms
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm' 
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center"> 
          <Link to="/" className="flex items-center space-x-2"> 
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> 
              FoodOS
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/restaurants" 
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Restaurants
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for food..."
                value={searchQuery} //value of the input
                onChange={(e) => setSearchQuery(e.target.value)} //on change event
                className="pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent w-64"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <FiSearch size={18} />
              </button>
            </form>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-dark hover:text-primary">
              <FiShoppingCart size={22} /> 
              {itemCount > 0 && ( //if itemCount is greater than 0
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount} 
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)} //on click event
              className="text-dark hover:text-primary p-2 focus:outline-none" //hover effect
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="relative p-2 text-dark hover:text-primary">
              <FiShoppingCart size={22} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? ( //if user is authenticated
              <div className="relative group">
                <Link to="/profile" className="flex items-center space-x-2"> 
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {user.avatar ? ( //if user has an avatar
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <FiUser className="text-gray-500" size={18} /> 
                    )}
                  </div>
                  <span className="text-dark font-medium">{user.name.split(' ')[0]}</span> 
                </Link>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout} //on click event 
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <FiLogOut className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {isOpen && ( //if isOpen is true
          <div className="md:hidden mt-4 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100"
                onClick={() => setIsOpen(false)} 
              >
                Home
              </Link>
              <Link
                to="/restaurants"
                className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100"
                onClick={() => setIsOpen(false)} //on click event 
              >
                Restaurants
              </Link>
              
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for food..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} //on change event 
                    className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
                  >
                    <FiSearch size={18} />
                  </button>
                </div>
              </form>

              <div className="border-t border-gray-200 mt-3 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <FiUser className="text-gray-500" size={14} />
                        )}
                      </div>
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90 text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
