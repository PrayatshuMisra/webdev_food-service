import { useState, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/user-login-auth';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, 
  FiShoppingBag, FiHeart, FiCreditCard, FiLogOut 
} from 'react-icons/fi';

export default function Profile() { //this will be used to display the profile  
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '' 
  });
  const [activeTab, setActiveTab] = useState('profile'); //this will be used to handle the active tab
  const [isLoading, setIsLoading] = useState(false); //this will be used to show the loading state
  const [error, setError] = useState(''); //this will be used to store the error message
  const [success, setSuccess] = useState(''); //this will be used to store the success message
  const navigate = useNavigate(); //this will be used to navigate to different pages

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h2>
          <Link
            to="/login"
            state={{ from: { pathname: '/profile' } }}
            className="inline-block bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary/90"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const emptyTabContent = (icon, title, description, buttonText, buttonLink) => ( //this will be used to display the empty tab content
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
      <div className="mx-auto h-12 w-12 text-gray-400">
        {icon}
      </div>
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      {buttonText && buttonLink && (
        <div className="mt-6">
          <Link
            to={buttonLink}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
          >
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 text-center border-b border-gray-200">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500 mb-3">
                  <FiUser className="text-gray-400" />
                </div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              
              <nav className="py-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                    activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiUser className="mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                    activeTab === 'orders' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiShoppingBag className="mr-3" />
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                    activeTab === 'favorites' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiHeart className="mr-3" />
                  Favorites
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
                    activeTab === 'payments' ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiCreditCard className="mr-3" />
                  Payment Methods
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <FiLogOut className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          <div className="flex-1">
            {error && ( //this will be used to display the error message
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            
            {success && ( //this will be used to display the success message
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            )}

            {activeTab === 'profile' && ( //this will be used to display the profile tab
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                    {!isEditing && ( //this will be used to display the edit button
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FiEdit2 className="mr-1.5 h-4 w-4" />
                        Edit
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className="mt-1 block w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                          name="address"
                          rows={3}
                          value={formData.address}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setError('');
                    
                            setFormData({
                              name: user.name || '',
                              email: user.email || '',
                              phone: user.phone || '',
                              address: user.address || '',
                            });
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
                        >
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.name || 'Not provided'}</dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                        <dd className="mt-1 text-sm text-gray-900">{user.phone || 'Not provided'}</dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Address</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {user.address || 'No address saved'}
                        </dd>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'orders' && emptyTabContent(
              <FiShoppingBag className="h-12 w-12 mx-auto" />,
              'No orders yet',
              'Your order history will appear here',
              'Browse Restaurants',
              '/restaurants'
            )}

            {activeTab === 'favorites' && emptyTabContent(
              <FiHeart className="h-12 w-12 mx-auto" />,
              'No favorites yet',
              'Your favorite items will appear here',
              null,
              null
            )}

            {activeTab === 'payments' && emptyTabContent(
              <FiCreditCard className="h-12 w-12 mx-auto" />,
              'No payment methods',
              'Your saved payment methods will appear here',
              'Add Payment Method',
              '#'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
