import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  X,
  User,
  Building,
  KeyRound,
  Sparkles,
  Lock,
  ChevronLeft
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthScreensProps {
  initialSubScreen?: 'sign_in' | 'otp_verification' | 'onboarding' | 'guest_prompt' | 'recovery';
  onNavigate: (screen: string, param?: string) => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const AuthScreens: React.FC<AuthScreensProps> = ({
  initialSubScreen = 'sign_in',
  onNavigate,
  onLoginSuccess,
}) => {
  const [subScreen, setSubScreen] = useState(initialSubScreen);
  
  // Auth state
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('0803 456 7890');
  const [emailAddress, setEmailAddress] = useState('bassey.etim@gmail.com');
  const [otpCode, setOtpCode] = useState(['5', '8', '2', '4', '1', '9']);
  const [resendTimer, setResendTimer] = useState(45);

  // Onboarding state
  const [selectedRole, setSelectedRole] = useState<UserRole>('tenant');
  const [displayName, setDisplayName] = useState('Bassey Etim');
  const [locationInUyo, setLocationInUyo] = useState('Ewet Housing Estate');

  // OTP Countdown timer
  useEffect(() => {
    let interval: any;
    if (subScreen === 'otp_verification' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [subScreen, resendTimer]);

  const handleStartPhoneAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setSubScreen('otp_verification');
    setResendTimer(45);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setSubScreen('onboarding');
  };

  const handleCompleteOnboarding = () => {
    onLoginSuccess(selectedRole);
    onNavigate('feed');
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] flex items-center justify-center p-4 pb-24 md:pb-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#EAE2D6] shadow-xl overflow-hidden">
        
        {/* Top Decorative Header */}
        <div className="bg-gradient-to-br from-[#8B9A6E] to-[#6D7C52] p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-2 shadow-inner">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white">
            RentTruth AKS
          </h2>
          <p className="text-xs text-white/90 mt-0.5">
            Akwa Ibom Rental Review & Scam Check
          </p>

          {/* Subscreen quick navigation tabs for developer/user review */}
          <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-white/20 flex-wrap">
            <button
              onClick={() => setSubScreen('sign_in')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                subScreen === 'sign_in' ? 'bg-white text-[#2F3626]' : 'text-white/80 hover:text-white'
              }`}
            >
              16. Sign In
            </button>
            <button
              onClick={() => setSubScreen('otp_verification')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                subScreen === 'otp_verification' ? 'bg-white text-[#2F3626]' : 'text-white/80 hover:text-white'
              }`}
            >
              17. OTP
            </button>
            <button
              onClick={() => setSubScreen('onboarding')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                subScreen === 'onboarding' ? 'bg-white text-[#2F3626]' : 'text-white/80 hover:text-white'
              }`}
            >
              18. Onboarding
            </button>
            <button
              onClick={() => setSubScreen('guest_prompt')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                subScreen === 'guest_prompt' ? 'bg-white text-[#2F3626]' : 'text-white/80 hover:text-white'
              }`}
            >
              19. Prompt
            </button>
            <button
              onClick={() => setSubScreen('recovery')}
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                subScreen === 'recovery' ? 'bg-white text-[#2F3626]' : 'text-white/80 hover:text-white'
              }`}
            >
              20. Recovery
            </button>
          </div>
        </div>

        {/* ---------------- SCREEN 16: SIGN IN / SIGN UP ---------------- */}
        {subScreen === 'sign_in' && (
          <div className="p-6 space-y-4">
            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#2F3626]">
                Welcome to the Community
              </h3>
              <p className="text-xs text-[#2F3626]/70">
                Sign in to post unedited reviews, chat with tenants, or report fake agents.
              </p>
            </div>

            {/* Google One-Tap Primary */}
            <button
              onClick={() => {
                onLoginSuccess('tenant');
                onNavigate('feed');
              }}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 text-[#2F3626] font-bold py-3.5 px-4 rounded-2xl border border-[#D8CEBE] shadow-xs hover:shadow transition-all text-xs sm:text-sm active:scale-98"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="h-px bg-[#EAE2D6] flex-1" />
              <span className="text-[11px] font-semibold text-[#2F3626]/50 uppercase tracking-wider">
                Or with Nigerian Phone
              </span>
              <div className="h-px bg-[#EAE2D6] flex-1" />
            </div>

            {/* Phone Number Input Form */}
            <form onSubmit={handleStartPhoneAuth} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#2F3626] block mb-1">
                  Nigerian Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-[#D8CEBE] bg-[#EAE2D6] text-xs font-bold text-[#2F3626]">
                    🇳🇬 +234
                  </span>
                  <input
                    type="tel"
                    placeholder="803 123 4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 px-3.5 py-3 rounded-r-2xl border border-[#D8CEBE] bg-[#F7F2EB] text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send 6-Digit SMS Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center text-xs">
              <button
                onClick={() => setSubScreen('recovery')}
                className="text-[#8B9A6E] font-medium hover:underline"
              >
                Having trouble signing in? Recover account
              </button>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 17: PHONE OTP VERIFICATION ---------------- */}
        {subScreen === 'otp_verification' && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSubScreen('sign_in')}
                className="text-xs text-[#8B9A6E] font-bold flex items-center gap-1 hover:underline"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <span className="text-xs text-[#2F3626]/60">Step 2 of 3</span>
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#2F3626]">
                Verify Your Phone Number
              </h3>
              <p className="text-xs text-[#2F3626]/70">
                We sent a 6-digit code via SMS to{' '}
                <strong className="text-[#2F3626]">+234 {phoneNumber}</strong>
              </p>
            </div>

            {/* 6 Digit Box Inputs */}
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otpCode];
                      next[idx] = e.target.value;
                      setOtpCode(next);
                    }}
                    className="w-11 h-13 text-center text-xl font-bold font-mono rounded-xl border border-[#D8CEBE] bg-[#F7F2EB] text-[#2F3626] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow transition-all cursor-pointer"
              >
                Confirm Code & Proceed
              </button>
            </form>

            {/* Resend timer */}
            <div className="text-center text-xs text-[#2F3626]/70">
              {resendTimer > 0 ? (
                <span>Resend SMS code in {resendTimer}s</span>
              ) : (
                <button
                  onClick={() => setResendTimer(45)}
                  className="font-bold text-[#8B9A6E] hover:underline"
                >
                  Resend SMS OTP Now
                </button>
              )}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 18: ONBOARDING & ROLE SELECTION ---------------- */}
        {subScreen === 'onboarding' && (
          <div className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#2F3626]">
                Select Your Role in Uyo
              </h3>
              <p className="text-xs text-[#2F3626]/70">
                Helps us personalize your RentTruth experience.
              </p>
            </div>

            {/* Role Options */}
            <div className="space-y-2.5">
              {[
                {
                  role: 'tenant' as UserRole,
                  title: 'Outgoing Tenant',
                  desc: 'Packing out or recently moved. I want to post honest reviews and earn airtime.',
                  icon: '📦',
                },
                {
                  role: 'house_hunter' as UserRole,
                  title: 'House Hunter / Student',
                  desc: 'Looking for a flat in Uyo. I want to avoid scams and inspect unvarnished photos.',
                  icon: '🔍',
                },
                {
                  role: 'agent' as UserRole,
                  title: 'Real Estate Agent',
                  desc: 'Licensed or honest agent. I want to earn the Verified Agent badge.',
                  icon: '🤝',
                },
                {
                  role: 'landlord' as UserRole,
                  title: 'Landlord / Property Owner',
                  desc: 'I own property in Akwa Ibom and want good tenants and Right of Reply.',
                  icon: '🏠',
                },
              ].map((item) => (
                <div
                  key={item.role}
                  onClick={() => setSelectedRole(item.role)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    selectedRole === item.role
                      ? 'border-[#8B9A6E] bg-[#F2F6ED] shadow-sm'
                      : 'border-[#EAE2D6] bg-white hover:bg-[#F7F2EB]'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#2F3626]">{item.title}</p>
                    <p className="text-[11px] text-[#2F3626]/70 leading-tight mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  {selectedRole === item.role && (
                    <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
                  )}
                </div>
              ))}
            </div>

            {/* Display Name Input */}
            <div>
              <label className="text-xs font-bold text-[#2F3626] block mb-1">
                Display Name (Alias permitted)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] bg-[#F7F2EB] text-xs text-[#2F3626] font-medium focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
            </div>

            <button
              onClick={handleCompleteOnboarding}
              className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow transition-all cursor-pointer"
            >
              Complete Setup & Enter Platform
            </button>
          </div>
        )}

        {/* ---------------- SCREEN 19: GUEST SIGN-UP PROMPT ---------------- */}
        {subScreen === 'guest_prompt' && (
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-[#EAE2D6]/50 border border-[#D8CEBE] text-center space-y-2">
              <span className="text-3xl">🔒</span>
              <h3 className="font-heading font-bold text-base text-[#2F3626]">
                Account Required to Post Reviews or Chat
              </h3>
              <p className="text-xs text-[#2F3626]/75">
                We protect our community by ensuring every reviewer is a verified human with an active phone or Google account.
              </p>
            </div>

            <button
              onClick={() => {
                onLoginSuccess('tenant');
                onNavigate('feed');
              }}
              className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow transition-all"
            >
              Create Free Account (10 seconds)
            </button>

            <button
              onClick={() => onNavigate('feed')}
              className="w-full py-2.5 text-xs text-[#2F3626]/70 hover:text-[#2F3626] font-semibold"
            >
              Continue Browsing as Guest
            </button>
          </div>
        )}

        {/* ---------------- SCREEN 20: FORGOT PASSWORD / RECOVERY ---------------- */}
        {subScreen === 'recovery' && (
          <div className="p-6 space-y-4">
            <button
              onClick={() => setSubScreen('sign_in')}
              className="text-xs text-[#8B9A6E] font-bold flex items-center gap-1 hover:underline"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Sign In
            </button>

            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#2F3626]">
                Recover Your Account
              </h3>
              <p className="text-xs text-[#2F3626]/70">
                Enter your registered Nigerian phone number or email to receive a recovery link.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#2F3626] block mb-1">
                  Registered Phone or Email
                </label>
                <input
                  type="text"
                  placeholder="e.g. 0803 456 7890 or your@email.com"
                  defaultValue="0803 456 7890"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBE] bg-[#F7F2EB] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                />
              </div>

              <button
                onClick={() => setSubScreen('otp_verification')}
                className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs shadow transition-all"
              >
                Send Recovery OTP Code
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
