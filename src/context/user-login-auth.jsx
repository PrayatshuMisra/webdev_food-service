import { createContext, useContext, useState, useEffect } from 'react'; //create a React Context for global state.
import { useNavigate } from 'react-router-dom'; //useNavigate: for navigation.

const AuthContext = createContext(); //create a React Context for global state.

export function AuthProvider({ children }) { //this will be used to access the auth context
  const [user, setUser] = useState(null); //this will have the user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); //this will have the authentication status
  const [loading, setLoading] = useState(true); //this will have the loading status
  const navigate = useNavigate(); //this will have the navigate function

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user'); //this will have the user data
      if (userData) {
        const parsedUser = JSON.parse(userData); //this will have the parsed user data
        setUser(parsedUser); //set the user data
        setIsAuthenticated(true); //set the authentication status
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => { //this will be used to login
    if (email === 'demo@example.com' && password === 'demo') {
      const demoUser = {
        id: 1,
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: '/assets/avatar-placeholder.png'
      };
      setUser(demoUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(demoUser));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = (userData) => { //this will be used to register
    const newUser = { //create a new user
      id: Date.now(),
      ...userData,
      avatar: '/assets/avatar-placeholder.png'
    };
    setUser(newUser);
    setIsAuthenticated(true); //set the authentication status
    localStorage.setItem('user', JSON.stringify(newUser)); //set the user data in local storage
    return { success: true }; //return success
  };

  const logout = () => { //this will be used to logout
    setUser(null); //set the user data to null
    setIsAuthenticated(false); //set the authentication status to false
    localStorage.removeItem('user'); //remove the user data from local storage
    navigate('/'); //navigate to the home page
  };

  const updateProfile = (userData) => { //this will be used to update the profile 
    const updatedUser = { ...user, ...userData }; //update the user data
    setUser(updatedUser); //set the user data
    localStorage.setItem('user', JSON.stringify(updatedUser)); //set the user data in local storage
    return { success: true }; //return success
  };

  return (
    <AuthContext.Provider
      value={{
        user, //this will have the user data
        isAuthenticated, //this will have the authentication status
        loading, //this will have the loading status
        login, //this will be used to login
        register, //this will be used to register
        logout,
        updateProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => { //this will be used to access the auth context
  const context = useContext(AuthContext); //this will have the auth context
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
