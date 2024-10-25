import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const plans = [
  {
    name: "Basic",
    price: "Free",
    features: [
      "Access to basic courses",
      "Limited AI recommendations",
      "Community support",
      "Basic progress tracking"
    ]
  },
  {
    name: "Pro",
    price: "$29/month",
    features: [
      "All basic features",
      "Advanced AI recommendations",
      "Personalized learning paths",
      "Priority support",
      "Advanced analytics"
    ]
  },
  {
    name: "Enterprise",
    price: "$99/month",
    features: [
      "All Pro features",
      "Custom learning paths",
      "Team collaboration",
      "API access",
      "Dedicated support",
      "Custom integrations"
    ]
  }
];

const PricingPlans = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Learning Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the perfect plan for your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-4xl font-bold text-primary">{plan.price}</p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <FaCheck className="text-primary mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;