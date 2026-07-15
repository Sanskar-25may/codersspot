import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getCourses, enrollInCourse } from '../../services/courses';

const DEFAULT_COURSES = [
  {
    id: "c1-uuid",
    title: "UI/UX for Developers",
    level: "Intermediate",
    rating: 4.9,
    price: 149.99,
    instructor: { name: "Sarah Jenkins", initial: "SJ" },
    tags: ["Web Development"],
    gradient: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)"
  },
  {
    id: "c2-uuid",
    title: "Full Stack React & Next.js",
    level: "Intermediate",
    rating: 4.9,
    price: 199.99,
    instructor: { name: "Sarah Jenkins", initial: "SJ" },
    tags: ["Web Development"],
    gradient: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)"
  },
  {
    id: "c3-uuid",
    title: "Full-Stack React & TypeScript",
    level: "Intermediate",
    bestseller: true,
    rating: 4.9,
    price: 149,
    instructor: { name: "Aisha Verma", initial: "AV" },
    tags: ["React", "TypeScript", "Next.js"],
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)"
  },
  {
    id: "c4-uuid",
    title: "System Design for Scale",
    level: "Advanced",
    hot: true,
    rating: 4.8,
    price: 199,
    instructor: { name: "Marcus Chen", initial: "MC" },
    tags: ["Architecture", "Databases", "AWS"],
    gradient: "linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)"
  },
  {
    id: "c5-uuid",
    title: "Applied Machine Learning",
    level: "Advanced",
    rating: 4.9,
    price: 249,
    instructor: { name: "Dr. Sarah Jenkins", initial: "DSJ" },
    tags: ["Python", "TensorFlow", "MLOps"],
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)"
  },
  {
    id: "c6-uuid",
    title: "UI/UX Foundations for Devs",
    level: "Beginner",
    new: true,
    rating: 4.7,
    price: 99,
    instructor: { name: "Priya Nair", initial: "PN" },
    tags: ["Figma", "Design Systems", "CSS"],
    gradient: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)"
  }
];

export default function CoursesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  
  // Search & category states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ background: 'transparent' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  // Blend backend courses with our premium layout mapping
  const coursesList = DEFAULT_COURSES.map((dCourse) => {
    // If backend has matching ID or title, keep backend ID reference for enrollment route
    const dbMatch = courses.find((c) => c.title.toLowerCase().includes(dCourse.title.toLowerCase()) || c.id === dCourse.id);
    return {
      ...dCourse,
      id: dbMatch?.id || dCourse.id,
      price: dbMatch?.price || dCourse.price
    };
  });

  // Filter courses
  const filteredCourses = coursesList.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || course.level === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div
      className="min-h-screen flex flex-col p-6 space-y-10 pt-24 dot-grid"
      style={{ background: 'transparent', color: 'var(--text-primary)' }}
    >
      {/* Header Area */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight heading-font">
            Explore Courses
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Find the right path for your career.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border-soft)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
      </div>

      {actionMessage && (
        <div className="max-w-6xl mx-auto w-full p-4 rounded-xl border border-violet-500/20 text-xs font-bold text-violet-500 text-center" style={{ background: 'rgba(99, 102, 241, 0.05)' }}>
          {actionMessage}
        </div>
      )}

      {/* Categories Filter Grid */}
      <div className="max-w-6xl mx-auto w-full flex flex-wrap gap-2.5 relative z-10">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat || (cat === 'All' && selectedCategory === 'All');
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200"
              style={{
                background: isSelected ? 'var(--text-primary)' : 'var(--bg-card)',
                borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-soft)',
                color: isSelected ? 'var(--bg-base)' : 'var(--text-secondary)'
              }}
            >
              {cat === 'All' ? 'All Courses' : cat}
            </button>
          );
        })}
      </div>

      {/* Courses Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full relative z-10 pb-16">
        {filteredCourses.map((course: any) => (
          <div
            key={course.id}
            className="rounded-[32px] overflow-hidden border flex flex-col justify-between min-h-[380px] transition-all duration-300 card-hover"
            style={{
              borderColor: 'var(--border-soft)',
              background: 'var(--bg-card)',
            }}
          >
            {/* Gradient Header Block */}
            <div
              className="h-44 relative flex-shrink-0"
              style={{ background: course.gradient }}
            >
              {/* Overlays Badges */}
              <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                {course.bestseller && (
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase bg-amber-500 text-white shadow-sm">
                    Bestseller
                  </span>
                )}
                {course.hot && (
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase bg-rose-500 text-white shadow-sm">
                    Hot
                  </span>
                )}
                {course.new && (
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase bg-emerald-500 text-white shadow-sm">
                    New
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-white/20 text-white backdrop-blur-md">
                  {course.level}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Instructor line */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[8px] border"
                      style={{
                        background: 'var(--bg-surface)',
                        borderColor: 'var(--border-soft)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {course.instructor.initial}
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: 'var(--text-secondary)' }}>
                      {course.instructor.name}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-500 flex items-center gap-0.5">
                    ★ {course.rating}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="text-lg font-bold leading-snug heading-font">
                  {course.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {course.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: 'var(--bg-surface)',
                        color: 'var(--text-tertiary)',
                        border: '1px solid var(--border-soft)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t flex justify-between items-end" style={{ borderColor: 'var(--border-soft)' }}>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                    Price
                  </span>
                  <div className="text-lg font-black heading-font">
                    ₹{course.price.toLocaleString('en-IN')}
                  </div>
                </div>
                
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="text-xs font-bold flex items-center gap-1 hover:underline transition-all"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  View More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
