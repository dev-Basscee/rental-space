import React, { useState } from 'react';
import { X, Building2, UploadCloud, CheckCircle2, ShieldCheck, MapPin, DollarSign, Phone, MessageSquare } from 'lucide-react';
import { Property, SpaceCategory } from '../types';

interface PostSpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onOpenSignIn: () => void;
  onSaveSpace: (space: Property) => void;
  currentUser?: any;
}

export const PostSpaceModal: React.FC<PostSpaceModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onOpenSignIn,
  onSaveSpace,
  currentUser,
}) => {
  const [category, setCategory] = useState<SpaceCategory>('Apartment / Flat');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Shelter Afrique');
  const [priceNaira, setPriceNaira] = useState('');
  const [rentPeriod, setRentPeriod] = useState<'Per Year' | 'Per Month' | 'Per Day' | 'Per Event'>('Per Year');
  const [contactName, setContactName] = useState(currentUser?.name || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '+234 ');
  const [contactWhatsApp, setContactWhatsApp] = useState('');
  const [contactRole, setContactRole] = useState<'Landlord' | 'Direct Agent' | 'Space Host / Manager'>('Landlord');
  const [directNotice, setDirectNotice] = useState('Direct deal. Daytime physical inspection welcomed before payment.');
  const [photoUrl, setPhotoUrl] = useState('');
  const [floodRisk, setFloodRisk] = useState<'Low' | 'Moderate' | 'High'>('Low');
  const [waterSupply, setWaterSupply] = useState<'24/7 Clean Borehole' | 'Seasonal' | 'Poor'>('24/7 Clean Borehole');
  const [powerGrade, setPowerGrade] = useState<'Grade A (18-22h/day)' | 'Grade B (12-16h/day)' | 'Grade C (<8h/day)'>('Grade A (18-22h/day)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // If user is not logged in, prompt host account registration
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div
          className="w-full max-w-md bg-[#F7F2EB] rounded-3xl shadow-2xl border border-[#EAE2D6] p-6 text-center space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#8B9A6E] text-white flex items-center justify-center mx-auto shadow-md">
            <Building2 className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#8B9A6E] uppercase tracking-wider bg-[#8B9A6E]/15 px-2.5 py-0.5 rounded-full">
              Host Account Required
            </span>
            <h3 className="font-heading font-extrabold text-xl text-[#2F3626] mt-2">
              List Your Space on RentTruth AKS
            </h3>
            <p className="text-xs text-[#2F3626]/75 mt-1 leading-relaxed">
              To list an apartment, retail store, student room, event hall, or office and receive direct calls & WhatsApp inquiries from verified renters, please sign in or create your free Host Account.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#EAE2D6] text-left text-xs space-y-1.5 text-[#2F3626]/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0" />
              <span>Direct calls & WhatsApp chats from interested renters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0" />
              <span>Zero platform fees — you keep 100% of your rent</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0" />
              <span>Guest visitors can browse and drop reviews freely</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onClose();
                onOpenSignIn();
              }}
              className="w-full py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Sign In / Create Host Account
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-[#EAE2D6] text-[#2F3626] font-semibold text-xs border border-[#D8CEBE] transition-colors cursor-pointer"
            >
              Cancel & Continue as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !address.trim() || !priceNaira) return;

    const defaultImage =
      category === 'Store / Retail Shop'
        ? 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80'
        : category === 'Event Center / Hall'
        ? 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80'
        : category === 'Office / Co-Working'
        ? 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80'
        : category === 'Single Room / Student Lodge'
        ? 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80'
        : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80';

    const cleanImg = photoUrl.trim() || defaultImage;

    const newSpace: Property = {
      id: `space-user-${Date.now()}`,
      title: title.trim(),
      address: address.trim(),
      area,
      coordinates: { lat: 5.0378, lng: 7.9152 },
      spaceCategory: category,
      propertyType: category,
      rentPeriod,
      coverPhoto: cleanImg,
      allPhotos: [cleanImg],
      averageRating: 5.0,
      totalReviews: 0,
      currentRentNaira: parseInt(priceNaira, 10) || 300000,
      rentHistory: [{ year: '2026', rent: parseInt(priceNaira, 10) || 300000 }],
      ratings: {
        water: 4.5,
        light: 4.5,
        security: 4.5,
        drainage: 4.5,
        neighbours: 4.5,
        landlord: 5.0,
        valueForMoney: 4.8,
        agentHonesty: 5.0,
      },
      floodRisk,
      waterReliability: waterSupply,
      powerGrade,
      securityLevel: 'Gated + Vigilante',
      landlordName: contactName || 'Space Host',
      isVerifiedListing: true,
      scamReportsCount: 0,
      saved: false,
      contactName: contactName || 'Space Host',
      contactPhone: contactPhone || '+234 800 000 0000',
      contactWhatsApp: contactWhatsApp || contactPhone.replace(/\s+/g, ''),
      contactRole,
      directDealNotice: directNotice,
      postedByUserId: currentUser?.id || 'host-1',
    };

    onSaveSpace(newSpace);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#F7F2EB] rounded-3xl shadow-2xl border border-[#EAE2D6] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2F3626] text-[#F7F2EB] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E] flex items-center justify-center text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white">
                  Post a Space for Rent
                </h3>
                <span className="bg-[#8B9A6E]/30 text-[#A7B68B] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  Host Portal
                </span>
              </div>
              <p className="text-xs text-[#EAE2D6]/70">
                List houses, stores, student rooms, event halls, or offices in Uyo.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#8B9A6E] text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-lg text-[#2F3626]">
              Space Listed Successfully!
            </h4>
            <p className="text-xs text-[#2F3626]/75 max-w-sm mx-auto">
              Your listing is now live in the Uyo rental directory. Prospective renters can reach you directly via phone and WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            {/* Space Category Buttons */}
            <div>
              <label className="block text-xs font-bold text-[#2F3626] mb-2">
                Space Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'Apartment / Flat', label: '🏠 Apartment / Flat' },
                  { id: 'Store / Retail Shop', label: '🏪 Store / Retail Shop' },
                  { id: 'Single Room / Student Lodge', label: '🚪 Single Room' },
                  { id: 'Event Center / Hall', label: '🎪 Event Hall / Garden' },
                  { id: 'Office / Co-Working', label: '🏢 Office Space' },
                  { id: 'Warehouse / Storage', label: '📦 Warehouse / Yard' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as SpaceCategory)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                      category === cat.id
                        ? 'bg-[#8B9A6E] text-white border-[#8B9A6E] shadow-sm'
                        : 'bg-white text-[#2F3626] border-[#D8CEBE] hover:bg-[#EAE2D6]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#2F3626] mb-1">
                  Listing Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tiled Roadside Lock-up Shop with Pre-paid Meter"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D8CEBE] text-xs focus:ring-2 focus:ring-[#8B9A6E] outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F3626] mb-1">
                  Exact Address & Landmark *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14 Aka Road, Near Ibom Plaza"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8CEBE] text-xs focus:ring-2 focus:ring-[#8B9A6E] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F3626] mb-1">
                  Uyo Area / Estate *
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8CEBE] text-xs focus:ring-2 focus:ring-[#8B9A6E] outline-none"
                >
                  <option value="Shelter Afrique">Shelter Afrique</option>
                  <option value="Ewet Housing">Ewet Housing</option>
                  <option value="Aka Road">Aka Road (Commercial)</option>
                  <option value="Ikot Ekpene Road">Ikot Ekpene Road</option>
                  <option value="Abak Road">Abak Road</option>
                  <option value="Use Offot">Use Offot (Uniuyo Perm Site)</option>
                  <option value="Ikpa Road">Ikpa Road (Town Campus)</option>
                  <option value="Edet Akpan (Four Lanes)">Edet Akpan (Four Lanes)</option>
                  <option value="Osongama">Osongama Estate</option>
                </select>
              </div>
            </div>

            {/* Price & Billing Cycle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-2xl border border-[#EAE2D6]">
              <div>
                <label className="block text-xs font-bold text-[#2F3626] mb-1">
                  Rent Amount (₦ Naira) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 450000"
                  value={priceNaira}
                  onChange={(e) => setPriceNaira(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-bold focus:ring-2 focus:ring-[#8B9A6E] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F3626] mb-1">
                  Rent Frequency / Billing Cycle *
                </label>
                <select
                  value={rentPeriod}
                  onChange={(e) => setRentPeriod(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-semibold focus:ring-2 focus:ring-[#8B9A6E] outline-none"
                >
                  <option value="Per Year">Per Year (Annual Rent)</option>
                  <option value="Per Month">Per Month (Offices / Lodges)</option>
                  <option value="Per Day">Per Day (Event Halls / Pop-ups)</option>
                  <option value="Per Event">Per Event (Weddings / Programs)</option>
                </select>
              </div>
            </div>

            {/* Host Direct Contact Information */}
            <div className="bg-white p-4 rounded-2xl border border-[#EAE2D6] space-y-3">
              <span className="text-xs font-bold text-[#2F3626] block border-b border-[#EAE2D6] pb-1.5">
                📞 Direct Contact Details (Renters will call you directly)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#2F3626] mb-1">
                    Your Name / Org
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Elder Bassey Udom"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#2F3626] mb-1">
                    Phone Number (Direct Call)
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 803 000 0000"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#2F3626] mb-1">
                    Your Role
                  </label>
                  <select
                    value={contactRole}
                    onChange={(e) => setContactRole(e.target.value as any)}
                    className="w-full px-3 py-1.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                  >
                    <option value="Landlord">Direct Landlord / Owner</option>
                    <option value="Direct Agent">Direct Agent</option>
                    <option value="Space Host / Manager">Space Host / Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#2F3626] mb-1">
                  Inspection & Safety Note for Renters
                </label>
                <input
                  type="text"
                  placeholder="e.g. Inspect daytime. Keys handed immediately upon direct landlord agreement."
                  value={directNotice}
                  onChange={(e) => setDirectNotice(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                />
              </div>
            </div>

            {/* Optional Photo URL */}
            <div>
              <label className="block text-xs font-bold text-[#2F3626] mb-1">
                Cover Photo URL (Optional - default image will be assigned if empty)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8CEBE] text-xs focus:ring-2 focus:ring-[#8B9A6E] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Publish Space to Directory</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
