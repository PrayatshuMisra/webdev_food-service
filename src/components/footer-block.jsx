import { Link } from 'react-router-dom'; //better than <a> as allows internal navigation instead of reloading
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; //importing icons from react-icons 'font awesome'

export default function Footer() { //React Functional Component named Footer
//exported as default so it can be imported anywhere without braces
  const currentYear = new Date().getFullYear(); //dynamically determine the current year, new Date() creates a date object
  
  const socialLinks = [ //array of objects of links, easy to map over and render multiple links dynamically
    { icon: <FaFacebook size={20} />, url: 'https://facebook.com' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com' },
    { icon: <FaInstagram size={20} />, url: 'https://instagram.com' },
    { icon: <FaLinkedin size={20} />, url: 'https://linkedin.com' },
    { icon: <FaYoutube size={20} />, url: 'https://youtube.com' },
  ];

  const footerLinks = [ //sections in footer block, nested .map() outer map for sections, inner map for links.
    {
      title: 'Company',
      links: [
        { label: 'About Us', url: '/about' },
        { label: 'Careers', url: '/careers' },
        { label: 'Blog', url: '/blog' },
        { label: 'Press', url: '/press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', url: '/help' },
        { label: 'Safety Center', url: '/safety' },
        { label: 'Community Guidelines', url: '/guidelines' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', url: '/terms' },
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Cookie Policy', url: '/cookies' },
        { label: 'Accessibility', url: '/accessibility' },
      ],
    },
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiNmZmYiLz4KICA8cGF0aCBkPSJNMzAgMTVjLTguMjg0IDAtMTUgNi43MTYtMTUgMTVzNi43MTYgMTUgMTUgMTUgMTUtNi43MTYgMTUtMTVzLTYuNzE2LTE1LTE1LTE1em0wIDVjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTAtMTAtNC40NzctMTAtMTAgNC40NzctMTAgMTAtMTB6IiBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
              FoodOS
            </Link>
            <p className="text-gray-300">
              Delivering happiness to your doorstep. Order your favorite meals from the best restaurants in town.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => ( 
                //.map(): iterates through socialLinks.
                // key={index}: required for React list rendering.
                // target="_blank" + rel="noopener noreferrer": opens in a new tab securely.
                // aria-label: improves accessibility, screen readers know to goto facebook.com.
                // {social.icon}: JSX variable interpolation, renders the icon.
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={`Follow us on ${social.url.split('//')[1]}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((section, index) => ( //map through the footerLinks array
          // outer .map() loops through footerLinks sections.
          // inner .map() loops through each section’s links.
          // nested JSX interpolation to dynamically generate <ul><li> lists.
          // uses Link from React Router for smooth internal navigation.
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => ( //map through the links array
                  <li key={linkIndex}>
                    <Link
                      to={link.url} //link to the page
                      className="text-gray-300 hover:text-white transition-colors" //hover effect
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-gray-300">Subscribe to get special offers and updates</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-white" //input field
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity font-medium" //button
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0"> 
              &copy; {currentYear} FoodOS-PrayatshuMisra. All rights reserved. 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
