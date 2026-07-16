import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AuthPage() {
  const { login, register, verifyOTP, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'phone'>('email');
  
  // OTP Phase States
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpPendingEmail, setOtpPendingEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/onboarding';

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();
    
    if (!email || !password) {
      setValidationError("Please fill in all required credentials.");
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await login({ email, password });
        navigate(from, { replace: true });
      } else {
        // Sign Up Flow
        await register({ 
          email, 
          password, 
          full_name: fullName, 
          phone_number: `${countryCode} ${phoneNumber}`
        });
        
        // Show OTP entry box on successful signup
        setOtpPendingEmail(email);
        setShowOtpScreen(true);
      }
    } catch (err) {
      // Errors handled by context, reset loading state
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    if (!otpCode) {
      setValidationError("Please enter the verification OTP code.");
      return;
    }

    setIsLoading(true);
    try {
      // Mock mode verify call using email and code
      await verifyOTP({ 
        idToken: "mock-token", 
        email: otpPendingEmail, 
        otp: otpCode 
      });
      navigate('/onboarding', { replace: true });
    } catch (err) {
      // Auth context errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex relative" style={{ background: 'transparent', color: 'var(--text-primary)' }}>
      
      {/* Absolute Breadcrumb path */}
      <div className="absolute top-6 left-8 flex items-center gap-1.5 text-xs font-semibold select-none z-50" style={{ color: 'var(--text-tertiary)' }}>
        <Link to="/" className="hover:text-violet-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>Home</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Auth</span>
      </div>

      {/* LEFT SPLIT-PANE: Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        {/* Background Dot grid & Violet Orb overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--text-secondary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 bg-gradient-to-br from-violet-600 to-cyan-500"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-cyan-600 to-violet-500"></div>

        {/* Branding Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center font-black text-white text-base tracking-tighter shadow-md">
            cs
          </div>
          <span className="font-bold text-2xl tracking-tight heading-font">CodersSpot</span>
        </div>

        {/* Shimmer Promo Message */}
        <div className="space-y-6 relative z-10 max-w-md">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight heading-font">
            Learn from engineers who have <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">shipped production code</span> at scale.
          </h2>
          <ul className="space-y-3 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Fully interactive video classrooms.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-violet-400"></span> Live project review cohorts.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Direct recruitment & verified credentials.
            </li>
          </ul>
        </div>

        {/* testimonial card */}
        <div className="p-6 rounded-2xl glass card-hover max-w-md relative z-10 space-y-3">
          <p className="text-sm font-medium italic" style={{ color: 'var(--text-secondary)' }}>
            "This platform gave me the modular understanding to shift from tutorial hell to building production scale APIs. I landed a senior role."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center font-bold text-xs">SK</div>
            <div>
              <h4 className="text-xs font-bold">Siddharth Kumar</h4>
              <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Backend Dev, Razorpay</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SPLIT-PANE: Interactive Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md p-8 rounded-3xl border flex flex-col space-y-6"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-soft)' }}
        >
          
          {/* Header toggles */}
          {!showOtpScreen && (
            <div className="flex rounded-xl p-1" style={{ background: 'var(--bg-surface)' }}>
              <button 
                onClick={() => { setIsLogin(true); setValidationError(null); clearError(); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-500'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setIsLogin(false); setValidationError(null); clearError(); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-500'}`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Form Prompts */}
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold tracking-tight">
              {showOtpScreen ? "Verify OTP" : isLogin ? "Welcome Back" : "Create an Account"}
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {showOtpScreen 
                ? `Verification code sent to ${otpPendingEmail}`
                : isLogin 
                  ? "Enter your credentials to manage your dashboard" 
                  : "Create an account to start your journey"}
            </p>
          </div>

          {/* Google Auth Button (Only visible on Sign Up) */}
          {!isLogin && !showOtpScreen && (
            <div className="space-y-4">
              <button
                type="button"
                className="w-full py-3 border rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-zinc-800 bg-white hover:bg-zinc-50 transition-all shadow-sm"
                style={{ borderColor: 'var(--border-soft)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <div className="flex items-center gap-3 text-xs font-semibold text-zinc-400">
                <div className="flex-grow h-px bg-zinc-200 dark:bg-zinc-800" />
                <span>Or choose a sign-in method</span>
                <div className="flex-grow h-px bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {(error || validationError) && (
            <div className="p-4 rounded-xl border border-red-500/20 text-xs font-bold text-red-500 flex flex-col space-y-1" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
              <span>{error || validationError}</span>
            </div>
          )}

          {/* Verification OTP screen */}
          {showOtpScreen ? (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="------"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-center text-xl font-bold tracking-widest focus:outline-none transition-all input-premium"
                  style={{ 
                    borderColor: 'var(--border-med)', 
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div className="p-3 rounded-xl text-[10px] text-center border font-semibold" style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}>
                💡 Testing Mode: Enter any 6-digit code (e.g., 123456) to proceed.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:scale-[1.01] shadow-lg transition-all"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </button>
            </form>
          ) : (
            /* Login & Registration Form */
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                    style={{ 
                      borderColor: 'var(--border-med)', 
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                  style={{ 
                    borderColor: 'var(--border-med)', 
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {!isLogin && (
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 px-3 rounded-xl border text-sm font-semibold select-none" style={{ borderColor: 'var(--border-med)', background: 'var(--bg-surface)' }}>
                      <span className="text-sm">🇮🇳</span>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-transparent focus:outline-none text-xs font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      placeholder="XXXXXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-grow px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                      style={{ 
                        borderColor: 'var(--border-med)', 
                        background: 'var(--bg-surface)',
                        color: 'var(--text-primary)'
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all input-premium"
                  style={{ 
                    borderColor: 'var(--border-med)', 
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {!isLogin && (
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Preferred Verification Method
                  </label>
                  <div className="flex gap-4 p-3.5 rounded-xl border" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface)' }}>
                    <label className="flex items-center gap-2 text-xs font-bold cursor-pointer select-none">
                      <input
                        type="radio"
                        name="verificationMethod"
                        checked={verificationMethod === 'email'}
                        onChange={() => setVerificationMethod('email')}
                        className="w-4 h-4 text-violet-500 border-gray-300 focus:ring-violet-400"
                      />
                      Verify Email
                    </label>
                    <label className="flex items-center gap-2 text-xs font-bold cursor-pointer select-none">
                      <input
                        type="radio"
                        name="verificationMethod"
                        checked={verificationMethod === 'phone'}
                        onChange={() => setVerificationMethod('phone')}
                        className="w-4 h-4 text-violet-500 border-gray-300 focus:ring-violet-400"
                      />
                      Verify Phone Number
                    </label>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="p-3 rounded-xl text-[10px] border font-semibold space-y-1" style={{ background: 'var(--bg-base)', borderColor: 'var(--border-soft)', color: 'var(--text-secondary)' }}>
                  🔑 Local Test Account:
                  <div className="flex justify-between font-bold text-xs" style={{ color: 'var(--text-primary)' }}>
                    <span>Email: codersspot97@gmail.com</span>
                    <span>Pass: AdminPassword123!</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-[#6366F1] hover:bg-[#5558e6] shadow-md transition-all text-sm font-black"
              >
                {isLoading ? "Loading..." : isLogin ? "Sign In to Account" : "Create Account"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
