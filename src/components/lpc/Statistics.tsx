import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLPCStore } from '@/stores/lpc-store';
import { Users, BookOpen, Award, GraduationCap, TrendingUp } from 'lucide-react';

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { statistics } = useLPCStore();
  
  // Counter animation states
  const [counts, setCounts] = useState({
    students: 0,
    courses: 0,
    certificates: 0,
    instructors: 0
  });

  // Animate counters when in view
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 FPS
      const increment = duration / steps;

      const timers = [
        { key: 'students', target: statistics.students },
        { key: 'courses', target: statistics.courses },
        { key: 'certificates', target: statistics.certificates },
        { key: 'instructors', target: statistics.instructors }
      ].map(({ key, target }) => {
        let current = 0;
        const step = target / steps;
        
        return setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timers.find(t => t === this));
          }
          
          setCounts(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
        }, increment);
      });

      return () => timers.forEach(timer => clearInterval(timer));
    }
  }, [isInView, statistics]);

  const statsData = [
    {
      id: 'students',
      value: counts.students,
      label: 'طالب وطالبة',
      suffix: '+',
      icon: Users,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      description: 'انضموا لرحلة التعلم معنا'
    },
    {
      id: 'courses', 
      value: counts.courses,
      label: 'دورة تدريبية',
      suffix: '',
      icon: BookOpen,
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      description: 'في مختلف التخصصات'
    },
    {
      id: 'certificates',
      value: counts.certificates,
      label: 'شهادة معتمدة',
      suffix: '',
      icon: Award,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      description: 'معترف بها عالمياً'
    },
    {
      id: 'instructors',
      value: counts.instructors,
      label: 'مدرب خبير',
      suffix: '',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      description: 'بخبرة عملية واسعة'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.3
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 mb-6"
          >
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">إحصائيات منصة LPC</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            أرقام تتحدث عن
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              نجاحنا وتميزنا
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            انضم إلى الآلاف من الطلاب الذين غيرت منصة LPC مسار حياتهم المهنية
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              className="group cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`${stat.bgColor} rounded-3xl p-6 lg:p-8 text-center relative overflow-hidden border border-white/50 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:shadow-2xl`}>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className="relative z-10"
                >
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                    <stat.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                </motion.div>

                {/* Number */}
                <motion.div
                  variants={numberVariants}
                  className="relative z-10 mb-3"
                >
                  <div className="text-3xl lg:text-5xl font-bold text-gray-900 mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  
                  {/* Animated underline */}
                  <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto w-0 group-hover:w-full transition-all duration-500" />
                </motion.div>

                {/* Label */}
                <div className="relative z-10">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-gray-700 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>

                {/* Hover Effect Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/30 rounded-full"
                      initial={{ scale: 0 }}
                      animate={isInView ? {
                        scale: [0, 1, 0],
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut'
                      }}
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              هل أنت مستعد لتكون جزءاً من هذا النجاح؟
            </h3>
            <p className="text-muted-foreground mb-6">
              انضم إلى منصة LPC اليوم وابدأ رحلتك نحو مستقبل مهني مشرق
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              ابدأ رحلتك الآن
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;