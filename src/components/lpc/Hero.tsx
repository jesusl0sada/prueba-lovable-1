import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLPCStore } from '@/stores/lpc-store';
import { Sparkles, Users, Award, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-woman.jpg';

const Hero = () => {
  const { setConsultationModalOpen } = useLPCStore();

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

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut'
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl"
        />
        
        {/* Floating Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            variants={sparkleVariants}
            animate="animate"
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Sparkles className="w-6 h-6 text-white/30" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-right space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex">
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 text-white font-medium">
                <span className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Plataforma #1 de Aprendizaje
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Obtén los Mejores Cursos de Formación
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  y Adquiere las Habilidades Necesarias
                </span>
                <br />
                para el Éxito en Tecnología y Negocios
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Únete a más de 5,847 estudiantes en el viaje del aprendizaje y desarrollo profesional. 
              Obtén certificados acreditados con expertos especializados en cada campo.
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/80 text-sm">+5,847 estudiantes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/80 text-sm">Certificados acreditados</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <p className="text-white/80 text-sm">Crecimiento profesional</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants} className="space-y-4">
              <Button
                onClick={() => setConsultationModalOpen(true)}
                className="btn-primary text-lg px-8 py-4 shadow-2xl hover:shadow-primary group"
                size="lg"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Obtén una Consulta Gratuita
                </span>
              </Button>
              <p className="text-white/70 text-sm">
                * Consulta gratuita de 30 minutos con nuestros expertos
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative z-10"
            >
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Estudiante con hijab sosteniendo libros y hablando por teléfono"
                  className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
                />
                
                {/* Floating Cards */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Certificado Acreditado</p>
                      <p className="text-xs text-muted-foreground">Reconocido internacionalmente</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    x: [0, -10, 0]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                  }}
                  className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">98% éxito</p>
                      <p className="text-xs text-muted-foreground">Tasa de finalización de cursos</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl transform rotate-6 scale-105 -z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl transform -rotate-3 scale-110 -z-20" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm">Desplázate hacia abajo</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;