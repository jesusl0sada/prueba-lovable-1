import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  duration: string;
  students: number;
  rating: number;
  category: string;
  modules: string[];
  instructor: {
    name: string;
    avatar: string;
    bio: string;
  };
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  course: string;
  video?: string;
}

interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  topic: string;
  message: string;
}

interface LPCState {
  // UI State
  isLoginModalOpen: boolean;
  isConsultationModalOpen: boolean;
  isServiceModalOpen: boolean;
  selectedServiceId: string | null;
  currentTestimonial: number;
  
  // User State
  user: User | null;
  
  // Data
  services: Service[];
  testimonials: Testimonial[];
  statistics: {
    students: number;
    courses: number;
    certificates: number;
    instructors: number;
  };
  
  // Actions
  setLoginModalOpen: (open: boolean) => void;
  setConsultationModalOpen: (open: boolean) => void;
  setServiceModalOpen: (open: boolean, serviceId?: string) => void;
  setCurrentTestimonial: (index: number) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  bookConsultation: (booking: ConsultationBooking) => Promise<boolean>;
  addToFavorites: (serviceId: string) => void;
  removeFromFavorites: (serviceId: string) => void;
}

export const useLPCStore = create<LPCState>((set, get) => ({
  // Initial UI State
  isLoginModalOpen: false,
  isConsultationModalOpen: false,
  isServiceModalOpen: false,
  selectedServiceId: null,
  currentTestimonial: 0,
  
  // Initial User State
  user: null,
  
  // Mock Data
  services: [
    {
      id: '1',
      title: 'اختبار البرمجيات',
      description: 'تعلم أحدث أساليب اختبار البرمجيات والجودة في التطوير',
      icon: '💻',
      price: 299,
      duration: '8 أسابيع',
      students: 1245,
      rating: 4.8,
      category: 'تكنولوجيا',
      modules: [
        'مقدمة في اختبار البرمجيات',
        'الاختبار اليدوي والآلي', 
        'أدوات الاختبار المتقدمة',
        'إدارة دورة حياة الاختبار'
      ],
      instructor: {
        name: 'أحمد محمد',
        avatar: '/instructor-1.jpg',
        bio: 'خبير في اختبار البرمجيات مع أكثر من 10 سنوات خبرة'
      }
    },
    {
      id: '2',
      title: 'مطور مبدعي كامل',
      description: 'كن مطور ويب متكامل واحترف أحدث التقنيات',
      icon: '🚀',
      price: 499,
      duration: '12 أسبوع',
      students: 987,
      rating: 4.9,
      category: 'تطوير',
      modules: [
        'أساسيات HTML وCSS',
        'JavaScript المتقدم',
        'React وNext.js',
        'Node.js وقواعد البيانات'
      ],
      instructor: {
        name: 'سارة أحمد',
        avatar: '/instructor-2.jpg',
        bio: 'مطورة ويب محترفة ومدربة معتمدة'
      }
    },
    {
      id: '3',
      title: 'المحاسبة وضرائب الدولات',
      description: 'احترف المحاسبة المالية والضرائب الدولية',
      icon: '📊',
      price: 399,
      duration: '10 أسابيع',
      students: 756,
      rating: 4.7,
      category: 'محاسبة',
      modules: [
        'أساسيات المحاسبة المالية',
        'القوانين الضريبية الدولية',
        'إعداد التقارير المالية',
        'التدقيق والمراجعة'
      ],
      instructor: {
        name: 'محمد السعد',
        avatar: '/instructor-3.jpg',
        bio: 'محاسب قانوني معتمد وخبير ضرائب'
      }
    },
    {
      id: '4',
      title: 'احصل على الاستشارة المجانية',
      description: 'استشارة مجانية لتحديد أفضل مسار تعليمي لك',
      icon: '💡',
      price: 0,
      duration: '30 دقيقة',
      students: 2156,
      rating: 5.0,
      category: 'استشارة',
      modules: [
        'تقييم المهارات الحالية',
        'تحديد الأهداف المهنية',
        'وضع خطة التطوير',
        'اختيار الدورات المناسبة'
      ],
      instructor: {
        name: 'فريق LPC',
        avatar: '/team-avatar.jpg',
        bio: 'فريق من الخبراء والمستشارين المهنيين'
      }
    }
  ],
  
  testimonials: [
    {
      id: '1',
      name: 'فاطمة محمد',
      role: 'مطورة برمجيات',
      content: 'الدورة غيرت حياتي المهنية بالكامل. المحتوى ممتاز والمدربين محترفين جداً.',
      rating: 5,
      avatar: '/testimonial-1.jpg',
      course: 'مطور مبدعي كامل',
      video: '/testimonial-video-1.mp4'
    },
    {
      id: '2', 
      name: 'عمر السعد',
      role: 'محاسب مالي',
      content: 'تعلمت أحدث تقنيات المحاسبة والضرائب. أنصح بها بشدة لكل المهتمين.',
      rating: 5,
      avatar: '/testimonial-2.jpg',
      course: 'المحاسبة وضرائب الدولات'
    },
    {
      id: '3',
      name: 'رانا أحمد',
      role: 'مختبرة برمجيات',
      content: 'الدورة شاملة ومفصلة. ساعدتني في الحصول على وظيفة أحلامي.',
      rating: 4,
      avatar: '/testimonial-3.jpg',
      course: 'اختبار البرمجيات'
    }
  ],
  
  statistics: {
    students: 2966,
    courses: 52,
    certificates: 83,
    instructors: 15
  },
  
  // Actions
  setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
  setConsultationModalOpen: (open) => set({ isConsultationModalOpen: open }),
  setServiceModalOpen: (open, serviceId) => set({ 
    isServiceModalOpen: open, 
    selectedServiceId: serviceId || null 
  }),
  setCurrentTestimonial: (index) => set({ currentTestimonial: index }),
  
  login: async (email, password) => {
    // Mock login - replace with real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      set({
        user: {
          id: '1',
          name: 'محمد أحمد',
          email,
          avatar: '/user-avatar.jpg',
          isAuthenticated: true
        },
        isLoginModalOpen: false
      });
      return true;
    }
    return false;
  },
  
  logout: () => set({ user: null }),
  
  bookConsultation: async (booking) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success
    set({ isConsultationModalOpen: false });
    return true;
  },
  
  addToFavorites: (serviceId) => {
    // Mock implementation - would save to user preferences
    console.log('Added to favorites:', serviceId);
  },
  
  removeFromFavorites: (serviceId) => {
    // Mock implementation - would remove from user preferences  
    console.log('Removed from favorites:', serviceId);
  }
}));