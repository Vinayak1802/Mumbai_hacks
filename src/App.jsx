import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreeScene from './components/ThreeScene';
import Testimonials from './components/Testimonials';
import PricingPlans from './components/PricingPlans';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Navbar />
      <main>
        <div className="relative">
          <ThreeScene />
          <Hero />
        </div>
        <Testimonials />
        <PricingPlans />
      </main>
      <Footer />
    </div>
  );
}

export default App;