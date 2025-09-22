import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Statistics from './Statistics';
import Sidebar from './Sidebar';
import Modals from './Modals';

const LPCLayout = () => {
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-background font-inter"
      dir="ltr"
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <Hero />

        {/* Content Grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-20">
              {/* Services Section */}
              <Services />
              
              {/* Statistics Section */}
              <Statistics />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">L</span>
                  </div>
                  <span className="text-2xl font-bold">LPC</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  منصة التعلم والتطوير المهني الرائدة في المنطقة. نقدم أفضل الدورات 
                  التدريبية المعتمدة مع خبراء متخصصين.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">روابط سريعة</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#hero" className="hover:text-white transition-colors">الرئيسية</a></li>
                  <li><a href="#services" className="hover:text-white transition-colors">الخدمات</a></li>
                  <li><a href="#testimonials" className="hover:text-white transition-colors">آراء الطلاب</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">اتصل بنا</a></li>
                </ul>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">الفئات</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">تكنولوجيا</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">تطوير</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">محاسبة</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">ريادة الأعمال</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">تواصل معنا</h4>
                <div className="space-y-2 text-gray-400">
                  <p>📧 info@lpc-platform.com</p>
                  <p>📱 +966 50 123 4567</p>
                  <p>📍 الرياض، السعودية</p>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                    <span className="text-sm">تويتر</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                    <span className="text-sm">لنكد</span>
                  </a>
                  <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                    <span className="text-sm">يوتيوب</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 LPC Educational Platform. جميع الحقوق محفوظة.
              </p>
              <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
                <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
                <a href="#" className="hover:text-white transition-colors">اتفاقية الاستخدام</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Modals */}
      <Modals />

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 w-12 h-12 bg-gradient-primary text-white rounded-full shadow-primary hover:shadow-hover flex items-center justify-center z-50 transform hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ↑
      </motion.button>

      {/* WhatsApp Float Button */}
      <motion.a
        href="https://wa.me/966501234567"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50 transform hover:scale-110 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-2xl">📱</span>
      </motion.a>
    </motion.div>
  );
};

export default LPCLayout;