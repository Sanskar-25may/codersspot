import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getStudentDashboard } from '../../services/courses';

// Mock list of modules and lectures for enrolled courses
const COURSE_MODULES: Record<string, Array<{
  title: string;
  lectures: Array<{
    id: string;
    title: string;
    duration: string;
    videoUrl?: string;
    isLiveToday?: boolean;
    isLocked?: boolean;
  }>;
}>> = {
  "c1-uuid": [
    {
      title: "Module 1: React TS Core & Scaffold Setup",
      lectures: [
        { id: "l1", title: "1.1 Scaffold setup using Vite & TS", duration: "45 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: "l2", title: "1.2 Folder structures & Clean architectures", duration: "60 mins", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
      ]
    },
    {
      title: "Module 2: Routing Protected Portals & Auth States",
      lectures: [
        { id: "l3", title: "2.1 JWT interceptors & Mock routing", duration: "50 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { id: "l4", title: "2.2 Designing premium CSS dashboards", duration: "75 mins", isLiveToday: true },
        { id: "l5", title: "2.3 State persistence & Hydration triggers", duration: "90 mins", isLocked: true },
      ]
    }
  ],
  "c2-uuid": [
    {
      title: "Module 1: Caching Grids & Replication Layers",
      lectures: [
        { id: "l6", title: "1.1 Redis cluster architecture design", duration: "55 mins", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
        { id: "l7", title: "1.2 Sentinel configurations & Replication metrics", duration: "70 mins", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
      ]
    },
    {
      title: "Module 2: Database Partitioning & Sharding",
      lectures: [
        { id: "l8", title: "2.1 Choosing shards key & Partition grids", duration: "80 mins", isLiveToday: true },
        { id: "l9", title: "2.2 Distributed joins & Transaction locks", duration: "95 mins", isLocked: true },
      ]
    }
  ]
};

// Heatmap mock active grid cells generator
const generateHeatmapData = () => {
  const data: Record<string, number> = {};
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // Random activity level between 0 and 4
    if (Math.random() > 0.4) {
      data[dateStr] = Math.floor(Math.random() * 4) + 1;
    } else {
      data[dateStr] = 0;
    }
  }
  return data;
};

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Unified student portal navigation tabs state
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'assignments' | 'messages'>('home');

  // Courses Tab detailed view state
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [activeLecture, setActiveLecture] = useState<any>(null);

  // Heatmap tracking state
  const [heatmap, setHeatmap] = useState<Record<string, number>>(generateHeatmapData());

  // Collapsible Gemini sidebar for Assignments
  const [geminiTab, setGeminiTab] = useState<'dpp' | 'challenge' | 'doubts' | 'collab'>('dpp');
  const [geminiExpanded, setGeminiExpanded] = useState(true);

  // Assignment states
  const [dppSubmitted, setDppSubmitted] = useState(false);
  const [dppFile, setDppFile] = useState<File | null>(null);
  const [dppText, setDppText] = useState('');
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeCode, setChallengeCode] = useState('// Write your solution here\nfunction solveProblem() {\n  \n}');

  // Chat message states
  const [selectedChat, setSelectedChat] = useState<'group' | 'faculty' | 'admin'>('group');
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, Array<{ sender: 'student' | 'other'; text: string; time: string; authorName?: string }>>>({
    group: [
      { sender: 'other', authorName: 'Rohan Deshmukh', text: "Hey coders! Has anyone resolved the Redis sentinel cluster routing bug?", time: "10:12 AM" },
      { sender: 'other', authorName: 'Priya Nair', text: "Yes! Make sure the client config has correct sentinel failover parameters.", time: "10:15 AM" }
    ],
    faculty: [
      { sender: 'other', text: "Hello! Reviewed your routing project, looks fantastic. Focus on cleaning component props next.", time: "Yesterday" }
    ],
    admin: [
      { sender: 'other', text: "Your enrollment transaction has been verified. Welcome to CodersSpot!", time: "2 days ago" }
    ]
  });

  useEffect(() => {
    getStudentDashboard()
      .then((data) => {
        setDashboardData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      sender: 'student' as const,
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => ({
      ...prev,
      [selectedChat]: [...prev[selectedChat], newMessage]
    }));

    const sentText = messageText;
    setMessageText('');

    // Trigger mock automated replies after 1.5 seconds
    setTimeout(() => {
      let replyText = '';
      let author = '';
      if (selectedChat === 'group') {
        replyText = "Awesome discussion! Let's check this in today's live lecture.";
        author = "Priya Nair";
      } else if (selectedChat === 'faculty') {
        replyText = `Got your query regarding "${sentText}". I am looking into it and will get back to you shortly.`;
      } else {
        replyText = "Thanks for reaching support. Admin ticketing team is looking at your request.";
      }

      setChatMessages((prev) => ({
        ...prev,
        [selectedChat]: [
          ...prev[selectedChat],
          { sender: 'other', authorName: author || undefined, text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        ]
      }));
    }, 1500);
  };

  const handleDppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating heatmap with new contribution block
    const todayStr = new Date().toISOString().split('T')[0];
    setHeatmap((prev) => ({
      ...prev,
      [todayStr]: (prev[todayStr] || 0) + 1
    }));
    setDppSubmitted(true);
  };

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todayStr = new Date().toISOString().split('T')[0];
    setHeatmap((prev) => ({
      ...prev,
      [todayStr]: (prev[todayStr] || 0) + 2
    }));
    setChallengeSubmitted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-pulse" style={{ background: 'var(--bg-base)' }}>
        <div className="w-8 h-8 rounded-full border-4 border-t-violet-500 animate-spin" style={{ borderColor: 'var(--border-soft) var(--border-soft) var(--border-soft) var(--accent-primary)' }}></div>
      </div>
    );
  }

  const data = dashboardData || {
    enrolled_count: 0,
    completed_count: 0,
    avg_progress: 0,
    study_hours_mock: 0,
    active_course: null,
    enrollments: []
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* ── DESKTOP PORTAL SIDEBAR ── */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r shrink-0 pt-20 p-6" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
        <div className="space-y-8">
          {/* Brand header */}
          <div className="space-y-1">
            <span className="text-[10px] font-black tracking-widest text-violet-500 uppercase">Student Portal</span>
            <h2 className="text-lg font-black heading-font">Learning Control</h2>
          </div>

          {/* Nav menu links */}
          <nav className="flex flex-col gap-1.5">
            {[
              { id: 'home', label: 'Dashboard Home', icon: '🏠' },
              { id: 'courses', label: 'My Enrolled Courses', icon: '📚' },
              { id: 'assignments', label: 'Assignments & DPPs', icon: '📝' },
              { id: 'messages', label: 'Messages Chat', icon: '💬' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedCourse(null);
                  setActiveLecture(null);
                }}
                className="flex items-center gap-3 px-4 py-3 text-xs font-black rounded-xl hover:scale-[1.01] transition-all text-left"
                style={{
                  background: activeTab === tab.id ? 'var(--bg-base)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: activeTab === tab.id ? '1px solid var(--border-soft)' : '1px solid transparent'
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <button 
            onClick={logout}
            className="w-full py-2.5 rounded-xl text-xs font-bold border hover:bg-zinc-800/10 transition-all text-center"
            style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MOBILE STICKY BOTTOM NAV BAR ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around py-3 px-4 backdrop-blur-md shadow-lg" style={{ background: 'color-mix(in srgb, var(--bg-card) 90%, transparent)', borderColor: 'var(--border-soft)' }}>
        {[
          { id: 'home', label: 'Home', icon: '🏠' },
          { id: 'courses', label: 'Courses', icon: '📚' },
          { id: 'assignments', label: 'Tasks', icon: '📝' },
          { id: 'messages', label: 'Chat', icon: '💬' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSelectedCourse(null);
              setActiveLecture(null);
            }}
            className="flex flex-col items-center gap-1 text-[10px] font-black"
            style={{ color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-tertiary)' }}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* ── MAIN WORKSPACE CONTAINER ── */}
      <main className="flex-1 flex flex-col pt-20 md:pt-20 pb-20 md:pb-6 px-6 overflow-hidden">
        
        {/* TAB 1: HOME / DASHBOARD */}
        {activeTab === 'home' && (
          <div className="space-y-6 pt-4 max-h-[85vh] overflow-y-auto no-scrollbar pr-1">
            {/* Welcome banner */}
            <div className="relative rounded-3xl p-8 overflow-hidden bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 z-10">
                <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.full_name || 'Student'}!</h1>
                <p className="text-sm opacity-90 max-w-md">Track learning statistics, view scheduled Zoom classes, and complete assignments reference metrics.</p>
              </div>
            </div>

            {/* GitHub learning heatmap tracker */}
            <div className="p-6 rounded-3xl border flex flex-col space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
              <div className="space-y-1">
                <h3 className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>Learning Contribution Heatmap</h3>
                <p className="text-[10px] font-semibold" style={{ color: 'var(--text-tertiary)' }}>Tracks Daily Practice Problems (DPP) & quiz challenges submitted in realtime.</p>
              </div>

              {/* Grid heatmap */}
              <div className="flex gap-1 overflow-x-auto py-2 no-scrollbar">
                {/* 52 Columns Grid representing weeks */}
                {Array.from({ length: 40 }).map((_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1 shrink-0">
                    {Array.from({ length: 7 }).map((_, dayIdx) => {
                      const dayOffset = (weekIdx * 7) + dayIdx;
                      const date = new Date();
                      date.setDate(date.getDate() - dayOffset);
                      const dateStr = date.toISOString().split('T')[0];
                      const level = heatmap[dateStr] || 0;
                      
                      let color = 'bg-zinc-100 dark:bg-zinc-800'; // level 0
                      if (level === 1) color = 'bg-violet-900/40 dark:bg-violet-900/30';
                      if (level === 2) color = 'bg-violet-700/60 dark:bg-violet-700/50';
                      if (level === 3) color = 'bg-violet-500/80 dark:bg-violet-500/70';
                      if (level >= 4) color = 'bg-violet-400 dark:bg-violet-400';

                      return (
                        <div 
                          key={dayIdx} 
                          className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 ${color}`}
                          title={`Contributions: ${level}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics cards row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Learning Hours', value: `${data.study_hours_mock || '14.5'} hrs`, icon: '⏱️' },
                { title: 'Enrolled Modules', value: `${data.enrolled_count || '1'}`, icon: '📚' },
                { title: 'Submitted Tasks', value: dppSubmitted ? '2' : '1', icon: '📝' },
                { title: 'Passed Tests', value: challengeSubmitted ? '3' : '2', icon: '🏆' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl border flex flex-col justify-between min-h-[110px]" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{stat.title}</span>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <h3 className="text-xl font-extrabold">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* Bottom Row split: Resume incomplete video & Zoom schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card 1: Left viewed incomplete video */}
              <div className="p-6 rounded-3xl border flex flex-col justify-between min-h-[220px]" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Incomplete Module</span>
                  <h3 className="text-base font-black">Full Stack React & Next.js</h3>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Last watched: <span className="text-primary font-bold">1.2 Routing & Page Navigation</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-400">
                      <span>45% Watched</span>
                      <span>15 mins remaining</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('courses');
                      const c = data.enrollments.find((e: any) => e.course.id === 'c1-uuid') || data.enrollments[0];
                      if (c) {
                        setSelectedCourse(c.course);
                      }
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:opacity-90 shadow-md text-center"
                  >
                    Resume Video lecture ➔
                  </button>
                </div>
              </div>

              {/* Card 2: Today's live Zoom classes schedule */}
              <div className="p-6 rounded-3xl border flex flex-col justify-between min-h-[220px]" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Live Zoom Cohort</span>
                  <h3 className="text-base font-black">Advanced System Design & scaling</h3>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Today's Topic: <span className="font-bold">Database Sharding & Partition Metrics</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl flex items-center justify-between border" style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)' }}>
                    <div className="space-y-0.5">
                      <p className="text-[9px] uppercase font-bold text-zinc-500">Live Status</p>
                      <h4 className="text-xs font-bold">Starts in 10 minutes</h4>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('courses');
                      const c = data.enrollments.find((e: any) => e.course.id === 'c2-uuid');
                      if (c) setSelectedCourse(c.course);
                    }}
                    className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 shadow-md text-center"
                  >
                    Watch Live zoom Call 📺
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: MY COURSES */}
        {activeTab === 'courses' && (
          <div className="space-y-6 pt-4 max-h-[85vh] overflow-y-auto no-scrollbar pr-1">
            {!selectedCourse ? (
              <>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black heading-font">My Learning Modules</h2>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Select any of your enrolled courses below to view Zoom recordings and lecture playlists.</p>
                </div>

                {/* Enrolled course cards list */}
                {data.enrollments.length === 0 ? (
                  <div className="text-center py-16 border rounded-3xl" style={{ borderColor: 'var(--border-soft)' }}>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>You are not enrolled in any modules yet.</p>
                    <Link to="/courses" className="inline-block mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md">
                      Browse Public Catalog
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.enrollments.map((enr: any) => (
                      <div 
                        key={enr.id}
                        className="rounded-3xl border p-6 flex flex-col justify-between min-h-[220px] transition-all hover:shadow-lg hover:scale-[1.01]"
                        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
                      >
                        <div className="space-y-3">
                          <span className="text-[10px] font-black uppercase text-violet-500 tracking-wider">Course Module</span>
                          <h3 className="text-lg font-black heading-font">{enr.course.title}</h3>
                          <p className="text-xs font-medium line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{enr.course.description}</p>
                        </div>

                        <div className="space-y-4 pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span style={{ color: 'var(--text-tertiary)' }}>Progress:</span>
                            <span>{enr.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-500" style={{ width: `${enr.progress}%` }} />
                          </div>
                          <button
                            onClick={() => {
                              setSelectedCourse(enr.course);
                              const list = COURSE_MODULES[enr.course.id] || [];
                              if (list.length > 0 && list[0].lectures.length > 0) {
                                setActiveLecture(list[0].lectures[0]);
                              }
                            }}
                            className="w-full py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-95 shadow-md text-center"
                          >
                            Open Course playlist ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* DETAILED SYLLABUS & PLAYLIST VIEW */
              <div className="space-y-6">
                
                {/* Back Link and description header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-soft)' }}>
                  <div className="space-y-1">
                    <button 
                      onClick={() => {
                        setSelectedCourse(null);
                        setActiveLecture(null);
                      }}
                      className="text-xs font-bold text-violet-500 hover:underline flex items-center gap-1"
                    >
                      🠔 Back to Enrolled Courses
                    </button>
                    <h2 className="text-2xl font-black heading-font pt-2">{selectedCourse.title}</h2>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{selectedCourse.description}</p>
                  </div>
                </div>

                {/* Main YouTube style split player */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* LEFT COLUMN: Player & Video description */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="relative aspect-video rounded-3xl overflow-hidden border shadow-lg flex items-center justify-center bg-zinc-950" style={{ borderColor: 'var(--border-soft)' }}>
                      {activeLecture?.videoUrl ? (
                        <video 
                          src={activeLecture.videoUrl} 
                          controls 
                          className="w-full h-full object-contain"
                        />
                      ) : activeLecture?.isLiveToday ? (
                        <div className="text-center p-8 space-y-4 text-white">
                          <span className="text-4xl animate-bounce block">🎥</span>
                          <h4 className="text-base font-extrabold">Live Zoom Lecture is Active!</h4>
                          <p className="text-xs text-zinc-300 max-w-sm">Join this live session now to interact with your instructor.</p>
                          <a 
                            href="https://zoom.us/join" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-500 shadow-md hover:scale-105 transition-all"
                          >
                            Watch Live Stream Now
                          </a>
                        </div>
                      ) : (
                        <div className="text-center p-8 text-zinc-400 space-y-2">
                          <span className="text-4xl">🔒</span>
                          <h4 className="text-sm font-bold">Lecture Locked</h4>
                          <p className="text-xs">This lecture is scheduled and will be unlocked after the corresponding live zoom call.</p>
                        </div>
                      )}
                    </div>

                    {/* Active Lecture details card */}
                    <div className="p-6 rounded-3xl border space-y-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase text-violet-500 tracking-wider">Active Lecture Module</span>
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>{activeLecture?.duration}</span>
                      </div>
                      <h3 className="text-lg font-black">{activeLecture?.title || 'Select a lecture'}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        This zoom-recorded session covers theoretical architectures, framework designs, and codebase templates. Make sure to complete the daily practice problem (DPP) mapped to this module!
                      </p>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Playlist Sidebar grouped by modules */}
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                    <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400 pl-2">Course Playlist Syllabus</h3>
                    
                    {(COURSE_MODULES[selectedCourse.id] || []).map((mod, modIdx) => (
                      <div key={modIdx} className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}>
                        <div className="p-4 border-b" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-card)' }}>
                          <h4 className="text-xs font-black leading-tight">{mod.title}</h4>
                          <p className="text-[9px] font-semibold text-zinc-500 mt-1">{mod.lectures.length} sessions listed</p>
                        </div>
                        <div className="flex flex-col">
                          {mod.lectures.map((lec) => {
                            const isSelected = activeLecture?.id === lec.id;
                            return (
                              <button
                                key={lec.id}
                                disabled={lec.isLocked}
                                onClick={() => setActiveLecture(lec)}
                                className={`w-full p-4 flex items-center justify-between text-left border-b last:border-0 transition-all ${lec.isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-800/5'}`}
                                style={{
                                  background: isSelected ? 'var(--bg-base)' : 'transparent',
                                  borderColor: 'var(--border-soft)'
                                }}
                              >
                                <div className="space-y-1 pr-2">
                                  <p 
                                    className="text-xs font-bold line-clamp-1" 
                                    style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}
                                  >
                                    {lec.title}
                                  </p>
                                  <span className="text-[9px] font-semibold text-zinc-500">{lec.duration}</span>
                                </div>

                                <div className="shrink-0 flex items-center gap-1.5">
                                  {lec.isLocked ? (
                                    <span className="text-[10px] font-bold text-zinc-400">🔒 Locked</span>
                                  ) : lec.isLiveToday ? (
                                    <span className="text-[9px] font-black uppercase bg-rose-500 text-white px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                                      Watch Live
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold text-emerald-500">✓ Unlocked</span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 3: ASSIGNMENTS (GEMINI COLLAPSIBLE SIDEBAR STYLE) */}
        {activeTab === 'assignments' && (
          <div className="flex flex-1 overflow-hidden h-[80vh] border rounded-3xl mt-4" style={{ borderColor: 'var(--border-soft)' }}>
            
            {/* COLLAPSIBLE SIDEBAR */}
            <aside 
              className={`flex flex-col border-r transition-all duration-300 ${geminiExpanded ? 'w-56' : 'w-16'}`}
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
            >
              {/* Header block with collapse toggle button */}
              <div className="p-4 border-b flex items-center justify-between gap-3" style={{ borderColor: 'var(--border-soft)' }}>
                {geminiExpanded && <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">Gemini Workspace</span>}
                <button 
                  type="button"
                  onClick={() => setGeminiExpanded(!geminiExpanded)}
                  className="p-1 rounded-lg hover:bg-zinc-800/10 text-xs text-zinc-400"
                >
                  {geminiExpanded ? '◀' : '▶'}
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className="flex-1 p-3 flex flex-col gap-1">
                {[
                  { id: 'dpp', label: 'Daily Practice (DPP)', icon: '📝' },
                  { id: 'challenge', label: 'HackerRank Challenge', icon: '🏆' },
                  { id: 'doubts', label: 'Doubts Forum', icon: '❓' },
                  { id: 'collab', label: 'Collaboration Rooms', icon: '👥' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGeminiTab(item.id as any)}
                    className="flex items-center gap-3 px-3 py-3 text-xs font-black rounded-xl hover:scale-[1.01] transition-all text-left"
                    style={{
                      background: geminiTab === item.id ? 'var(--bg-base)' : 'transparent',
                      color: geminiTab === item.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                      border: geminiTab === item.id ? '1px solid var(--border-soft)' : '1px solid transparent'
                    }}
                  >
                    <span className="text-sm shrink-0">{item.icon}</span>
                    {geminiExpanded && <span className="truncate">{item.label}</span>}
                  </button>
                ))}
              </nav>
            </aside>

            {/* MAIN ASSIGNMENTS PANEL DISPLAY */}
            <section className="flex-1 p-8 overflow-y-auto no-scrollbar flex flex-col justify-between" style={{ background: 'var(--bg-base)' }}>
              
              {/* TAB SUB-DISPLAY PANES */}
              <div className="space-y-6">
                
                {/* 1. Daily Practice Problem (DPP) */}
                {geminiTab === 'dpp' && (
                  <div className="space-y-6 text-left">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black heading-font">Daily Practice Problem (DPP)</h2>
                      <p className="text-xs text-zinc-400">Complete tasks to update learning metrics heatmap.</p>
                    </div>

                    {!dppSubmitted ? (
                      <form onSubmit={handleDppSubmit} className="space-y-6 p-6 border rounded-2xl" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                        <div className="space-y-2">
                          <p className="text-xs font-extrabold uppercase text-amber-500">Question Task:</p>
                          <h3 className="text-sm font-bold text-primary">Explain how failover cluster routing behaves when a Redis shard replica database disconnects. Submit a detailed response using text or diagram image.</h3>
                        </div>

                        {/* Text Submission Box */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black">Write Explanation Code/Text *</label>
                          <textarea
                            value={dppText}
                            onChange={(e) => setDppText(e.target.value)}
                            required
                            placeholder="Type explanation code or system workflow paragraphs here..."
                            rows={6}
                            className="w-full p-4 rounded-xl border text-xs font-medium focus:outline-none"
                            style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                          />
                        </div>

                        {/* Image Drag & Drop Mock */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black">Submit Diagram Image (Optional)</label>
                          <div 
                            className="border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition-all hover:bg-zinc-800/5"
                            style={{ borderColor: 'var(--border-soft)' }}
                          >
                            <input 
                              type="file" 
                              id="dpp-image-uploader" 
                              accept="image/*" 
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  setDppFile(e.target.files[0]);
                                }
                              }}
                            />
                            <label htmlFor="dpp-image-uploader" className="cursor-pointer space-y-1 block">
                              <span className="text-2xl block">📁</span>
                              <p className="text-xs font-bold text-zinc-400">
                                {dppFile ? dppFile.name : "Drag files here or click to browse image diagrams"}
                              </p>
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md"
                        >
                          Submit DPP Solution
                        </button>
                      </form>
                    ) : (
                      <div className="p-8 border rounded-2xl text-center space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                        <h3 className="text-base font-bold">DPP Task Submitted Successfully!</h3>
                        <p className="text-xs text-zinc-400">Your contributions have been updated in the dashboard activity heatmap.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Today's Challenge */}
                {geminiTab === 'challenge' && (
                  <div className="space-y-6 text-left">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black heading-font">Today's HackerRank Coding Challenge</h2>
                      <p className="text-xs text-zinc-400">Live system performance tests. Submit compiler code solutions.</p>
                    </div>

                    {!challengeSubmitted ? (
                      <form onSubmit={handleChallengeSubmit} className="space-y-5 p-6 border rounded-2xl" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                        <div className="space-y-2">
                          <p className="text-xs font-extrabold uppercase text-cyan-500">Live Challenge Problem:</p>
                          <h3 className="text-sm font-bold">Write a routing algorithm in TypeScript to select sharded servers dynamically based on consistent hashing rings.</h3>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black">Code Solution Editor</label>
                          <textarea
                            value={challengeCode}
                            onChange={(e) => setChallengeCode(e.target.value)}
                            required
                            rows={8}
                            className="w-full p-4 rounded-xl border text-xs font-mono focus:outline-none focus:ring-1 focus:ring-violet-500"
                            style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md"
                        >
                          Submit & Run Code Solutions
                        </button>
                      </form>
                    ) : (
                      <div className="p-8 border rounded-2xl text-center space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                        <h3 className="text-base font-bold">HackerRank Challenge Submitted!</h3>
                        <p className="text-xs text-zinc-400">Your compiler test passed with score: 100/100. Heatmap blocks updated.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Doubts Section */}
                {geminiTab === 'doubts' && (
                  <div className="space-y-6 text-left">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black heading-font">Doubts Resolution Board</h2>
                      <p className="text-xs text-zinc-400">Post queries to get responses from your mentor within 15 minutes.</p>
                    </div>

                    <div className="p-6 border rounded-2xl space-y-4" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black">Describe Your Doubt</label>
                        <textarea
                          placeholder="Type details about error stacks or architecture blocks here..."
                          rows={4}
                          className="w-full p-4 rounded-xl border text-xs font-medium focus:outline-none"
                          style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                        />
                      </div>
                      <button className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-violet-500 hover:bg-violet-600 transition-all shadow-md">
                        Post Doubt Ticket
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. Collaboration Rooms */}
                {geminiTab === 'collab' && (
                  <div className="space-y-6 text-left">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black heading-font">Live Peer Collaboration Rooms</h2>
                      <p className="text-xs text-zinc-400">Join active coding rooms with fellow cohort members.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "React Props Scalability Room", users: 4, desc: "Debugging state context loops." },
                        { title: "Distributed DBs Sharding design", users: 7, desc: "Working on DPP architecture graph diagrams." }
                      ].map((room, i) => (
                        <div key={i} className="p-5 border rounded-2xl space-y-4 flex flex-col justify-between" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                          <div className="space-y-2">
                            <h4 className="text-sm font-bold">{room.title}</h4>
                            <p className="text-[10px] text-zinc-400">{room.desc}</p>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: 'var(--border-soft)' }}>
                            <span className="text-[9px] font-bold text-emerald-500">{room.users} active members</span>
                            <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-all shadow-sm">
                              Join Room
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </section>
          </div>
        )}

        {/* TAB 4: MESSAGES (WHATSAPP/TELEGRAM LAYOUT) */}
        {activeTab === 'messages' && (
          <div className="flex flex-1 overflow-hidden h-[80vh] border rounded-3xl mt-4" style={{ borderColor: 'var(--border-soft)' }}>
            
            {/* THREADS LIST SIDEBAR */}
            <aside className="w-80 border-r flex flex-col shrink-0" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
              <div className="p-4 border-b space-y-3" style={{ borderColor: 'var(--border-soft)' }}>
                <h3 className="text-sm font-black heading-font">Conversations</h3>
                <p className="text-[10px] font-semibold text-zinc-500">Select group, mentor, or support support line.</p>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                {[
                  { id: 'group', name: 'Course Cohort Group', last: 'Priya Nair: Yes! Make sure the client...', time: '10:15 AM', type: 'Group' },
                  { id: 'faculty', name: 'Course Instructor / Faculty', last: 'Hello! Reviewed your routing...', time: 'Yesterday', type: 'Private' },
                  { id: 'admin', name: 'Platform Admin Help Desk', last: 'Your enrollment transaction...', time: '2 days ago', type: 'Support' },
                ].map((chat) => {
                  const isSelected = selectedChat === chat.id;
                  return (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id as any)}
                      className="w-full p-4 flex flex-col gap-1 border-b text-left transition-all hover:bg-zinc-850/5"
                      style={{
                        background: isSelected ? 'var(--bg-base)' : 'transparent',
                        borderColor: 'var(--border-soft)'
                      }}
                    >
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span style={{ color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{chat.name}</span>
                        <span className="text-[9px] text-zinc-500">{chat.time}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 line-clamp-1">{chat.last}</p>
                      <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-md border mt-1 w-max" style={{ borderColor: 'var(--border-soft)', color: 'var(--text-tertiary)' }}>
                        {chat.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* CHAT DISPLAY WORKSPACE */}
            <section className="flex-1 flex flex-col justify-between" style={{ background: 'var(--bg-base)' }}>
              
              {/* Thread Header */}
              <div className="p-4 border-b flex items-center justify-between" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black">
                    {selectedChat === 'group' ? 'Full Stack React & Next.js Cohort' : selectedChat === 'faculty' ? 'Instructor Direct Line' : 'Admin & Support Ticket'}
                  </h4>
                  <p className="text-[9px] text-zinc-500">
                    {selectedChat === 'group' ? 'Interactive Student Cohort Room' : 'Direct Conversation'}
                  </p>
                </div>
              </div>

              {/* Message bubbles log list */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 no-scrollbar">
                {chatMessages[selectedChat].map((msg, i) => {
                  const isSelf = msg.sender === 'student';
                  return (
                    <div 
                      key={i} 
                      className={`flex flex-col max-w-[70%] space-y-1 ${isSelf ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      {/* Optional group author label */}
                      {!isSelf && msg.authorName && (
                        <span className="text-[9px] font-bold text-violet-500">{msg.authorName}</span>
                      )}
                      
                      {/* Message Bubble box */}
                      <div 
                        className={`p-3.5 rounded-2xl text-xs font-medium shadow-sm leading-relaxed`}
                        style={{
                          background: isSelf ? 'var(--accent-primary)' : 'var(--bg-card)',
                          color: isSelf ? '#ffffff' : 'var(--text-primary)',
                          border: isSelf ? '0' : '1px solid var(--border-soft)',
                          borderRadius: isSelf ? '20px 20px 0 20px' : '20px 20px 20px 0'
                        }}
                      >
                        {msg.text}
                      </div>

                      <span className="text-[8px] text-zinc-500 font-bold">{msg.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* TextInput Send Action bar */}
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}>
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type message text here..."
                  className="flex-grow p-3 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-violet-500"
                  style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-violet-500 to-cyan-500 shadow-md hover:scale-[1.01]"
                >
                  Send
                </button>
              </form>

            </section>
          </div>
        )}

      </main>
    </div>
  );
}
