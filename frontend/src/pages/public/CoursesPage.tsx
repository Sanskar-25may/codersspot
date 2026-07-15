import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCourses, enrollInCourse } from '../../services/courses';

export default function CoursesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      // Redirect unauthenticated user to signup
      navigate('/auth');
      return;
    }

    if (user.role !== 'STUDENT') {
      setActionMessage("Only student accounts can enroll in courses.");
      return;
    }

    try {
      await enrollInCourse(courseId);
      setActionMessage("Enrolled successfully! Redirecting to classroom...");
      setTimeout(() => {
        navigate(`/student/classroom/${courseId}`);
      }, 1500);
    } catch {
      setActionMessage("Failed to enroll in this course.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  // Fallback courses data if database is unseeded
  const coursesList = courses.length > 0 ? courses : [
    {
      id: "c1-uuid",
      title: "Full Stack React & Next.js",
      faculty_name: "Instructor Avatar",
      description: "Master component architectures, context state managers, Tailwind CSS tokens, and static pre-rendering structures.",
      price: 4999.00,
      level: "Intermediate"
    },
    {
      id: "c2-uuid",
      title: "System Design & Scale",
      faculty_name: "Instructor Avatar",
      description: "Explore vertical/horizontal scaling, caching grids (Redis), load balancing, and database sharding techniques.",
      price: 6999.00,
      level: "Advanced"
    },
    {
      id: "c3-uuid",
      title: "Applied Machine Learning & AI",
      faculty_name: "AI Mentor",
      description: "Build, validate, and deploy supervised/unsupervised machine learning models in production containers.",
      price: 8999.00,
      level: "Advanced"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 pt-24 dot-grid" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 py-6 relative z-10">
        {/* Blur orb backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 bg-gradient-to-br from-violet-600 to-cyan-400 pointer-events-none"></div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight heading-font">
          Explore Our <span className="shimmer-text">Syllabus Tracks</span>
        </h1>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Curriculums engineered around hands-on development, vertical VPS deployments, and real production benchmarks.
        </p>
      </div>

      {actionMessage && (
        <div className="max-w-2xl mx-auto w-full p-4 rounded-xl border border-violet-500/20 text-xs font-bold text-violet-500 text-center" style={{ background: 'rgba(99, 102, 241, 0.05)' }}>
          {actionMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full relative z-10">
        {coursesList.map((course: any) => (
          <div key={course.id} className="p-6 rounded-3xl border glass card-hover flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-500">
                  {course.level || 'Intermediate'}
                </span>
                <span className="text-xs font-extrabold text-violet-500">
                  ₹{parseFloat(course.price).toLocaleString('en-IN')}
                </span>
              </div>
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p className="text-xs font-medium leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                {course.description}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
              <div className="text-[10px] font-bold" style={{ color: 'var(--text-tertiary)' }}>
                Instructor: {course.faculty_name}
              </div>
              <button
                onClick={() => handleEnroll(course.id)}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all"
              >
                {user ? "Enroll Now ➔" : "Sign In to Enroll ➔"}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
