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
      title: 'Pruebas de Software',
      description: 'Aprende las técnicas más avanzadas de testing y aseguramiento de calidad en desarrollo',
      icon: '💻',
      price: 299,
      duration: '8 semanas',
      students: 1245,
      rating: 4.8,
      category: 'Tecnología',
      modules: [
        'Introducción a las pruebas de software',
        'Testing manual y automatizado', 
        'Herramientas avanzadas de testing',
        'Gestión del ciclo de vida de pruebas'
      ],
      instructor: {
        name: 'Ahmed Mohamed',
        avatar: '/instructor-1.jpg',
        bio: 'Experto en pruebas de software con más de 10 años de experiencia'
      }
    },
    {
      id: '2',
      title: 'Desarrollador Full Stack',
      description: 'Conviértete en un desarrollador web completo y domina las últimas tecnologías',
      icon: '🚀',
      price: 499,
      duration: '12 semanas',
      students: 987,
      rating: 4.9,
      category: 'Desarrollo',
      modules: [
        'Fundamentos de HTML y CSS',
        'JavaScript avanzado',
        'React y Next.js',
        'Node.js y bases de datos'
      ],
      instructor: {
        name: 'Sara Ahmed',
        avatar: '/instructor-2.jpg',
        bio: 'Desarrolladora web profesional y formadora certificada'
      }
    },
    {
      id: '3',
      title: 'Contabilidad y Fiscalidad Internacional',
      description: 'Domina la contabilidad financiera y los impuestos internacionales',
      icon: '📊',
      price: 399,
      duration: '10 semanas',
      students: 756,
      rating: 4.7,
      category: 'Finanzas',
      modules: [
        'Fundamentos de contabilidad financiera',
        'Legislación fiscal internacional',
        'Preparación de informes financieros',
        'Auditoría y revisión'
      ],
      instructor: {
        name: 'Mohamed Al-Saad',
        avatar: '/instructor-3.jpg',
        bio: 'Contador público certificado y experto fiscal'
      }
    },
    {
      id: '4',
      title: 'Consulta Gratuita',
      description: 'Consulta gratuita para determinar la mejor ruta de aprendizaje para ti',
      icon: '💡',
      price: 0,
      duration: '30 minutos',
      students: 2156,
      rating: 5.0,
      category: 'Consulta',
      modules: [
        'Evaluación de habilidades actuales',
        'Definición de objetivos profesionales',
        'Plan de desarrollo personalizado',
        'Selección de cursos apropiados'
      ],
      instructor: {
        name: 'Equipo EduPlatform',
        avatar: '/team-avatar.jpg',
        bio: 'Equipo de expertos y consultores profesionales'
      }
    },
    {
      id: '5',
      title: 'Marketing Digital',
      description: 'Domina las estrategias de marketing digital y redes sociales',
      icon: '📱',
      price: 249,
      duration: '6 semanas',
      students: 1891,
      rating: 4.6,
      category: 'Marketing',
      modules: [
        'Fundamentos del marketing digital',
        'SEO y SEM avanzado',
        'Marketing en redes sociales',
        'Análisis y métricas'
      ],
      instructor: {
        name: 'Laila Hassan',
        avatar: '/instructor-4.jpg',
        bio: 'Especialista en marketing digital con certificaciones Google y Facebook'
      }
    },
    {
      id: '6',
      title: 'Diseño UX/UI',
      description: 'Crea experiencias digitales excepcionales con diseño centrado en el usuario',
      icon: '🎨',
      price: 349,
      duration: '9 semanas',
      students: 1456,
      rating: 4.9,
      category: 'Diseño',
      modules: [
        'Principios de UX Research',
        'Wireframing y prototipado',
        'Diseño de interfaces modernas',
        'Testing de usabilidad'
      ],
      instructor: {
        name: 'Omar Benali',
        avatar: '/instructor-5.jpg',
        bio: 'Diseñador UX/UI con experiencia en startups y grandes corporaciones'
      }
    }
  ],
  
  testimonials: [
    {
      id: '1',
      name: 'Fatima Mohamed',
      role: 'Desarrolladora de Software',
      content: 'El curso cambió completamente mi carrera profesional. El contenido es excelente y los instructores son muy profesionales.',
      rating: 5,
      avatar: '/testimonial-1.jpg',
      course: 'Desarrollador Full Stack',
      video: '/testimonial-video-1.mp4'
    },
    {
      id: '2', 
      name: 'Omar Al-Saad',
      role: 'Contador Financiero',
      content: 'Aprendí las técnicas más modernas de contabilidad e impuestos. Lo recomiendo encarecidamente a todos los interesados.',
      rating: 5,
      avatar: '/testimonial-2.jpg',
      course: 'Contabilidad y Fiscalidad Internacional'
    },
    {
      id: '3',
      name: 'Rana Ahmed',
      role: 'Tester de Software',
      content: 'El curso es completo y detallado. Me ayudó a conseguir el trabajo de mis sueños.',
      rating: 4,
      avatar: '/testimonial-3.jpg',
      course: 'Pruebas de Software'
    },
    {
      id: '4',
      name: 'Hassan Al-Rashid',
      role: 'Especialista en Marketing Digital',
      content: 'Increíble nivel de profundidad en marketing digital. Los casos prácticos son muy valiosos.',
      rating: 5,
      avatar: '/testimonial-4.jpg',
      course: 'Marketing Digital'
    },
    {
      id: '5',
      name: 'Amira Benali',
      role: 'Diseñadora UX/UI',
      content: 'El mejor curso de diseño que he tomado. Ahora trabajo en una startup internacional.',
      rating: 5,
      avatar: '/testimonial-5.jpg',
      course: 'Diseño UX/UI'
    }
  ],
  
  statistics: {
    students: 5847,
    courses: 87,
    certificates: 156,
    instructors: 28
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
          name: 'Mohamed Ahmed',
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