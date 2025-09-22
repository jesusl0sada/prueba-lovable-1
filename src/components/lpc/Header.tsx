import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLPCStore } from '@/stores/lpc-store';
import { Menu, X, LogIn, User, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setLoginModalOpen, user, logout } = useLPCStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'الرئيسية', id: 'hero' },
    { label: 'الخدمات', id: 'services' },
    { label: 'عنا', id: 'testimonials' },
    { label: 'اتصل بنا', id: 'contact' },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const mobileMenuVariants = {
    closed: { x: '100%', opacity: 0 },
    open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-glass shadow-lg border-b border-white/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2 rtl:space-x-reverse group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary group-hover:shadow-hover transition-all duration-300">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className={`text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent ${
              isScrolled ? '' : 'text-white'
            }`}>
              LPC
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-all duration-300 hover:text-primary relative ${
                  isScrolled ? 'text-foreground' : 'text-white'
                } group`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.2 + index * 0.1 } 
                }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`flex items-center space-x-2 rtl:space-x-reverse ${
                      isScrolled ? 'text-foreground' : 'text-white'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-glass">
                  <DropdownMenuItem className="font-medium">
                    لوحة التحكم
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-medium">
                    دوراتي
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-medium">
                    الشهادات
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={logout}
                    className="font-medium text-destructive"
                  >
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.8 } }}
              >
                <Button
                  onClick={() => setLoginModalOpen(true)}
                  className={`btn-outline ${
                    isScrolled 
                      ? 'border-primary text-primary hover:bg-primary' 
                      : 'border-white text-white hover:bg-white hover:text-primary'
                  }`}
                >
                  <LogIn className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 lg:hidden z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-glass shadow-2xl lg:hidden z-50"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">L</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      LPC
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-right font-medium py-3 px-4 rounded-lg hover:bg-accent transition-colors"
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: 1, 
                        transition: { delay: 0.1 + index * 0.1 } 
                      }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {!user && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
                  >
                    <Button
                      onClick={() => {
                        setLoginModalOpen(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn-primary w-full"
                    >
                      <LogIn className="w-4 h-4 ml-2" />
                      تسجيل الدخول
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;