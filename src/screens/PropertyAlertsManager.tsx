import React, { useState } from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Power,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronLeft,
  X,
  Send,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { PropertyAlertSubscription } from '../types';
import { MOCK_ALERT_SUBSCRIPTIONS } from '../data/mockData';

interface PropertyAlertsManagerProps {
  onNavigate: (screen: string, param?: string) => void;
  onOpenCreateAlertModal: (criteria?: any) => void;
  onTriggerSimulationAlert: (sub: PropertyAlertSubscription) => void;
  subscriptions: PropertyAlertSubscription[];
  onToggleActive: (id: string) => void;
  onDeleteSubscription: (id: string) => void;
}

export const PropertyAlertsManager: React.FC<PropertyAlertsManagerProps> = ({
  onNavigate,
  onOpenCreateAlertModal,
  onTriggerSimulationAlert,
  subscriptions,
  onToggleActive,
  onDeleteSubscription,
}) => {
  const [selectedEmailPreview, setSelectedEmailPreview] = useState<PropertyAlertSubscription | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('search')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#8B9A6E] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Search & Results</span>
          </button>

          <span className="text-xs text-[#2F3626]/60 font-medium">
            {subscriptions.filter((s) => s.active).length} Active Subscriptions
          </span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B9A6E] to-[#6D7C52] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
              <Bell className="w-4 h-4 text-[#F3CD6D]" />
              <span>Instant Uyo Listing Radar</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Property Alert Subscriptions
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-lg leading-relaxed">
              Never miss a genuine flat in Uyo. We check verified landlord posts and outgoing tenant reviews 24/7 and notify you instantly.
            </p>
          </div>

          <button
            onClick={() => onOpenCreateAlertModal()}
            className="px-5 py-3.5 rounded-2xl bg-white text-[#2F3626] font-bold text-xs shadow-md hover:bg-[#F7F2EB] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#8B9A6E]" />
            <span>Create New Alert</span>
          </button>
        </div>

        {/* Live Simulation Banner */}
        <div className="p-4 rounded-3xl bg-[#EAE2D6] border border-[#D8CEBE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#F3CD6D]" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-[#2F3626]">
                Interactive Match Testing Simulation
              </h3>
              <p className="text-[11px] text-[#2F3626]/75">
                Simulate what happens when a verified property is posted in Shelter Afrique under ₦850k.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (subscriptions.length > 0) {
                onTriggerSimulationAlert(subscriptions[0]);
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-[#2F3626] hover:bg-black text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
          >
            <span>⚡ Fire Test Alert Now</span>
          </button>
        </div>

        {/* Active Alert Subscriptions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-[#2F3626]">
              Your Subscribed Alerts ({subscriptions.length})
            </h2>
            <span className="text-xs text-[#2F3626]/60">
              Push, Email & WhatsApp enabled
            </span>
          </div>

          {subscriptions.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-[#EAE2D6] text-center space-y-3">
              <Bell className="w-10 h-10 text-[#8B9A6E]/50 mx-auto" />
              <h3 className="font-bold text-base text-[#2F3626]">No Active Property Alerts</h3>
              <p className="text-xs text-[#2F3626]/70 max-w-sm mx-auto">
                Set up an alert for Shelter Afrique, Ewet Housing, or your budget to be the first to know when flats are listed.
              </p>
              <button
                onClick={() => onOpenCreateAlertModal()}
                className="px-5 py-2.5 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow"
              >
                + Create Your First Alert
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-xs ${
                    sub.active
                      ? 'border-[#EAE2D6] hover:border-[#8B9A6E]'
                      : 'border-[#EEEEEE] opacity-60 bg-[#F7F2EB]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                          sub.active ? 'bg-[#8B9A6E]/15 text-[#8B9A6E]' : 'bg-[#EEEEEE] text-[#2F3626]/40'
                        }`}
                      >
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-heading font-extrabold text-base text-[#2F3626]">
                            {sub.name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sub.active
                                ? 'bg-[#8B9A6E]/15 text-[#6D7C52]'
                                : 'bg-[#EEEEEE] text-[#2F3626]/60'
                            }`}
                          >
                            {sub.active ? '● Active' : '○ Paused'}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#2F3626]/60">
                          Created {sub.createdAt} • Frequency: {sub.frequency === 'instant' ? 'Instant' : 'Daily Digest'}
                        </span>
                      </div>
                    </div>

                    {/* Quick controls: Pause/Resume, Preview, Delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => setSelectedEmailPreview(sub)}
                        className="px-3 py-1.5 rounded-xl bg-[#F7F2EB] hover:bg-[#EAE2D6] text-xs font-semibold text-[#2F3626] transition-colors flex items-center gap-1"
                        title="Preview Email Alert Card"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8B9A6E]" />
                        <span className="hidden sm:inline">Preview Email</span>
                      </button>

                      <button
                        onClick={() => onToggleActive(sub.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          sub.active
                            ? 'bg-[#8B9A6E]/15 text-[#8B9A6E] hover:bg-[#8B9A6E]/30'
                            : 'bg-[#EEEEEE] text-[#2F3626]/60 hover:bg-[#EAE2D6]'
                        }`}
                        title={sub.active ? 'Pause Alert' : 'Resume Alert'}
                      >
                        <Power className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteSubscription(sub.id)}
                        className="p-2 rounded-xl bg-white text-[#C4684A] hover:bg-[#C4684A]/10 transition-colors"
                        title="Delete Subscription"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Criteria Tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-xl bg-[#F7F2EB] border border-[#EAE2D6] text-[#2F3626] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8B9A6E]" />
                      <span>{sub.location}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-[#F7F2EB] border border-[#EAE2D6] text-[#2F3626] font-medium">
                      {sub.propertyType}
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-[#F7F2EB] border border-[#EAE2D6] text-[#8B9A6E] font-bold">
                      Max: ₦{(sub.maxPriceNaira / 1000).toLocaleString()}k
                    </span>
                    {sub.onlyVerifiedListings && (
                      <span className="px-2.5 py-1 rounded-xl bg-[#8B9A6E]/15 text-[#6D7C52] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Title Only</span>
                      </span>
                    )}
                    {sub.minRating > 0 && (
                      <span className="px-2.5 py-1 rounded-xl bg-[#F7F2EB] border border-[#EAE2D6] text-[#2F3626] font-semibold">
                        ⭐ {sub.minRating}+ Stars
                      </span>
                    )}
                  </div>

                  {/* Delivery Channels Status Strip */}
                  <div className="pt-3 border-t border-[#EAE2D6] flex flex-wrap items-center justify-between text-xs text-[#2F3626]/75 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-[#2F3626]">Delivered to:</span>
                      {sub.channels.push && (
                        <span className="flex items-center gap-1 font-medium text-[#8B9A6E]">
                          <Smartphone className="w-3.5 h-3.5" /> Push
                        </span>
                      )}
                      {sub.channels.email && (
                        <span className="flex items-center gap-1 font-medium text-[#8B9A6E]">
                          <Mail className="w-3.5 h-3.5" /> Email ({sub.emailAddress?.split('@')[0]}...)
                        </span>
                      )}
                      {sub.channels.whatsapp && (
                        <span className="flex items-center gap-1 font-medium text-[#8B9A6E]">
                          <Send className="w-3.5 h-3.5" /> WhatsApp
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onNavigate('search')}
                      className="text-[#8B9A6E] font-bold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <span>View Current Matches ({sub.matchCount})</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- SIMULATED EMAIL PREVIEW DRAWER ---------------- */}
        {selectedEmailPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
              className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#D8CEBE] overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#2F3626] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8B9A6E]" />
                  <span className="font-bold text-xs font-mono">
                    EMAIL PREVIEW: RentTruth AKS Alert
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEmailPreview(null)}
                  className="p-1 rounded-full text-white/70 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Email Content Simulation */}
              <div className="p-6 overflow-y-auto space-y-4 bg-[#F7F2EB] text-xs">
                {/* Email Header */}
                <div className="bg-white p-4 rounded-2xl border border-[#EAE2D6] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#EAE2D6] pb-2 text-[11px] text-[#2F3626]/70">
                    <span>From: <strong>alerts@renttruth-aks.ng</strong></span>
                    <span>To: <strong>{selectedEmailPreview.emailAddress || 'bassey.etim@gmail.com'}</strong></span>
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-[#2F3626]">
                    🔔 New Match for "{selectedEmailPreview.name}"
                  </h3>
                  <p className="text-[#2F3626]/80 leading-relaxed">
                    A newly inspected 2-bedroom flat has just been verified in <strong>{selectedEmailPreview.location}</strong> matching your maximum rent budget.
                  </p>
                </div>

                {/* Property Card Inside Email */}
                <div className="bg-white p-4 rounded-2xl border border-[#8B9A6E] shadow-sm space-y-3">
                  <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
                    alt="Shelter Afrique Flat"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded-md bg-[#8B9A6E] text-white text-[10px] font-bold">
                      Verified Title • 4 Tenant Reviews
                    </span>
                    <h4 className="font-heading font-bold text-sm text-[#2F3626]">
                      Modern 2-Bedroom Flat in Fenced Compound
                    </h4>
                    <p className="text-[11px] text-[#2F3626]/70">
                      Plot 14, Unit C, Shelter Afrique Estate, Uyo
                    </p>
                    <p className="font-heading font-extrabold text-sm text-[#8B9A6E]">
                      ₦850,000 / year • Borehole water running 24/7
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedEmailPreview(null);
                      onNavigate('property_detail', 'prop-1');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#8B9A6E] text-white font-bold text-xs hover:bg-[#6D7C52] transition-colors"
                  >
                    View Unedited Move-Out Photos on RentTruth →
                  </button>
                </div>

                {/* Email Footer */}
                <div className="text-center text-[10px] text-[#2F3626]/60 pt-2">
                  <p>RentTruth AKS • Akwa Ibom State Housing Defense</p>
                  <p>You received this because you subscribed to {selectedEmailPreview.name}.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
