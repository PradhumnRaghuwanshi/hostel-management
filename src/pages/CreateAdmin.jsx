import React, { useEffect, useState } from 'react';
import { User, Mail, Lock, Building, Phone, ArrowRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Tilt from 'react-parallax-tilt';
import axios from 'axios';

const ScrollSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

function CreateAdmin() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    buildingName: '',
    contactNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.buildingName) newErrors.buildingName = 'Building name is required';
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be numeric';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/admin', formData);
      setMessage('Admin created successfully!');
      setFormData({
        fullName: '',
        username: '',
        password: '',
        buildingName: '',
        contactNumber: '',
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Error creating admin. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative">
      {/* Navbar */}
      <nav className="w-full bg-black/80 backdrop-blur-lg py-4 px-6 flex justify-between items-center fixed top-0 left-0 z-50 border-b border-green-500/30">
        <div className="flex items-center gap-4 group">
          <img
            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-110"
            src="https://static.vecteezy.com/system/resources/previews/012/918/349/non_2x/building-management-outline-icon-design-illustration-internet-of-things-symbol-on-white-background-eps-10-file-vector.jpg"
            alt="My Building Manager Logo"
          />
          <span className="text-xl font-black text-white relative transition-colors duration-300 group-hover:text-green-400">
            My Building Management
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded transition-all duration-300 group-hover:w-full"></span>
          </span>
        </div>
        <a
          href="/"
          className="px-8 py-3 text-green-400 border-2 border-green-500 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-500/50 animate-pulse-slow"
        >
          Home
        </a>
      </nav>

      {/* Create Admin Section */}
      <ScrollSection>
        <section className="py-64 px-4 max-w-8xl mx-auto relative overflow-hidden">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#4ade80' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                move: { enable: true, speed: 0.5, direction: 'none', random: true, out_mode: 'out' },
              },
              interactivity: {
                events: { onhover: { enable: true, mode: 'repulse' } },
                modes: { repulse: { distance: 100, duration: 0.4 } },
              },
            }}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-b from-green-400 to-green-600 opacity-20 animate-gradient-shift"></div>
          <div className="max-w-md mx-auto relative z-10">
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000}>
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-500/50 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-4xl font-black text-white mb-6 text-center tracking-tight animate-glow">
                  Create Admin Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2" htmlFor="fullName">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/50 border-2 border-green-500/30 rounded-lg text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2" htmlFor="username">
                      Username
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/50 border-2 border-green-500/30 rounded-lg text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                        placeholder="Enter your username"
                      />
                    </div>
                    {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/50 border-2 border-green-500/30 rounded-lg text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                        placeholder="Enter your password"
                      />
                    </div>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2" htmlFor="buildingName">
                      Building Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                      <input
                        type="text"
                        id="buildingName"
                        name="buildingName"
                        value={formData.buildingName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/50 border-2 border-green-500/30 rounded-lg text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                        placeholder="Enter building name"
                      />
                    </div>
                    {errors.buildingName && <p className="text-red-400 text-sm mt-1">{errors.buildingName}</p>}
                  </div>
                  <div>
                    <label className="block text-gray-300 font-medium mb-2" htmlFor="contactNumber">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                      <input
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-black/50 border-2 border-green-500/30 rounded-lg text-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all duration-300"
                        placeholder="Enter contact number"
                      />
                    </div>
                    {errors.contactNumber && <p className="text-red-400 text-sm mt-1">{errors.contactNumber}</p>}
                  </div>
                  {message && (
                    <p className={`text-center text-sm ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                      {message}
                    </p>
                  )}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(74, 222, 128, 0.7)' }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-lg font-semibold shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 animate-pulse-slow"
                  >
                    Create Admin
                  </motion.button>
                </form>
                <p className="mt-6 text-center text-gray-300">
                  Already have an account?{' '}
                  <a href="/login" className="text-green-400 hover:text-green-300 transition-colors duration-300">
                    Login
                  </a>
                </p>
              </motion.div>
            </Tilt>
          </div>
        </section>
      </ScrollSection>

      {/* Wave Transition */}
      <div className="relative h-16 bg-gradient-to-b from-black to-black/95 -mt-16 z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent animate-wave"></div>
      </div>

      {/* Footer */}
      <footer className="text-center py-12 text-sm text-gray-400 bg-black border-t border-green-500/30 relative z-10">
        © {new Date().getFullYear()} My Building Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default CreateAdmin;