


const Footer = () => {
  return (
    <div>
      <footer className="bg-[#1A365D] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-serif mb-6 uppercase text-[#C9A55C]">Azure Horizon</h3>
              <p className="mb-6 text-gray-300">
                Experience unparalleled luxury and comfort in our award-winning
                hotel, where every detail is crafted for your perfect stay.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                >
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Rooms & Suites",
                  "Dining",
                  "Spa & Wellness",
                  "Events",
                  "Gallery",
                  "Offers",
                  "Contact",
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-[#C9A55C]"></i>
                  <span className="text-gray-300">
                    123 Luxury Avenue, Paradise Bay, Exotic Island, 10001
                  </span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-3 text-[#C9A55C]"></i>
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3 text-[#C9A55C]"></i>
                  <span className="text-gray-300">info@luxehaven.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-6">Newsletter</h4>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for exclusive offers and updates.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-3 bg-white bg-opacity-10 border-none focus:ring-2 focus:ring-[#C9A55C] outline-none text-black/70 placeholder-gray-400 text-sm"
                />
                <button className="w-full bg-[#C9A55C] text-white p-3 hover:bg-[#B89448] transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white border-opacity-20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Azure Horizon. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm cursor-pointer"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm cursor-pointer"
              >
                Terms of Service
              </a>
              <div className="flex items-center space-x-2">
                <i className="fab fa-cc-visa text-gray-400 text-lg"></i>
                <i className="fab fa-cc-mastercard text-gray-400 text-lg"></i>
                <i className="fab fa-cc-amex text-gray-400 text-lg"></i>
                <i className="fab fa-cc-paypal text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
