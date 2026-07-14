import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  // Force dark class on initial load for preview
  if (darkMode && !document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <div className="w-full max-w-lg rounded-3xl p-8 glass card-hover flex flex-col items-center text-center space-y-6">
        {/* Branding Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 p-0.5">
            <div className="w-full h-full rounded-full" style={{ background: 'var(--bg-card)' }}></div>
          </div>
          <span className="font-bold text-2xl tracking-tight">CodersSpot</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
            React + Django LMS
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Workspace initialization complete. Framework layers loaded successfully.
          </p>
        </div>

        {/* Action Widgets */}
        <div className="flex gap-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all border"
            style={{ 
              borderColor: 'var(--border-med)', 
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)'
            }}
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
          
          <a
            href="https://github.com/Sanskar-25may/codersspot"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 transition-all shadow-lg"
          >
            View GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
