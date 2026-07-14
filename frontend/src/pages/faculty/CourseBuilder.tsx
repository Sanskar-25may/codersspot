import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseDetails, addLessonToCurriculum } from '../../services/courses';

export default function CourseBuilder() {
  const { course_id } = useParams<{ course_id: string }>();

  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form Fields for adding a new lesson
  const [lessonTitle, setLessonTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [sortOrder, setSortOrder] = useState(1);

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const loadCourseData = () => {
    if (course_id) {
      getCourseDetails(course_id)
        .then((data) => {
          setCourse(data);
          // Set default sort order to be next in line
          setSortOrder((data.lessons?.length || 0) + 1);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    loadCourseData();
  }, [course_id]);

  const handleAddLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!lessonTitle) {
      setError("Lesson Title is required.");
      return;
    }

    if (!course_id) return;

    setSaving(true);
    try {
      await addLessonToCurriculum({
        course_id,
        title: lessonTitle,
        content: lessonContent,
        videoUrl,
        sortOrder
      });
      
      setSuccessMessage("Lesson added to syllabus successfully!");
      
      // Clear fields
      setLessonTitle('');
      setVideoUrl('');
      setLessonContent('');
      
      // Reload curriculum outline
      loadCourseData();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to add lesson.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        <p className="text-sm font-medium">Failed to load syllabus configuration.</p>
        <Link to="/faculty" className="text-xs font-bold text-violet-500 hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  const lessons = course.lessons || [];

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Builder Header */}
      <div className="border-b px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
            <Link to="/faculty" className="hover:underline">Dashboard</Link>
            <span>➔</span>
            <span className="text-violet-500">Syllabus Builder</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Curriculum: {course.title}</h1>
        </div>
        <div>
          <span 
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border"
            style={{
              background: course.status === 'PUBLISHED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderColor: course.status === 'PUBLISHED' ? '#10b981' : '#ef4444',
              color: course.status === 'PUBLISHED' ? '#10b981' : '#ef4444'
            }}
          >
            {course.status}
          </span>
        </div>
      </div>

      {/* Split builder workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        
        {/* LEFT COLUMN: Lessons hierarchy outline */}
        <div className="border-r p-6 space-y-4" style={{ borderColor: 'var(--border-soft)' }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Curriculum Outline ({lessons.length} Modules)
          </h2>

          {lessons.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed text-center text-xs font-medium" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}>
              No modules added yet. Use the right form to build your first lesson.
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
              {lessons.map((lesson: any, idx: number) => (
                <div key={lesson.id} className="p-4 rounded-xl border flex items-center justify-between" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-violet-500/10 text-violet-500 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold line-clamp-1">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Order: {lesson.sortOrder}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Lesson Editor form */}
        <div className="lg:col-span-2 p-6 space-y-6" style={{ background: 'var(--bg-card)' }}>
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Add New Lesson Module
          </h2>

          {successMessage && (
            <div className="p-4 rounded-xl border border-emerald-500/20 text-xs font-bold text-emerald-500" style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
              ✓ {successMessage}
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl border border-red-500/20 text-xs font-bold text-red-500" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
              ✗ {error}
            </div>
          )}

          <form onSubmit={handleAddLessonSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Lesson Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Introduction & Scaffolding"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Curriculum Sort Order
                </label>
                <input
                  type="number"
                  min={1}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            {/* Video Url */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Lecture Video Stream URL
              </label>
              <input
                type="url"
                placeholder="e.g. https://www.w3schools.com/html/mov_bbb.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Markdown Lesson content */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Lesson Objective Details
              </label>
              <textarea
                rows={5}
                placeholder="Write lesson notes, objectives, or code snippets..."
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all resize-none"
                style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Save */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all"
              >
                {saving ? "Saving Lesson..." : "Add Lesson To Syllabus"}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
