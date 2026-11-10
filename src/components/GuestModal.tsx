import React from 'react';
import { X, ShieldCheck, Sparkles, Phone, Mail, ArrowRight } from 'lucide-react';

interface GuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueWithGoogle: () => void;
  onContinueWithPhone: () => void;
  onContinueWithEmail: () => void;
  actionTitle?: string;
  actionDescription?: string;
}

export const GuestModal: React.FC<GuestModalProps> = ({
  isOpen,
  onClose,
  onContinueWithGoogle,
  onContinueWithPhone,
  onContinueWithEmail,
  actionTitle = 'Join RentTruth AKS',
  actionDescription = 'To upload move-out photos, chat with tenants, or save properties, sign in with your phone or Google account in 10 seconds.',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-[#2F3626]/70 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#F7F2EB] rounded-t-3xl md:rounded-3xl shadow-2xl border border-[#EAE2D6] overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Decor */}
        <div className="relative bg-gradient-to-r from-[#8B9A6E] to-[#6D7C52] p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-2.5 shadow-md">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-heading font-extrabold text-xl text-white">
            {actionTitle}
          </h3>
          <p className="text-xs text-white/90 mt-1 max-w-xs mx-auto">
            {actionDescription}
          </p>
        </div>

        {/* Content & Sign in buttons */}
        <div className="p-6 space-y-3.5">
          {/* Trust Highlights */}
          <div className="bg-[#EAE2D6]/70 rounded-2xl p-3 flex items-center justify-around text-xs text-[#2F3626]">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[#8B9A6E]">✓</span> Verified Tenants
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[#8B9A6E]">✓</span> No Agent Spam
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="text-[#8B9A6E]">✓</span> 100% Free
            </div>
          </div>

          {/* Primary: Continue with Google */}
          <button
            onClick={onContinueWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-50 text-[#2F3626] font-bold py-3.5 px-4 rounded-2xl border border-[#D8CEBE] shadow-sm hover:shadow transition-all active:scale-98"
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

          {/* Secondary: Phone Number + OTP */}
          <button
            onClick={onContinueWithPhone}
            className="w-full flex items-center justify-center gap-3 bg-[#EAE2D6] hover:bg-[#D8CEBE] text-[#2F3626] font-bold py-3.5 px-4 rounded-2xl transition-all border border-[#D8CEBE] active:scale-98"
          >
            <Phone className="w-5 h-5 text-[#8B9A6E]" />
            <span>Continue with Phone (SMS OTP)</span>
          </button>

          {/* Tertiary: Email */}
          <button
            onClick={onContinueWithEmail}
            className="w-full text-center text-xs text-[#2F3626]/70 hover:text-[#2F3626] py-2 font-medium"
          >
            Or continue with email address
          </button>

          <p className="text-[11px] text-center text-[#2F3626]/60 leading-tight pt-1">
            By signing in, you agree to our{' '}
            <span className="underline cursor-pointer">Community Guidelines</span> and{' '}
            <span className="underline cursor-pointer">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
