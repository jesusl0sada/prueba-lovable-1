import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useLPCStore } from '@/stores/lpc-store';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  X, 
  Eye, 
  EyeOff, 
  LogIn, 
  Calendar as CalendarIcon,
  Clock,
  Star,
  Users,
  Play,
  Download,
  Share2,
  Heart,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  User
} from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

interface ConsultationForm {
  name: string;
  email: string;
  phone: string;
  preferredDate: Date | undefined;
  preferredTime: string;
  topic: string;
  message: string;
}

const Modals = () => {
  const { 
    isLoginModalOpen, 
    setLoginModalOpen,
    isConsultationModalOpen,
    setConsultationModalOpen,
    isServiceModalOpen,
    setServiceModalOpen,
    selectedServiceId,
    services,
    login,
    bookConsultation
  } = useLPCStore();

  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [consultationStep, setConsultationStep] = useState(1);
  const [consultationLoading, setConsultationLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const selectedService = services.find(s => s.id === selectedServiceId);

  const loginForm = useForm<LoginForm>();
  const consultationForm = useForm<ConsultationForm>();

  const onLogin = async (data: LoginForm) => {
    setLoginLoading(true);
    const success = await login(data.email, data.password);
    setLoginLoading(false);
    
    if (!success) {
      loginForm.setError('email', { message: 'بيانات الدخول غير صحيحة' });
    }
  };

  const onBookConsultation = async (data: ConsultationForm) => {
    if (consultationStep < 3) {
      setConsultationStep(consultationStep + 1);
      return;
    }

    setConsultationLoading(true);
    const success = await bookConsultation({
      ...data,
      preferredDate: selectedDate?.toISOString() || '',
    });
    setConsultationLoading(false);
    
    if (success) {
      setConsultationStep(1);
      consultationForm.reset();
      setSelectedDate(undefined);
    }
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const consultationTopics = [
    'استشارة عامة',
    'اختيار التخصص المناسب',
    'التطوير المهني',
    'ريادة الأعمال',
    'التقنية والبرمجة',
    'المحاسبة والمالية'
  ];

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  return (
    <>
      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">تسجيل الدخول</DialogTitle>
            <DialogDescription className="text-center">
              ادخل بياناتك للوصول إلى حسابك
            </DialogDescription>
          </DialogHeader>

          <motion.form
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={loginForm.handleSubmit(onLogin)}
            className="space-y-4"
          >
            <div>
              <Input
                {...loginForm.register('email', { 
                  required: 'البريد الإلكتروني مطلوب',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'بريد إلكتروني غير صحيح'
                  }
                })}
                type="email"
                placeholder="البريد الإلكتروني"
                className="h-12"
              />
              {loginForm.formState.errors.email && (
                <p className="text-destructive text-sm mt-1">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  {...loginForm.register('password', { required: 'كلمة المرور مطلوبة' })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="كلمة المرور"
                  className="h-12 pl-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-destructive text-sm mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-primary hover:underline text-sm"
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            <Button
              type="submit"
              disabled={loginLoading}
              className="btn-primary w-full h-12"
            >
              {loginLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري تسجيل الدخول...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  تسجيل الدخول
                </div>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              ليس لديك حساب؟ <button className="text-primary hover:underline">سجل الآن</button>
            </div>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Consultation Booking Modal */}
      <Dialog open={isConsultationModalOpen} onOpenChange={setConsultationModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              احجز استشارة مجانية
            </DialogTitle>
            <DialogDescription className="text-center">
              استشارة شخصية لمدة 30 دقيقة مع خبرائنا المعتمدين
            </DialogDescription>
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= consultationStep
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step < consultationStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step < consultationStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.form
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={consultationForm.handleSubmit(onBookConsultation)}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {consultationStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">المعلومات الشخصية</h3>
                  
                  <div>
                    <Input
                      {...consultationForm.register('name', { required: 'الاسم مطلوب' })}
                      placeholder="الاسم الكامل *"
                      className="h-12"
                    />
                    {consultationForm.formState.errors.name && (
                      <p className="text-destructive text-sm mt-1">
                        {consultationForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        {...consultationForm.register('email', { 
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
                      {consultationForm.formState.errors.email && (
                        <p className="text-destructive text-sm mt-1">
                          {consultationForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        {...consultationForm.register('phone', { required: 'رقم الهاتف مطلوب' })}
                        type="tel"
                        placeholder="رقم الهاتف *"
                        className="h-12"
                      />
                      {consultationForm.formState.errors.phone && (
                        <p className="text-destructive text-sm mt-1">
                          {consultationForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {consultationStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">تفضيلات الموعد</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">التاريخ المفضل</label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">الوقت المفضل</label>
                    <Select {...consultationForm.register('preferredTime', { required: 'الوقت مطلوب' })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="اختر الوقت المناسب" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">موضوع الاستشارة</label>
                    <Select {...consultationForm.register('topic', { required: 'الموضوع مطلوب' })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="اختر الموضوع" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultationTopics.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              )}

              {consultationStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold mb-4">تفاصيل إضافية</h3>
                  
                  <div>
                    <Textarea
                      {...consultationForm.register('message')}
                      placeholder="اكتب أي تفاصيل إضافية أو أسئلة محددة..."
                      className="min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-medium mb-2">ملخص حجزك:</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>التاريخ: {selectedDate?.toLocaleDateString('ar')}</p>
                      <p>الوقت: {consultationForm.watch('preferredTime')}</p>
                      <p>الموضوع: {consultationForm.watch('topic')}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4">
              {consultationStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConsultationStep(consultationStep - 1)}
                  className="flex-1"
                >
                  السابق
                </Button>
              )}
              
              <Button
                type="submit"
                disabled={consultationLoading}
                className="btn-primary flex-1"
              >
                {consultationLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الحجز...
                  </div>
                ) : consultationStep === 3 ? (
                  'تأكيد الحجز'
                ) : (
                  <div className="flex items-center gap-2">
                    التالي
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Service Details Modal */}
      <Dialog open={isServiceModalOpen} onOpenChange={() => setServiceModalOpen(false)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{selectedService.icon}</div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-right">
                      {selectedService.title}
                    </DialogTitle>
                    <Badge className="bg-primary/10 text-primary">
                      {selectedService.category}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">عن الدورة</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Modules */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">محتوى الدورة</h3>
                    <div className="space-y-2">
                      {selectedService.modules.map((module, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-medium">
                            {index + 1}
                          </div>
                          <span>{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">المدرب</h3>
                    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                      <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {selectedService.instructor.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{selectedService.instructor.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          {selectedService.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Price */}
                  <div className="bg-gradient-primary text-white rounded-xl p-6 text-center">
                    {selectedService.price > 0 ? (
                      <>
                        <div className="text-3xl font-bold mb-2">${selectedService.price}</div>
                        <p className="text-white/80">للدورة كاملة</p>
                      </>
                    ) : (
                      <div className="text-2xl font-bold">مجاناً</div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">المدة:</span>
                      <span className="font-medium">{selectedService.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">الطلاب:</span>
                      <span className="font-medium">{selectedService.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">التقييم:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{selectedService.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="btn-primary w-full">
                      {selectedService.price > 0 ? 'اشترك الآن' : 'احجز الاستشارة'}
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="flex-1">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="flex-1">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="flex-1">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border rounded-lg p-4 space-y-2">
                    <h4 className="font-medium mb-2">يشمل:</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        شهادة معتمدة
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        وصول مدى الحياة
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        دعم فني 24/7
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        مشاريع تطبيقية
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Modals;