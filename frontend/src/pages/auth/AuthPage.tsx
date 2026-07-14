import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
          phone_number: phoneNumber 
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
    <div className="min-h-screen flex" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      
      {/* LEFT SPLIT-PANE: Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
        {/* Background Dot grid & Violet Orb overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--text-secondary) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 bg-gradient-to-br from-violet-600 to-cyan-500"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10 bg-gradient-to-tr from-cyan-600 to-violet-500"></div>

        {/* Branding Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 p-0.5">
            <div className="w-full h-full rounded-full" style={{ background: 'var(--bg-card)' }}></div>
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
        <div className="w-full max-w-md p-8 rounded-3xl glass flex flex-col space-y-6">
          
          {/* Header toggles */}
          {!showOtpScreen && (
            <div className="flex rounded-xl p-1" style={{ background: 'var(--bg-surface)' }}>
              <button 
                onClick={() => { setIsLogin(true); setValidationError(null); clearError(); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-md' : ''}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => { setIsLogin(false); setValidationError(null); clearError(); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-md' : ''}`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Form Prompts */}
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold tracking-tight">
              {showOtpScreen ? "Verify OTP" : isLogin ? "Welcome Back" : "Create Account"}
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {showOtpScreen 
                ? `Verification code sent to ${otpPendingEmail}`
                : isLogin 
                  ? "Enter your credentials to manage your dashboard" 
                  : "Onboard with email and complete OTP setup"}
            </p>
          </div>

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
                  className="w-full px-4 py-3 rounded-xl border text-center text-xl font-bold tracking-widest focus:outline-none transition-all"
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
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 shadow-lg transition-all"
              >
                {isLoading ? "Verifying..." : "Verify & Continue"}
              </button>
            </form>
          ) : (
            /* Login & Registration Form */
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                    style={{ 
                      borderColor: 'var(--border-med)', 
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ 
                    borderColor: 'var(--border-med)', 
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                    style={{ 
                      borderColor: 'var(--border-med)', 
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all"
                  style={{ 
                    borderColor: 'var(--border-med)', 
                    background: 'var(--bg-surface)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

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
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-500 to-cyan-500 hover:opacity-90 shadow-lg transition-all"
              >
                {isLoading ? "Loading..." : isLogin ? "Sign In to Account" : "Submit & Request OTP"}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
