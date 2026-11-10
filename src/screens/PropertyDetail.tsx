import React, { useState } from 'react';
import {
  MapPin,
  Star,
  ShieldCheck,
  Bookmark,
  Share2,
  Heart,
  MessageSquare,
  AlertTriangle,
  Droplets,
  Zap,
  Shield,
  Waves,
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { MOCK_PROPERTIES, MOCK_REVIEWS } from '../data/mockData';
import { StarRating3D } from '../components/StarRating3D';
import { OrderedVsGotCard } from '../components/OrderedVsGotCard';
import { Phone, Building2 } from 'lucide-react';
import { Property, Review } from '../types';

interface PropertyDetailProps {
  propertyId: string;
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
  isLoggedIn: boolean;
  onOpenGuestReview?: (propertyId: string) => void;
  allProperties?: Property[];
  allReviews?: Review[];
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  propertyId,
  onNavigate,
  onOpenGuestModal,
  isLoggedIn,
  onOpenGuestReview,
  allProperties,
  allReviews,
}) => {
  const propertyList = allProperties || MOCK_PROPERTIES;
  const reviewList = allReviews || MOCK_REVIEWS;

  const property =
    propertyList.find((p) => p.id === propertyId) || propertyList[0];
  const reviews = reviewList.filter((r) => r.propertyId === property.id);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(property.saved || false);

  const ratingCategories = [
    { label: 'Water (Borehole/Pressure)', key: 'water', icon: Droplets, val: property.ratings.water },
    { label: 'Power & Light (PHED/NEPA)', key: 'light', icon: Zap, val: property.ratings.light },
    { label: 'Security & Compound Gate', key: 'security', icon: Shield, val: property.ratings.security },
    { label: 'Drainage & Flood Resistance', key: 'drainage', icon: Waves, val: property.ratings.drainage },
    { label: 'Neighbourhood & Compound Peace', key: 'neighbours', icon: Users, val: property.ratings.neighbours },
    { label: 'Landlord & Caretaker Behavior', key: 'landlord', icon: UserCheck, val: property.ratings.landlord },
    { label: 'Value for Money (Naira Rent)', key: 'valueForMoney', icon: DollarSign, val: property.ratings.valueForMoney },
  ];

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* Navigation Breadcrumb & Actions */}
        <div className="flex items-center justify-between text-xs">
          <button
            onClick={() => onNavigate('search')}
            className="flex items-center gap-1.5 font-bold text-[#8B9A6E] hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to search</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!isLoggedIn) onOpenGuestModal();
                else setIsSaved(!isSaved);
              }}
              className={`p-2 rounded-xl border border-[#D8CEBE] transition-colors flex items-center gap-1.5 ${
                isSaved ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">
                {isSaved ? 'Saved' : 'Save'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('report_scam')}
              className="p-2 rounded-xl bg-[#C4684A]/10 text-[#C4684A] hover:bg-[#C4684A]/20 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Report Flag</span>
            </button>
          </div>
        </div>

        {/* 1. PHOTO GALLERY WITH 3D TILT CAROUSEL */}
        <div className="space-y-3">
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-lg border border-[#EAE2D6] perspective-1000 group">
            <img
              src={property.allPhotos[activePhotoIdx] || property.coverPhoto}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            
            {/* Top verification banner */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="bg-[#8B9A6E] text-white px-3 py-1.5 rounded-2xl text-xs font-bold shadow-md flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Tenant Photos</span>
              </span>
              <span className="bg-[#2F3626]/80 text-white backdrop-blur-md px-3 py-1.5 rounded-2xl text-xs font-semibold">
                {property.allPhotos.length} Room Angles
              </span>
            </div>

            {/* Carousel Arrow Controls */}
            {property.allPhotos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setActivePhotoIdx((prev) =>
                      prev === 0 ? property.allPhotos.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#2F3626] shadow-md transition-all"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActivePhotoIdx((prev) =>
                      (prev + 1) % property.allPhotos.length
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#2F3626] shadow-md transition-all"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Rent badge overlay */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-[#D8CEBE]">
              <span className="text-[10px] text-[#2F3626]/70 uppercase font-bold tracking-wider block">
                Last Verified Rent
              </span>
              <span className="font-heading font-extrabold text-lg sm:text-xl text-[#2F3626]">
                ₦{(property.currentRentNaira / 1000).toLocaleString()}k
                <span className="text-xs font-medium text-[#2F3626]/60"> / year</span>
              </span>
            </div>
          </div>

          {/* Photo Thumbnail Strip */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {property.allPhotos.map((photo, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  activePhotoIdx === idx
                    ? 'border-[#8B9A6E] scale-105 shadow-md'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={photo} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* 2. HEADER DETAILS & OVERVIEW */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-xs font-bold">
                  {property.spaceCategory || property.propertyType}
                </span>
                <span className="text-xs text-[#2F3626]/60">• {property.area}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#2F3626]/10 text-[#2F3626] text-xs font-semibold">
                  Direct Host Deal
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F3626]">
                {property.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#2F3626]/70 flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#8B9A6E] shrink-0" />
                <span>{property.address}</span>
              </p>
            </div>

            {/* Price Tag */}
            <div className="sm:text-right shrink-0">
              <span className="text-[11px] text-[#2F3626]/60 block font-semibold">
                Rent / Fee ({property.rentPeriod || 'Per Year'})
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F3626]">
                  ₦{(property.currentRentNaira).toLocaleString()}
                </span>
                <span className="text-xs text-[#8B9A6E] font-bold">
                  /{property.rentPeriod === 'Per Day' ? 'day' : property.rentPeriod === 'Per Month' ? 'mo' : 'yr'}
                </span>
              </div>
            </div>
          </div>

          {/* Direct Host Contact Box (Open Platform Model: Payments outside) */}
          <div className="bg-[#2F3626] text-[#F7F2EB] p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-[#8B9A6E]/30">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#8B9A6E] flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-sm">
                {(property.contactName || property.landlordName || 'H')[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">
                    {property.contactName || property.landlordName || 'Elder Bassey Udom'}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B9A6E]/30 text-[#A7B68B]">
                    {property.contactRole || 'Direct Landlord'}
                  </span>
                </div>
                <p className="text-xs text-[#EAE2D6]/80 mt-0.5 leading-relaxed">
                  {property.directDealNotice || 'Direct deal with host. All inspections in daytime. Zero platform commission fees.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${property.contactPhone || '+2348037112290'}`}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call Host</span>
              </a>

              <a
                href={`https://wa.me/${(property.contactWhatsApp || property.contactPhone || '2348037112290').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I saw your space listing on RentTruth AKS: "${property.title}" in ${property.area}. I would like to schedule a physical daytime walkthrough.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  if (!isLoggedIn) onOpenGuestModal();
                  else onNavigate('chat_thread');
                }}
                className="hidden lg:flex px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs items-center gap-1 cursor-pointer"
              >
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Quick Pillar Tags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#EAE2D6] text-xs">
            <div className="p-3 rounded-2xl bg-[#F7F2EB]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Flood Risk</span>
              <span
                className={`font-bold ${
                  property.floodRisk === 'Low' ? 'text-[#8B9A6E]' : 'text-[#C4684A]'
                }`}
              >
                {property.floodRisk} (Verified Gutters)
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7F2EB]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Water Supply</span>
              <span className="font-bold text-[#2F3626]">{property.waterReliability}</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7F2EB]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Power Grid</span>
              <span className="font-bold text-[#2F3626]">{property.powerGrade}</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#F7F2EB]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Security</span>
              <span className="font-bold text-[#2F3626]">{property.securityLevel}</span>
            </div>
          </div>
        </div>

        {/* 3. 7-CATEGORY TENANT RATING BREAKDOWN */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-lg text-[#2F3626]">
                Tenant Living Score Breakdown
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Calculated strictly from {property.totalReviews} verified move-out submissions.
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#8B9A6E]/15 px-3 py-1.5 rounded-2xl">
              <Star className="w-5 h-5 fill-current text-[#F3CD6D]" />
              <span className="font-heading font-extrabold text-xl text-[#2F3626]">
                {property.averageRating}
              </span>
              <span className="text-xs text-[#2F3626]/70">/ 5.0</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {ratingCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2 text-[#2F3626]">
                      <Icon className="w-4 h-4 text-[#8B9A6E]" />
                      <span>{cat.label}</span>
                    </span>
                    <span className="font-mono text-[#8B9A6E] font-bold">
                      {cat.val.toFixed(1)} / 5.0
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#EEEEEE] overflow-hidden">
                    <div
                      style={{ width: `${(cat.val / 5) * 100}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat.val >= 4.0 ? 'bg-[#8B9A6E]' : cat.val >= 3.0 ? 'bg-[#F3CD6D]' : 'bg-[#C4684A]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. RENT HISTORY CHART */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-lg text-[#2F3626] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#8B9A6E]" />
              <span>Historical Rent Hikes</span>
            </h2>
            <span className="text-xs text-[#2F3626]/60">Verified Receipts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {property.rentHistory.map((item) => (
              <div key={item.year} className="p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] text-center">
                <span className="text-xs font-bold text-[#8B9A6E] block">{item.year}</span>
                <span className="font-heading font-extrabold text-base text-[#2F3626]">
                  ₦{(item.rent / 1000).toFixed(0)}k
                </span>
                <span className="text-[10px] text-[#2F3626]/60 block">Yearly</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. "ORDERED VS GOT" CARD */}
        <div className="space-y-3">
          <OrderedVsGotCard />
        </div>

        {/* 6. VERIFIED TENANT REVIEWS LIST */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-xl text-[#2F3626]">
              Verified Move-Out Reviews ({reviews.length})
            </h2>
            <button
              onClick={() => {
                if (onOpenGuestReview) onOpenGuestReview(property.id);
                else if (!isLoggedIn) onOpenGuestModal();
                else onNavigate('post_review');
              }}
              className="text-xs font-bold text-[#8B9A6E] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>+ Drop a Review (Open to Guests)</span>
            </button>
          </div>

          {reviews.map((rev) => (
            <div
              key={rev.id}
              onClick={() => onNavigate('single_review', rev.id)}
              className="bg-white rounded-3xl p-5 border border-[#EAE2D6] shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.authorAvatar}
                    alt={rev.authorName}
                    className="w-10 h-10 rounded-xl object-cover border border-[#8B9A6E]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#2F3626]">{rev.authorName}</h4>
                    <p className="text-[11px] text-[#2F3626]/60">
                      {rev.authorTenancyTime} • {rev.datePosted}
                    </p>
                  </div>
                </div>
                <StarRating3D value={rev.overallRating} readonly size="sm" showScore />
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-[#2F3626]/90 line-clamp-2">
                  <strong className="text-[#8B9A6E]">Loved:</strong> {rev.summaryLoved}
                </p>
                <p className="text-[#2F3626]/90 line-clamp-2">
                  <strong className="text-[#C4684A]">Disliked:</strong> {rev.summaryDisliked}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EAE2D6] flex items-center justify-between text-xs text-[#8B9A6E] font-semibold">
                <span>View Full Review & Voice Note →</span>
                <span className="text-[#2F3626]/60 font-normal">
                  {rev.likesCount} helpful • {rev.commentsCount} comments
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
