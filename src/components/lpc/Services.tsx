import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLPCStore } from '@/stores/lpc-store';
import { 
  Star, 
  Users, 
  Clock, 
  Play, 
  Heart, 
  Share2, 
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { services, setServiceModalOpen } = useLPCStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { value: 'all', label: 'جميع الفئات' },
    { value: 'تكنولوجيا', label: 'تكنولوجيا' },
    { value: 'تطوير', label: 'تطوير' },
    { value: 'محاسبة', label: 'محاسبة' },
    { value: 'استشارة', label: 'استشارة' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredServices.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredServices.length / 2)) % Math.ceil(filteredServices.length / 2));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            خدماتنا المميزة
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            تتوفر مجموعة واسعة من الوظائف
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              المطلوبة لخريجيها
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            اختر من بين أكثر من 52 دورة تدريبية متخصصة، مصممة بعناية من قبل خبراء في المجال
            لتضمن حصولك على أفضل تجربة تعليمية ممكنة.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-card"
        >
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="ابحث عن الدورة المناسبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-12 border-2 border-gray-200 focus:border-primary"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48 h-12 border-2 border-gray-200">
              <Filter className="w-4 h-4 ml-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group"
            >
              <div className="card-service p-8 h-full relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Service Icon and Category */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-3xl shadow-primary group-hover:shadow-hover transition-all duration-500 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">
                        {service.category}
                      </Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {service.students}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Favorite and Share */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(service.id);
                      }}
                      className={`hover:bg-white/50 ${
                        favorites.includes(service.id) ? 'text-red-500' : 'text-muted-foreground'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(service.id) ? 'fill-current' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-white/50 text-muted-foreground"
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(service.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-sm text-muted-foreground">({service.students} طالب)</span>
                    </div>
                    
                    {service.price > 0 ? (
                      <div className="text-left">
                        <span className="text-3xl font-bold text-primary">${service.price}</span>
                        <span className="text-muted-foreground text-sm block">للدورة كاملة</span>
                      </div>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-1">
                        مجاناً
                      </Badge>
                    )}
                  </div>

                  {/* Modules Preview */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">ما ستتعلمه:</h4>
                    <div className="space-y-2">
                      {service.modules.slice(0, 2).map((module, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {module}
                        </div>
                      ))}
                      {service.modules.length > 2 && (
                        <div className="text-sm text-primary font-medium">
                          + {service.modules.length - 2} موضوع إضافي
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setServiceModalOpen(true, service.id)}
                      className="btn-primary flex-1 group/btn"
                    >
                      <Play className="w-4 h-4 ml-2 group-hover/btn:scale-110 transition-transform" />
                      {service.price > 0 ? 'اشترك الآن' : 'احصل على الاستشارة'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setServiceModalOpen(true, service.id)}
                      className="px-6 border-2 hover:bg-primary hover:text-white hover:border-primary"
                    >
                      التفاصيل
                    </Button>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200/50 relative z-10">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {service.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">مدرب معتمد</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Slider Controls */}
        <div className="flex justify-center items-center gap-4 mt-12 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2">
            {[...Array(Math.ceil(filteredServices.length / 2))].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* Load More Button */}
        {filteredServices.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="btn-outline">
              عرض المزيد من الدورات
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Services;