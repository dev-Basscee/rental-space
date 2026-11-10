import React, { useState } from 'react';
import {
  ShieldAlert,
  PlusCircle,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Volume2,
  Eye,
  Search
} from 'lucide-react';
import { MOCK_REVIEWS, MOCK_PROPERTIES, MOCK_SCAM_REPORTS } from '../data/mockData';
import { StarRating3D } from '../components/StarRating3D';
import { Property, Review } from '../types';

interface HomeFeedProps {
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
  isLoggedIn: boolean;
  allProperties?: Property[];
  allReviews?: Review[];
  onOpenGuestReview?: (propertyId?: string) => void;
  onOpenPostSpace?: () => void;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  onNavigate,
  onOpenGuestModal,
  isLoggedIn,
  allProperties,
  allReviews,
  onOpenGuestReview,
  onOpenPostSpace,
}) => {
  const propertyList = allProperties || MOCK_PROPERTIES;
  const reviewList = allReviews || MOCK_REVIEWS;
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [reviews, setReviews] = useState(reviewList);
  const [showCommentInputFor, setShowCommentInputFor] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [commentText, setCommentText] = useState('');

  const areas = [
    'All',
    'Shelter Afrique',
    'Ewet Housing',
    'Ikot Ekpene Road',
    'Abak Road',
    'Aka Road',
    'Use Offot',
    'Itam',
  ];

  const filteredReviews = reviews.filter((rev) => {
    if (selectedArea === 'All') return true;
    const prop = propertyList.find((p) => p.id === rev.propertyId);
    return prop?.area === selectedArea;
  });

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const nextLiked = !r.userLiked;
          return {
            ...r,
            userLiked: nextLiked,
            likesCount: nextLiked ? r.likesCount + 1 : r.likesCount - 1,
          };
        }
        return r;
      })
    );
  };

  const handlePostReviewClick = () => {
    if (!isLoggedIn) {
      onOpenGuestModal();
    } else {
      onNavigate('post_review');
    }
  };

  const handleShareToWhatsApp = (review: typeof MOCK_REVIEWS[0]) => {
    const text = encodeURIComponent(
      `Check this honest move-out review for a house in Uyo on RentTruth AKS:\n"${review.summaryLoved}"\nCheck before you pay: https://renttruth-aks.ng/review/${review.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleAddComment = (reviewId: string) => {
    if (!commentText.trim()) return;
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            commentsCount: r.commentsCount + 1,
          };
        }
        return r;
      })
    );
    setCommentText('');
    setShowCommentInputFor(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      {/* 1. SCAM ALERTS STRIP (High priority warning) */}
      <div className="bg-[#C4684A] text-white py-2.5 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
            <span className="font-bold uppercase tracking-wider shrink-0">Uyo Scam Alert:</span>
            <span className="truncate">
              Fake agent "Francis Udeme" flagged on 45 Aka Road (4 reports)
            </span>
          </div>
          <button
            onClick={() => onNavigate('scam_report_detail', 'scam-1')}
            className="text-[11px] font-bold underline shrink-0 hover:text-[#FFF8E1] transition-colors"
          >
            Read Case & Avoid →
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-5">
        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F3626]">
              Community Move-Out Feed
            </h1>
            <p className="text-xs text-[#2F3626]/75">
              Real photos and verified experiences from outgoing tenants across Akwa Ibom.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onOpenGuestReview) onOpenGuestReview();
                else handlePostReviewClick();
              }}
              className="px-3.5 py-2 rounded-2xl bg-white border border-[#D8CEBE] text-xs font-bold hover:bg-[#EAE2D6] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Open to guests without login"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B9A6E]" />
              <span>+ Drop Review</span>
            </button>
            <button
              onClick={() => {
                if (onOpenPostSpace) onOpenPostSpace();
                else handlePostReviewClick();
              }}
              className="px-4 py-2 rounded-2xl bg-[#8B9A6E] text-white text-xs font-bold shadow-md hover:bg-[#6D7C52] transition-all flex items-center gap-1.5 cursor-pointer"
              title="List house, store, room, event hall, or office"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ List a Space</span>
            </button>
          </div>
        </div>

        {/* 2. AREA FILTER CHIPS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-[#8B9A6E] shrink-0 ml-1" />
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedArea === area
                  ? 'bg-[#8B9A6E] text-white shadow-sm'
                  : 'bg-[#EAE2D6] text-[#2F3626] hover:bg-[#D8CEBE]'
              }`}
            >
              {area}
            </button>
          ))}
        </div>

        {/* 3. SOCIAL FEED OF MOVE-OUT REVIEWS */}
        <div className="space-y-6">
          {filteredReviews.map((review) => {
            const property = propertyList.find((p) => p.id === review.propertyId);

            return (
              <article
                key={review.id}
                className="bg-white rounded-3xl border border-[#EAE2D6] shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                {/* Author & Header */}
                <div className="p-4 sm:p-5 flex items-start justify-between gap-3 border-b border-[#EAE2D6]/60">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.authorAvatar}
                      alt={review.authorName}
                      className="w-11 h-11 rounded-2xl object-cover border border-[#8B9A6E]"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-[#2F3626]">
                          {review.authorName}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3 text-[#8B9A6E]" />
                          <span>Verified Tenant</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-[#2F3626]/70 mt-0.5">
                        {review.authorTenancyTime} • {review.datePosted}
                      </p>
                    </div>
                  </div>

                  {/* Overall 3D Star Score */}
                  <div className="flex flex-col items-end">
                    <StarRating3D value={review.overallRating} readonly size="sm" showScore />
                    <span className="text-[10px] text-[#2F3626]/60 mt-0.5">Overall rating</span>
                  </div>
                </div>

                {/* Property Context Banner */}
                {property && (
                  <div
                    onClick={() => onNavigate('property_detail', property.id)}
                    className="px-4 py-2.5 bg-[#EAE2D6]/40 flex items-center justify-between text-xs cursor-pointer hover:bg-[#EAE2D6]/70 transition-colors border-b border-[#EAE2D6]/50"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#8B9A6E] shrink-0" />
                      <span className="font-bold text-[#2F3626] truncate">
                        {property.title}
                      </span>
                      <span className="text-[#2F3626]/60 hidden sm:inline truncate">
                        • {property.address}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#8B9A6E] shrink-0 ml-2">
                      View Flat Details →
                    </span>
                  </div>
                )}

                {/* Photo-First Gallery Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-[#F7F2EB]">
                  {review.photos.map((photo, pIdx) => (
                    <div
                      key={pIdx}
                      onClick={() => onNavigate('single_review', review.id)}
                      className="relative h-40 sm:h-44 overflow-hidden rounded-2xl cursor-pointer group"
                    >
                      <img
                        src={photo.url}
                        alt={photo.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90" />
                      
                      {/* Photo Room Tag */}
                      <div className="absolute top-2 left-2 bg-[#2F3626]/75 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-semibold text-white">
                        {photo.label}
                      </div>

                      {/* Verified timestamp badge */}
                      {photo.verifiedMetadata && (
                        <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white font-medium flex items-center gap-1 truncate">
                          <CheckCircle2 className="w-3 h-3 text-[#F3CD6D] shrink-0" />
                          <span className="truncate">Geotagged & Timestamped</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Facts Strip (Naira rent, agent fee, caution returned) */}
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-2xl bg-[#EAE2D6]/50 border border-[#EAE2D6]">
                      <span className="text-[10px] text-[#2F3626]/70 block">Rent Paid</span>
                      <span className="font-bold text-[#2F3626]">
                        ₦{review.facts.rentPaidNaira.toLocaleString()}/yr
                      </span>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#EAE2D6]/50 border border-[#EAE2D6]">
                      <span className="text-[10px] text-[#2F3626]/70 block">Agent Fee Paid</span>
                      <span className="font-bold text-[#2F3626]">
                        ₦{review.facts.agentFeePaidNaira.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#EAE2D6]/50 border border-[#EAE2D6]">
                      <span className="text-[10px] text-[#2F3626]/70 block">Water Reliability</span>
                      <span className="font-bold text-[#8B9A6E]">
                        {review.facts.waterSource}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#EAE2D6]/50 border border-[#EAE2D6]">
                      <span className="text-[10px] text-[#2F3626]/70 block">Caution Deposit</span>
                      <span
                        className={`font-bold ${
                          review.facts.depositReturned === true
                            ? 'text-[#8B9A6E]'
                            : 'text-[#C4684A]'
                        }`}
                      >
                        {review.facts.depositReturned === true
                          ? '✓ Fully Returned'
                          : review.facts.depositReturned === 'partial'
                          ? '⚠ Partial'
                          : '✕ Withheld'}
                      </span>
                    </div>
                  </div>

                  {/* Summary: Loved vs Disliked */}
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="p-3 rounded-2xl bg-[#8B9A6E]/10 border border-[#8B9A6E]/20 text-[#2F3626]">
                      <span className="font-bold text-[#6D7C52] block mb-1">
                        💚 What I Loved:
                      </span>
                      <p className="leading-relaxed">{review.summaryLoved}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#C4684A]/10 border border-[#C4684A]/20 text-[#2F3626]">
                      <span className="font-bold text-[#C4684A] block mb-1">
                        ⚠️ What I Didn't Like:
                      </span>
                      <p className="leading-relaxed">{review.summaryDisliked}</p>
                    </div>
                  </div>

                  {/* Voice note indicator */}
                  {review.voiceNoteDuration && (
                    <div
                      onClick={() => onNavigate('single_review', review.id)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#EAE2D6] border border-[#D8CEBE] cursor-pointer hover:bg-[#D8CEBE] transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[#2F3626]">
                        <Volume2 className="w-4 h-4 text-[#8B9A6E]" />
                        <span>Voice Note Attached ({review.voiceNoteDuration})</span>
                      </div>
                      <span className="text-xs font-semibold text-[#8B9A6E]">
                        Listen in Review →
                      </span>
                    </div>
                  )}

                  {/* Landlord Right of Reply snippet */}
                  {review.landlordReply && (
                    <div className="p-3 rounded-2xl bg-white border border-[#8B9A6E]/40 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2F3626] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#8B9A6E]" />
                          Official Reply from {review.landlordReply.authorName}
                        </span>
                        <span className="text-[10px] text-[#2F3626]/60">
                          {review.landlordReply.date}
                        </span>
                      </div>
                      <p className="text-[#2F3626]/80 italic">
                        "{review.landlordReply.message}"
                      </p>
                      {review.landlordReply.resolvedStatus && (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-[10px] font-bold mt-1">
                          ✓ {review.landlordReply.resolvedStatus}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Interactive Action Bar: Like, Comment, WhatsApp Share, Chat */}
                  <div className="pt-3 border-t border-[#EAE2D6] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Like button (No login needed!) */}
                      <button
                        onClick={() => handleLike(review.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                          review.userLiked ? 'text-[#C4684A]' : 'text-[#2F3626]/70 hover:text-[#C4684A]'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            review.userLiked ? 'fill-current text-[#C4684A]' : ''
                          }`}
                        />
                        <span>{review.likesCount} Helpful</span>
                      </button>

                      {/* Comment Button (Open comment box) */}
                      <button
                        onClick={() =>
                          setShowCommentInputFor(
                            showCommentInputFor === review.id ? null : review.id
                          )
                        }
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#2F3626]/70 hover:text-[#2F3626] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{review.commentsCount} Comments</span>
                      </button>

                      {/* Share to WhatsApp */}
                      <button
                        onClick={() => handleShareToWhatsApp(review)}
                        className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#8B9A6E] hover:text-[#6D7C52] transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Chat with reviewer (Requires account) */}
                      <button
                        onClick={() => {
                          if (!isLoggedIn) onOpenGuestModal();
                          else onNavigate('chat_thread');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#EAE2D6] hover:bg-[#D8CEBE] text-xs font-bold text-[#2F3626] transition-colors flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#8B9A6E]" />
                        <span>Ask Tenant</span>
                      </button>

                      <button
                        onClick={() => onNavigate('single_review', review.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-xs font-bold text-white transition-colors"
                      >
                        Full Review →
                      </button>
                    </div>
                  </div>

                  {/* Inline Guest Comment Form */}
                  {showCommentInputFor === review.id && (
                    <div className="pt-3 border-t border-[#EAE2D6] space-y-2 bg-[#F7F2EB] p-3 rounded-2xl">
                      <div className="flex items-center justify-between text-xs text-[#2F3626]">
                        <span className="font-bold">Leave a Public Comment</span>
                        {!isLoggedIn && (
                          <span className="text-[10px] text-[#8B9A6E] font-semibold bg-[#8B9A6E]/15 px-2 py-0.5 rounded-full">
                            Posting as Guest
                          </span>
                        )}
                      </div>

                      {!isLoggedIn && (
                        <input
                          type="text"
                          placeholder="Your display name (e.g. Edidiong from Uyo)"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                        />
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ask a question or add your experience..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                        />
                        <button
                          onClick={() => handleAddComment(review.id)}
                          className="px-4 py-2 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold hover:bg-[#6D7C52] transition-colors shrink-0"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Floating "+ Post Review" CTA (Mobile View) */}
      <div className="md:hidden fixed bottom-20 right-4 z-30">
        <button
          onClick={handlePostReviewClick}
          className="flex items-center gap-2 bg-[#8B9A6E] text-white px-4 py-3 rounded-full shadow-2xl border-2 border-white font-bold text-xs active:scale-95 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Post Review</span>
        </button>
      </div>
    </div>
  );
};
