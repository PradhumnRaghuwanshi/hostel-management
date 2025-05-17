import React, { useEffect } from 'react';
import {
  Phone,
  Mail,
  ArrowRight,
  Settings,
  Bed,
  BellRing,
  ScrollText,
  UtensilsCrossed,
  Users,
} from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Tilt from 'react-parallax-tilt';

const features = [
  {
    icon: Bed,
    title: 'Room & Bed Management',
    desc: 'Easily assign, update, and track room and bed availability in real-time.',
  },
  {
    icon: Settings,
    title: 'Rent & Utility Tracking',
    desc: 'Automatically manage rent, electricity, and mess bills with payment tracking.',
  },
  {
    icon: BellRing,
    title: 'Complaints & Maintenance',
    desc: 'Residents can raise complaints and admins can resolve them quickly.',
  },
  {
    icon: Users,
    title: 'Visitor & Leave Log',
    desc: 'Maintain detailed visitor entries and manage outpass/leave requests.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Mess & Housekeeping Logs',
    desc: 'Update daily mess menu and track cleaning schedules efficiently.',
  },
  {
    icon: ScrollText,
    title: 'Notices & Announcements',
    desc: 'Share hostel rules, announcements, or alerts with all residents instantly.',
  },
];

const ScrollSection = ({ children, side }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, rotate: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: side === 'left' ? -5 : 5 }}
      animate={controls}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative">
      {/* Top Navbar */}
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
          href="/login"
          className="px-8 py-3 text-green-400 border-2 border-green-500 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-500/50 animate-pulse-slow"
        >
          Login
        </a>
      </nav>

      {/* Hero Section */}
<ScrollSection side="left">
  <header className="pt-48 pb-32 px-4 max-w-7xl mx-auto relative overflow-hidden">
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

    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/10 opacity-30"></div>

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Hero Text */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <motion.h1
          className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Manage Your Building{' '}
          <span className="block text-green-400 bg-clip-text bg-gradient-to-r from-green-400 to-green-600 animate-glow">
            By Yourself
          </span>
        </motion.h1>
        <motion.p
          className="text-lg lg:text-xl text-gray-300 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Take control with our intuitive, all-in-one platform to streamline operations and boost efficiency.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(74, 222, 128, 0.7)' }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
          className="inline-block px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xl font-semibold shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 animate-pulse-slow"
        >
          Get Started <ArrowRight className="inline ml-3 h-7 w-7" />
        </motion.a>
      </div>

      {/* Hero Image */}
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="https://www.sunsmart.co.in/wp-content/uploads/2015/11/property-software.png"
            alt="Building Management Illustration"
            className="w-full max-w-[500px] rounded-3xl shadow-2xl border-2 border-green-500/50 transition-transform duration-500"
          />
        </motion.div>
      </Tilt>
    </div>
  </header>
</ScrollSection>


      {/* Wave Transition */}
      <div className="relative h-16 bg-gradient-to-b from-black to-black/95 -mt-16 z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent animate-wave"></div>
      </div>

      {/* Why Buy Section */}
      <ScrollSection side="right">
        <section className="py-64 px-6 bg-black/95 relative" style={{ background: 'radial-gradient(circle at right, rgba(74, 222, 128, 0.3), transparent 50%)' }}>
          <div className="max-w-8xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Why Choose My Building Manager?
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-3xl mx-auto text-lg mb-16 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              My Building Manager simplifies daily operations with automation, from rent and utility tracking to resident communication and maintenance management.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { title: '📊 Complete Admin Control', desc: 'Manage residents, bills, complaints, and updates seamlessly from a single dashboard.' },
                { title: '⚡ Saves Hours Daily', desc: 'Automate manual tasks, eliminate errors, and stay updated with real-time insights.' },
                { title: '📱 Works on Any Device', desc: 'Access and manage tasks from anywhere with our responsive, mobile-friendly interface.' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-green-500/50 hover:border-green-500 transition-all duration-500 transform hover:scale-105 hover:rotate-2"
                  whileHover={{ y: -10, boxShadow: '0 15px 40px rgba(74, 222, 128, 0.4)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                >
                  <h3 className="text-xl font-semibold text-green-400 mb-4 animate-glow">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* Wave Transition */}
      <div className="relative h-16 bg-gradient-to-b from-black/95 to-black -mt-16 z-20">
        <div className="absolute inset-0 bg-gradient-to-l from-green-500/20 to-transparent animate-wave"></div>
      </div>

      {/* Features Section */}
      <ScrollSection side="left">
        <section className="py-64 px-4 max-w-8xl mx-auto relative" style={{ background: 'radial-gradient(circle at left, rgba(74, 222, 128, 0.3), transparent 50%)' }}>
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center text-white mb-16 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Features That Empower You
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 flex flex-col gap-5 border-2 border-green-500/50 hover:border-green-500 transition-all duration-500 transform hover:scale-105 hover:rotate-2"
                whileHover={{ y: -10, boxShadow: '0 15px 40px rgba(74, 222, 128, 0.4)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 1 }}
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <feature.icon className="h-14 w-14 text-green-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white animate-glow">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollSection>

      {/* Wave Transition */}
      <div className="relative h-16 bg-gradient-to-b from-black to-black/95 -mt-16 z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent animate-wave"></div>
      </div>

      {/* Contact Section */}
      <ScrollSection side="right">
        <section id="contact" className="bg-black/95 py-64 px-4 relative" style={{ background: 'radial-gradient(circle at right, rgba(74, 222, 128, 0.3), transparent 50%)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Get in Touch
            </motion.h2>
            <motion.p
              className="text-gray-300 mb-16 text-lg leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              Ready to streamline your building operations? Book a live demo or inquire about pricing today!
            </motion.p>
            <div className="flex flex-col sm:flex-row justify-center gap-16 text-left">
              <motion.div
                className="flex items-center gap-5 text-gray-300"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 bg-green-500/30 rounded-full">
                  <Phone className="h-8 w-8 text-green-400 animate-spin-slow" />
                </div>
                <span className="font-medium text-lg">+91-98765-43210</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-5 text-gray-300"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 bg-green-500/30 rounded-full">
                  <Mail className="h-8 w-8 text-green-400 animate-spin-slow" />
                </div>
                <span className="font-medium text-lg">admin@hostelpro.in</span>
              </motion.div>
            </div>
            <motion.a
              whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(74, 222, 128, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              href="mailto:admin@hostelpro.in"
              className="mt-12 inline-block px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-xl font-semibold shadow-2xl hover:from-green-600 hover:to-green-700 transition-all duration-300 animate-pulse-slow"
            >
              Send Inquiry
            </motion.a>
          </div>
        </section>
      </ScrollSection>

      {/* Footer */}
      <footer className="text-center py-12 text-sm text-gray-400 bg-black border-t border-green-500/30 relative z-10">
        © {new Date().getFullYear()} My Building Manager. All rights reserved.
      </footer>
    </div>
  );
}

export default App;