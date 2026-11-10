import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  ShieldCheck,
  Send
} from 'lucide-react';

interface FaqHelpProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const FaqHelp: React.FC<FaqHelpProps> = ({ onNavigate }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketBody, setTicketBody] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const faqItems = [
    {
      q: 'How does RentTruth AKS verify that photos are from the real house?',
      a: 'When you take or upload photos during the Move-Out flow, our platform reads embedded EXIF metadata (GPS coordinates and camera timestamp). If your phone geotag matches the property address in Uyo, your review receives the green "Verified Tenant" badge.',
    },
    {
      q: 'Can a landlord sue me for posting an honest review?',
      a: 'Under Nigerian law, truthful statements of fact and honest opinions backed by tangible evidence (such as photos of a flooded compound or receipts showing an unreturned caution deposit) do not constitute defamation. We also provide pseudonymous posting so your legal name is shielded.',
    },
    {
      q: 'I am a landlord in Uyo. How do I reply to a tenant review?',
      a: 'Simply tap "Claim Property / Reply as Landlord" on the property page. Upload proof of ownership (C of O, power bill, or deed). Once verified, your official response and any repair updates will appear with a verified checkmark.',
    },
    {
      q: 'How does the Airtime / Data reward system work?',
      a: 'For each verified move-out review with at least 4 photos, you earn 150 points. You can redeem 100 points for ₦500 airtime or 200 points for ₦1,000 airtime on MTN, Airtel, or Glo instantly.',
    },
    {
      q: 'What should I do if an agent in Uyo demands an inspection fee?',
      a: 'Reputable agents verified on RentTruth AKS agree to either zero inspection fee or a nominal transport assistance of ₦1,000 to ₦1,500. If an agent demands ₦5,000 or more, search their phone number on our Scam Check page immediately.',
    },
  ];

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketSubject && ticketBody) {
      setTicketSent(true);
      setTicketSubject('');
      setTicketBody('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
            Help & Support Desk
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75 max-w-lg mx-auto">
            Everything you need to know about reviewing homes and staying safe in Uyo.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#EAE2D6] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#2F3626] flex items-center justify-between gap-4"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8B9A6E] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#2F3626]/80 leading-relaxed border-t border-[#EAE2D6]/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Desk / Dispute Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E]/15 text-[#8B9A6E] flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-[#2F3626]">
                Need to Dispute a Review or Contact Support?
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Our Uyo moderation team responds to inquiries within 24 hours.
              </p>
            </div>
          </div>

          {ticketSent ? (
            <div className="p-4 rounded-2xl bg-[#F2F6ED] border border-[#8B9A6E] text-xs text-[#6D7C52] space-y-1">
              <span className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Message Sent Successfully!
              </span>
              <p>Ticket reference #UYO-{Math.floor(Math.random() * 90000 + 10000)} generated. Check your email or phone for response.</p>
            </div>
          ) : (
            <form onSubmit={handleSendTicket} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">Topic / Issue</label>
                <input
                  type="text"
                  placeholder="e.g. Disputing an unverified review for Shelter Afrique flat"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">Details & Your Phone</label>
                <textarea
                  rows={3}
                  placeholder="Provide context, address in Uyo, and your contact phone number..."
                  value={ticketBody}
                  onChange={(e) => setTicketBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </form>
          )}

          <div className="pt-3 border-t border-[#EAE2D6] flex flex-wrap items-center justify-between gap-3 text-xs text-[#2F3626]/70">
            <span>📍 Physical desk: Ibom Plaza Commercial Layout, Uyo</span>
            <span>📞 Help line: +234 803 000 7890</span>
          </div>
        </div>

      </div>
    </div>
  );
};
