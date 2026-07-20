export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">RAW</h3>
          <p className="text-sm leading-relaxed">
            The future of freshness. Cold-pressed, HPP treated, and 100% natural.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white font-medium">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Subscriptions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white font-medium">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-white font-medium">Newsletter</h4>
          <p className="text-sm">Get 10% off your first order.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-orange-500"
            />
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} RAW. All rights reserved.</p>
      </div>
    </footer>
  );
}
