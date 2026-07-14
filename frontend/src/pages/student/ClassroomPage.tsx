import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClassroom, updateClassroomProgress } from '../../services/courses';

export default function ClassroomPage() {
  const { course_id } = useParams<{ course_id: string }>();
  
  const [courseData, setCourseData] = useState<any>(null);
  const [progress, setProgress] = useState<number>(0);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');

  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [savingProgress, setSavingProgress] = useState(false);

  useEffect(() => {
    if (course_id) {
      getClassroom(course_id)
        .then((data) => {
          setCourseData(data.course);
          setProgress(data.progress);
          
          // Default to first lesson if lessons exist
          if (data.course.lessons && data.course.lessons.length > 0) {
            setActiveLesson(data.course.lessons[0]);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [course_id]);

  const handleLessonSelect = (lesson: any) => {
    setActiveLesson(lesson);
  };

  const handleMarkCompleted = async () => {
    if (!course_id || !courseData || !activeLesson) return;
    
    setSavingProgress(true);
    try {
      const lessons = courseData.lessons || [];
      const activeIdx = lessons.findIndex((l: any) => l.id === activeLesson.id);
      
      // Calculate progress percentage based on lesson completion
      const lessonsCount = lessons.length;
      const completedCount = activeIdx + 1;
      const newProgress = Math.max(progress, Math.round((completedCount / lessonsCount) * 100));

      const response = await updateClassroomProgress(course_id, newProgress);
      setProgress(response.progress);
      
      // Select next lesson automatically if available
      if (activeIdx + 1 < lessonsCount) {
        setActiveLesson(lessons[activeIdx + 1]);
      }
    } catch (err) {
      console.error("Failed to save progress update", err);
    } finally {
      setSavingProgress(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        <p className="text-sm font-medium">Failed to load classroom content.</p>
        <Link to="/student/courses" className="text-xs font-bold text-violet-500 hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  const lessons = courseData.lessons || [];

  return (
    <div className="min-h-screen flex flex-col pt-20" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* Classroom Header */}
      <div className="border-b px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
            <Link to="/student/courses" className="hover:underline">My Courses</Link>
            <span>➔</span>
            <span className="text-violet-500">{courseData.title}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">{activeLesson?.title || 'No Active Lesson'}</h1>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>Progress:</span>
            <span className="text-xs font-extrabold">{progress}%</span>
          </div>
          <div className="flex-grow md:flex-none w-32 bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-cyan-500 h-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Split Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        
        {/* LEFT COLUMN: Player & Tabs */}
        <div className="lg:col-span-2 border-r p-6 space-y-6 flex flex-col justify-between" style={{ borderColor: 'var(--border-soft)' }}>
          <div className="space-y-6">
            
            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border shadow-inner flex items-center justify-center" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-soft)' }}>
              {activeLesson?.videoUrl ? (
                <video 
                  src={activeLesson.videoUrl} 
                  controls 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center space-y-2">
                  <span className="text-4xl">📺</span>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>No video stream mapped to this lesson.</p>
                </div>
              )}
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b text-xs font-bold gap-6" style={{ borderColor: 'var(--border-soft)' }}>
              {['overview', 'notes', 'resources'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className="pb-3 border-b-2 uppercase tracking-wider transition-all"
                  style={{ 
                    borderColor: activeTab === tab ? 'var(--accent-primary)' : 'transparent',
                    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-tertiary)'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Panes */}
            <div className="min-h-[150px] text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <p className="font-semibold text-xs text-primary" style={{ color: 'var(--text-primary)' }}>Lesson Objectives:</p>
                  <p className="text-xs font-medium">{activeLesson?.content || 'No text content loaded for this module.'}</p>
                </div>
              )}
              {activeTab === 'notes' && (
                <textarea
                  rows={6}
                  placeholder="Draft your course notes here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 rounded-xl border text-xs font-medium focus:outline-none transition-all resize-none"
                  style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}
                />
              )}
              {activeTab === 'resources' && (
                <div className="space-y-3">
                  <p className="font-semibold text-xs text-primary" style={{ color: 'var(--text-primary)' }}>Downloadable Materials:</p>
                  <a href="#" className="flex items-center gap-2 text-xs text-violet-500 font-bold hover:underline">
                    📄 Course_Curriculum_Reference.pdf
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Mark Complete Actions bar */}
          <div className="pt-6 border-t flex justify-end" style={{ borderColor: 'var(--border-soft)' }}>
            <button
              onClick={handleMarkCompleted}
              disabled={savingProgress}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.02] transition-all"
            >
              {savingProgress ? "Saving Progress..." : "Mark Lesson Completed ➔"}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar Navigation */}
        <div className="p-6 space-y-6" style={{ background: 'var(--bg-card)' }}>
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Course Syllabus
            </h3>
            <p className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {lessons.length} Lesson Modules
            </p>
          </div>

          {/* Lessons list accordions */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
            {lessons.map((lesson: any, idx: number) => {
              const isActive = activeLesson?.id === lesson.id;
              return (
                <div 
                  key={lesson.id}
                  onClick={() => handleLessonSelect(lesson)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${isActive ? 'border-violet-500 shadow-md' : 'border-transparent'}`}
                  style={{ 
                    background: isActive ? 'var(--bg-surface)' : 'var(--bg-base)',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-soft)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${isActive ? 'bg-violet-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold line-clamp-1">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: 'var(--text-tertiary)' }}>
                    {isActive ? '🎥 Playing' : '📄 Module'}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
