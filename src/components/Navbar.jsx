import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import AuthModal from './Auth/AuthModal';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('jwt_token');
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <FaBrain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-800">learn.ai</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Courses</a>
                <a href="#" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</a>
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Navbar;