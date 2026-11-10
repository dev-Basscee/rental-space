import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Map,
  List,
  CheckCircle2,
  AlertCircle,
  SlidersHorizontal,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  Bell,
  Sparkles
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/mockData';
import { StarRating3D } from '../components/StarRating3D';

import { Phone, MessageSquare, Building2 } from 'lucide-react';
import { Property, SpaceCategory } from '../types';

interface SearchResultsProps {
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
  isLoggedIn: boolean;
  onOpenCreateAlertModal?: (criteria: any) => void;
  activeAlertsCount?: number;
  allProperties?: Property[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  onNavigate,
  onOpenGuestModal,
  isLoggedIn,
  onOpenCreateAlertModal,
  activeAlertsCount = 3,
  allProperties,
}) => {
  const propertyList = allProperties || MOCK_PROPERTIES;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Spaces');
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [maxRent, setMaxRent] = useState(2000000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const handleOpenAlertForCurrentSearch = () => {
    if (!isLoggedIn) {
      onOpenGuestModal();
      return;
    }
    if (onOpenCreateAlertModal) {
      onOpenCreateAlertModal({
        location: selectedArea === 'All' ? 'Shelter Afrique' : selectedArea,
        propertyType: selectedType === 'All' ? '2-Bedroom Flat' : selectedType,
        maxPriceNaira: maxRent,
        onlyVerifiedListings: verifiedOnly,
        minRating: minRating,
      });
    } else {
      onNavigate('property_alerts');
    }
  };

  const areas = [
    'All',
    'Shelter Afrique',
    'Ewet Housing',
    'Aka Road',
    'Ikot Ekpene Road',
    'Abak Road',
    'Use Offot',
    'Ikpa Road',
    'Edet Akpan (Four Lanes)',
  ];

  const propertyTypes = [
    'All',
    'Self-Contain',
    '1-Bedroom Flat',
    '2-Bedroom Flat',
    '3-Bedroom Flat',
    'Student Hostel',
    'Store / Retail Shop',
    'Event Center / Hall',
    'Office / Co-Working',
  ];

  const categories = [
    { label: '🌟 All Spaces', val: 'All Spaces' },
    { label: '🏠 Apartments & Flats', val: 'Apartment / Flat' },
    { label: '🏪 Stores & Retail Shops', val: 'Store / Retail Shop' },
    { label: '🚪 Single Rooms & Lodges', val: 'Single Room / Student Lodge' },
    { label: '🎪 Event Centers & Halls', val: 'Event Center / Hall' },
    { label: '🏢 Offices & Co-Working', val: 'Office / Co-Working' },
  ];

  const filteredProperties = propertyList.filter((prop) => {
    if (selectedCategory !== 'All Spaces' && prop.spaceCategory && prop.spaceCategory !== selectedCategory) {
      return false;
    }
    if (selectedArea !== 'All' && prop.area !== selectedArea) return false;
    if (selectedType !== 'All' && prop.propertyType !== selectedType) return false;
    if (prop.currentRentNaira > maxRent) return false;
    if (verifiedOnly && !prop.isVerifiedListing) return false;
    if (minRating > 0 && prop.averageRating < minRating) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const match =
        prop.title.toLowerCase().includes(term) ||
        prop.address.toLowerCase().includes(term) ||
        prop.area.toLowerCase().includes(term) ||
        (prop.spaceCategory && prop.spaceCategory.toLowerCase().includes(term));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Top Controls: Search Input, Alert CTA & Map Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2F3626]/50" />
            <input
              type="text"
              placeholder="Search by street name, landmark, or estate (e.g. Shelter Afrique)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#D8CEBE] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAlertForCurrentSearch}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              title="Subscribe to Push & Email alerts for this search"
            >
              <Bell className="w-4 h-4 text-[#F3CD6D]" />
              <span>Set Alert</span>
            </button>

            <button
              onClick={() => onNavigate('map_view')}
              className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-[#EAE2D6] hover:bg-[#D8CEBE] text-xs font-bold text-[#2F3626] transition-colors flex items-center justify-center gap-2"
            >
              <Map className="w-4 h-4 text-[#8B9A6E]" />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Space Category Filter Chips (Houses, Stores, Single Rooms, Event Halls, Offices) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.val}
              onClick={() => setSelectedCategory(cat.val)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.val
                  ? 'bg-[#8B9A6E] text-white shadow-sm'
                  : 'bg-white hover:bg-[#EAE2D6] text-[#2F3626] border border-[#D8CEBE]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Property Alert Subscription Banner */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#EAE2D6] to-[#F7F2EB] border border-[#D8CEBE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#8B9A6E] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bell className="w-4 h-4 text-[#F3CD6D]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[#2F3626]">
                  Get Notified When New Properties Match Your Search
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#8B9A6E]/15 text-[#6D7C52] text-[10px] font-bold">
                  Email & Push Alerts
                </span>
              </div>
              <p className="text-[11px] text-[#2F3626]/70 mt-0.5">
                Targeting: {selectedArea === 'All' ? 'All Uyo' : selectedArea} • {selectedType} • Under ₦{(maxRent / 1000).toFixed(0)}k/yr
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              onClick={handleOpenAlertForCurrentSearch}
              className="px-4 py-2 rounded-xl bg-[#8B9A6E] text-white font-bold hover:bg-[#6D7C52] transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#F3CD6D]" />
              <span>Create Alert</span>
            </button>
            <button
              onClick={() => onNavigate('property_alerts')}
              className="px-3 py-2 rounded-xl bg-white border border-[#D8CEBE] text-[#2F3626] font-semibold hover:bg-[#EAE2D6] transition-colors whitespace-nowrap"
            >
              Manage ({activeAlertsCount})
            </button>
          </div>
        </div>

        {/* Filter Strip */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EAE2D6] shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#2F3626]">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#8B9A6E]" />
              Filter Verified Properties
            </span>
            <button
              onClick={() => {
                setSelectedArea('All');
                setSelectedType('All');
                setMaxRent(1500000);
                setVerifiedOnly(false);
                setMinRating(0);
                setSearchTerm('');
              }}
              className="text-[#8B9A6E] hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Area Filter */}
            <div>
              <label className="font-semibold block mb-1 text-[#2F3626]/80">Area / Estate</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              >
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="font-semibold block mb-1 text-[#2F3626]/80">Property Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#2F3626]/80">Max Rent (Naira)</label>
                <span className="font-bold text-[#8B9A6E]">
                  ₦{(maxRent / 1000).toLocaleString()}k
                </span>
              </div>
              <input
                type="range"
                min={200000}
                max={1500000}
                step={50000}
                value={maxRent}
                onChange={(e) => setMaxRent(Number(e.target.value))}
                className="w-full accent-[#8B9A6E] cursor-pointer"
              />
            </div>

            {/* Checkbox: Verified listings only */}
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] cursor-pointer hover:bg-[#EAE2D6] transition-colors">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
                />
                <span className="font-semibold text-[11px] text-[#2F3626]">
                  Verified listings only (No scams)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Count & Safety Reminder */}
        <div className="flex items-center justify-between text-xs text-[#2F3626]/70 px-1">
          <span>
            Found <strong>{filteredProperties.length}</strong> rental properties in Uyo
          </span>
          <span className="text-[11px] text-[#C4684A] font-semibold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            Always inspect water source in person
          </span>
        </div>

        {/* Property Grid Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => onNavigate('property_detail', prop.id)}
              className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D6] shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Photo & Overlays */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={prop.coverPhoto}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Verification Pill */}
                  {prop.isVerifiedListing && (
                    <div className="absolute top-3 left-3 bg-[#8B9A6E] text-white px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Title</span>
                    </div>
                  )}

                  {/* Save Bookmark */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLoggedIn) onOpenGuestModal();
                    }}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-white/80 hover:bg-white text-[#2F3626] backdrop-blur-md transition-colors"
                    aria-label="Save property"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  {/* Rent Tag */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm text-xs font-bold text-[#2F3626]">
                    ₦{(prop.currentRentNaira).toLocaleString()}
                    <span className="text-[10px] text-[#2F3626]/70 font-normal">
                      {' '}/{prop.rentPeriod === 'Per Day' ? 'day' : prop.rentPeriod === 'Per Month' ? 'mo' : 'yr'}
                    </span>
                  </div>

                  {/* Flood Risk Pill */}
                  <div
                    className={`absolute bottom-3 right-3 px-2 py-1 rounded-xl text-[10px] font-bold ${
                      prop.floodRisk === 'Low'
                        ? 'bg-[#8B9A6E] text-white'
                        : 'bg-[#C4684A] text-white'
                    }`}
                  >
                    Flood: {prop.floodRisk}
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#8B9A6E] uppercase tracking-wider text-[10px]">
                      {prop.spaceCategory || prop.propertyType}
                    </span>
                    <div className="flex items-center gap-1 font-bold text-[#2F3626]">
                      <StarRating3D value={prop.averageRating} readonly size="sm" showScore />
                      <span className="text-[10px] text-[#2F3626]/60">({prop.totalReviews})</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#2F3626] line-clamp-1 group-hover:text-[#8B9A6E] transition-colors">
                    {prop.title}
                  </h3>

                  <p className="text-xs text-[#2F3626]/70 flex items-center gap-1 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B9A6E] shrink-0" />
                    <span>{prop.address}</span>
                  </p>

                  {/* Micro Specs */}
                  <div className="pt-2 border-t border-[#EAE2D6] grid grid-cols-2 gap-2 text-[11px] text-[#2F3626]/80">
                    <div className="truncate">
                      💧 <span className="font-medium">{prop.waterReliability}</span>
                    </div>
                    <div className="truncate">
                      ⚡ <span className="font-medium">{prop.powerGrade}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Direct Host Actions */}
              <div className="px-5 py-3 bg-[#F7F2EB] border-t border-[#EAE2D6] flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <a
                    href={`tel:${prop.contactPhone || '+2348037112290'}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white hover:bg-[#8B9A6E] hover:text-white text-[#2F3626] border border-[#D8CEBE] transition-colors flex items-center gap-1 text-[11px] font-semibold"
                    title="Call Host directly"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#8B9A6E]" />
                    <span className="hidden sm:inline">Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${(prop.contactWhatsApp || prop.contactPhone || '2348037112290').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I saw your listing on RentTruth AKS: "${prop.title}" in ${prop.area}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white hover:bg-[#25D366] hover:text-white text-[#2F3626] border border-[#D8CEBE] transition-colors flex items-center gap-1 text-[11px] font-semibold"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>

                <span className="font-bold text-[#8B9A6E] flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs">
                  Reviews & Host →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
