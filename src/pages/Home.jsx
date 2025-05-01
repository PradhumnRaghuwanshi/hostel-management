import React, { useEffect } from "react";
import { CheckCircle, Phone, Mail, ArrowRight, Settings, Bed, BellRing, ScrollText, UtensilsCrossed, Users } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const features = [
  {
    icon: Bed,
    title: "Room & Bed Management",
    desc: "Easily assign, update, and track room and bed availability in real-time."
  },
  {
    icon: Settings,
    title: "Rent & Utility Tracking",
    desc: "Automatically manage rent, electricity, and mess bills with payment tracking."
  },
  {
    icon: BellRing,
    title: "Complaints & Maintenance",
    desc: "Residents can raise complaints and admins can resolve them quickly."
  },
  {
    icon: Users,
    title: "Visitor & Leave Log",
    desc: "Maintain detailed visitor entries and manage outpass/leave requests."
  },
  {
    icon: UtensilsCrossed,
    title: "Mess & Housekeeping Logs",
    desc: "Update daily mess menu and track cleaning schedules efficiently."
  },
  {
    icon: ScrollText,
    title: "Notices & Announcements",
    desc: "Share hostel rules, announcements, or alerts with all residents instantly."
  }
];

export default function Home() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      {/* Hero Section */}
      <header className="text-center py-24 px-4 relative">
        <motion.h1 
          initial={{ opacity: 0, y: -40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4"
        >
          Streamline Your Hostel & PG Operations
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          The all-in-one hostel management system built for efficiency, clarity, and scale.
        </motion.p>
        <motion.a 
          whileHover={{ scale: 1.05 }} 
          href="#contact" 
          className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
        >
          Contact Us <ArrowRight className="inline ml-2 h-5 w-5" />
        </motion.a>
      <div className="absolute top-6 right-6 flex gap-4">
          <a href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition">Login</a>
          <a href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Sign Up</a>
        </div>
</header>

      {/* Why Buy Section */}
      <section className="py-20 px-6 bg-white" data-aos="fade-up" data-aos-duration="800">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl md:text-4xl font-bold text-blue-700 mb-6"
          >
            Why Choose HostelPro?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-gray-600 max-w-3xl mx-auto text-lg mb-10"
          >
            HostelPro isn't just software — it's a daily operations assistant. From handling rent, food, visitors, complaints, to sending updates and automating everything — we simplify every part of your hostel or PG routine.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
            <div className="bg-blue-50 rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-blue-800 mb-2">📊 Complete Admin Control</h3>
              <p className="text-sm text-gray-600">Manage residents, bills, complaints, and updates — all from one place.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-blue-800 mb-2">⚡ Saves Hours Daily</h3>
              <p className="text-sm text-gray-600">Eliminate manual registers, confusion, and missed updates with automation.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow">
              <h3 className="text-lg font-bold text-blue-800 mb-2">📱 Works on Any Device</h3>
              <p className="text-sm text-gray-600">Mobile-friendly UI ensures admins and wardens can manage tasks anywhere, anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-14"
        >
          Features That Make a Difference
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-3 hover:shadow-2xl transition"
            >
              <feature.icon className="h-8 w-8 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-blue-50" data-aos="fade-up" data-aos-duration="800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10 transition-all duration-500 hover:text-blue-600">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white shadow rounded-xl p-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
              <p className="text-gray-700 italic mb-3">"HostelPro made managing our 100+ resident PG effortless. Rent collection and visitor tracking became 100% streamlined."</p>
              <p className="text-blue-700 font-semibold">- Ankit Mehra, PG Owner</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-700 italic mb-3">"From daily mess updates to student complaints — everything is so easy now. I don't use notebooks anymore!"</p>
              <p className="text-blue-700 font-semibold">- Priya Sharma, Hostel Warden</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-700 italic mb-3">"Super mobile-friendly. I approve leaves, add visitors, and even resolve complaints on the go."</p>
              <p className="text-blue-700 font-semibold">- Ramesh Patel, Admin Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">See It In Action</h2>
          <p className="text-gray-600 mb-6">Watch how HostelPro simplifies hostel & PG operations with one dashboard.</p>
          <div className="aspect-w-16 aspect-h-9">
            <iframe className="rounded-xl w-full h-72 sm:h-96" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Demo Video" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="py-20 px-6 bg-blue-100" data-aos="fade-up" data-aos-duration="800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-10">Simple & Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white shadow-xl rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl">
              <h3 className="text-xl font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition-colors duration-300">Basic</h3>
              <p className="text-gray-600 mb-4">Perfect for small hostels or PGs (up to 50 residents)</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✔ Room & Rent Management</li>
                <li>✔ Complaint Tracker</li>
                <li>✔ Email Support</li>
              </ul>
              <p className="text-lg font-bold text-blue-600">₹999/month</p>
            </div>
            <div className="bg-white shadow-2xl rounded-2xl p-6 border-2 border-blue-600">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Professional</h3>
              <p className="text-gray-600 mb-4">Ideal for medium-size setups (50–150 residents)</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✔ Everything in Basic</li>
                <li>✔ Mess & Visitor Logs</li>
                <li>✔ Leave & Outpass System</li>
                <li>✔ WhatsApp Notifications</li>
              </ul>
              <p className="text-lg font-bold text-blue-600">₹1,999/month</p>
            </div>
            <div className="bg-white shadow-xl rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">For large hostels or PG chains (150+ residents)</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>✔ All Features Unlocked</li>
                <li>✔ Dedicated Support</li>
                <li>✔ Custom Integrations</li>
              </ul>
              <p className="text-lg font-bold text-blue-600">Contact for Quote</p>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">Want to book a live demo or ask about pricing? We're ready to help you scale your hostel business.</p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 text-left">
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="h-5 w-5 text-blue-600" />
              <span className="font-medium">+91-98765-43210</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="font-medium">admin@hostelpro.in</span>
            </div>
          </div>

          <a href="mailto:admin@hostelpro.in" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition">
            Send Inquiry
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} HostelPro Software. All rights reserved.
      </footer>

      {/* Cookie Consent */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg px-4 py-3 z-50 text-center text-sm text-gray-700">
        This website uses cookies for analytics and performance. By using this site, you agree to our use of cookies.
        <button className="ml-4 px-4 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded">Accept</button>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for product updates, offers, and tips on managing your hostel or PG better.</p>
          <form action="https://your-mailchimp-endpoint-url" method="POST" target="_blank" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              name="EMAIL"
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 px-4 py-2 border rounded-lg text-gray-700"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Analytics Script */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
      <script dangerouslySetInnerHTML={{ __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
      ` }} />

      {/* Live Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600 transition"
        >
          💬 Live Chat
        </a>
      </div>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border p-4 rounded-xl shadow transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <h3 className="text-lg font-semibold text-blue-700">Do I need technical knowledge to use this software?</h3>
              <p className="text-gray-600 mt-2">Not at all! The interface is user-friendly and designed for admins, wardens, and owners with minimal tech skills.</p>
            </div>
            <div className="border p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-blue-700">Can I use this for multiple hostels?</h3>
              <p className="text-gray-600 mt-2">Yes, our software supports multi-location management with different admin logins per branch.</p>
            </div>
            <div className="border p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-blue-700">Is my data secure?</h3>
              <p className="text-gray-600 mt-2">Absolutely. We use secure servers and encryption to protect all your hostel and resident data.</p>
            </div>
            <div className="border p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-blue-700">Can I try it before I buy?</h3>
              <p className="text-gray-600 mt-2">Yes, contact us for a free demo. We'll walk you through everything live.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
