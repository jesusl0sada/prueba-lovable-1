import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLPCStore } from '@/stores/lpc-store';
import { 
  Star, 
  Play, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  User,
  FileText,
  Send
} from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Sidebar = () => {
  const { testimonials, currentTestimonial, setCurrentTestimonial } = useLPCStore();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTestimonial, testimonials.length, setCurrentTestimonial]);

  const onSubmit = async (data: ContactForm) => {
    setIsFormSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsFormSubmitting(false);
    setFormSubmitted(true);
    reset();
    
    // Reset success message after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((currentTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <aside className="w-full lg:w-96 space-y-8">
      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-card p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">آراء الطلاب</h3>
          <Badge className="bg-primary/10 text-primary">
            {testimonials.length} تقييم
          </Badge>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Student Avatar and Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {currentTestimonialData?.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{currentTestimonialData?.name}</h4>
                  <p className="text-muted-foreground text-sm">{currentTestimonialData?.role}</p>
                  <p className="text-primary text-sm font-medium">{currentTestimonialData?.course}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonialData?.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{currentTestimonialData?.rating}/5</span>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 leading-relaxed italic">
                "{currentTestimonialData?.content}"
              </blockquote>

              {/* Video Button (if available) */}
              {currentTestimonialData?.video && (
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 hover:bg-primary hover:text-white"
                >
                  <Play className="w-4 h-4" />
                  مشاهدة الفيديو
                </Button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-primary w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Info Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-primary rounded-2xl p-6 text-white"
      >
        <h3 className="text-xl font-bold mb-4">لماذا نختار؟</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-sm">دعم على مدار 24 ساعة</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
            <span className="text-sm">مدربين معتمدين دولياً</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-sm">شهادات معترف بها</span>
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        id="contact"
        className="bg-white rounded-2xl shadow-card p-6 border border-gray-100"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">سؤال مختار؟</h3>
          <p className="text-muted-foreground">
            نحن هنا للإجابة على جميع استفساراتك وتقديم المساعدة
          </p>
        </div>

        <AnimatePresence mode="wait">
          {formSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                >
                  ✓
                </motion.div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">تم الإرسال بنجاح!</h4>
              <p className="text-muted-foreground text-sm">
                سنتواصل معك خلال 24 ساعة
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <Input
                  {...register('name', { required: 'الاسم مطلوب' })}
                  placeholder="الاسم الكامل *"
                  className="h-12"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    {...register('email', { 
                      required: 'البريد الإلكتروني مطلوب',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'بريد إلكتروني غير صحيح'
                      }
                    })}
                    type="email"
                    placeholder="البريد الإلكتروني *"
                    className="h-12"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Input
                    {...register('phone', { required: 'رقم الهاتف مطلوب' })}
                    type="tel"
                    placeholder="رقم الهاتف *"
                    className="h-12"
                  />
                  {errors.phone && (
                    <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Input
                  {...register('subject', { required: 'الموضوع مطلوب' })}
                  placeholder="الموضوع *"
                  className="h-12"
                />
                {errors.subject && (
                  <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  {...register('message', { required: 'الرسالة مطلوبة' })}
                  placeholder="اكتب رسالتك هنا... *"
                  className="min-h-[120px] resize-none"
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isFormSubmitting}
                className="btn-primary w-full h-12"
              >
                {isFormSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الإرسال...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    إرسال الرسالة
                  </div>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                * جميع الحقول مطلوبة
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Contact Info */}
        <div className="border-t border-gray-100 pt-6 mt-6">
          <h4 className="font-semibold text-gray-900 mb-4">طرق التواصل الأخرى</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span>+966 50 123 4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span>info@lpc-platform.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <span>واتساب: +966 50 123 4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>الرياض، المملكة العربية السعودية</span>
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  );
};

export default Sidebar;