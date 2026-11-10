import React, { useState } from 'react';
import {
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  AlertCircle,
  ShieldCheck,
  Send,
  UserCheck
} from 'lucide-react';
import { MOCK_REVIEWS, MOCK_PROPERTIES } from '../data/mockData';
import { StarRating3D } from '../components/StarRating3D';
import { VoiceNotePlayer } from '../components/VoiceNotePlayer';

interface SingleReviewProps {
  reviewId: string;
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
  isLoggedIn: boolean;
}

export const SingleReview: React.FC<SingleReviewProps> = ({
  reviewId,
  onNavigate,
  onOpenGuestModal,
  isLoggedIn,
}) => {
  const review = MOCK_REVIEWS.find((r) => r.id === reviewId) || MOCK_REVIEWS[0];
  const property = MOCK_PROPERTIES.find((p) => p.id === review.propertyId);

  const [likes, setLikes] = useState(review.likesCount);
  const [hasLiked, setHasLiked] = useState(review.userLiked || false);
  const [comments, setComments] = useState([
    {
      id: 'c-1',
      name: 'Edidiong Akpan',
      role: 'House Hunter',
      text: 'Thanks for this review! I was about to pay ₦10,000 inspection fee for this exact house yesterday. God bless you!',
      time: '2 days ago',
    },
    {
      id: 'c-2',
      name: 'Kufre Sunday',
      role: 'Tenant in Shelter Afrique',
      text: 'Can confirm! Elder Okon is a fair man, but the shared prepaid meter can cause arguments between neighbours.',
      time: '1 day ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [guestAuthor, setGuestAuthor] = useState('');

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: `c-${Date.now()}`,
        name: guestAuthor.trim() || 'Guest Reviewer',
        role: 'Community Member',
        text: newComment.trim(),
        time: 'Just now',
      },
    ]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* Back navigation */}
        <button
          onClick={() => onNavigate('feed')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#8B9A6E] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home Feed</span>
        </button>

        {/* 1. REVIEW CARD HEADER */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE2D6] pb-4">
            <div className="flex items-center gap-3">
              <img
                src={review.authorAvatar}
                alt={review.authorName}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#8B9A6E]"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-heading font-extrabold text-lg text-[#2F3626]">
                    {review.authorName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B9A6E]" />
                    <span>Verified Tenant</span>
                  </span>
                </div>
                <p className="text-xs text-[#2F3626]/70 mt-0.5">
                  {review.authorTenancyTime} • Posted {review.datePosted}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end">
              <StarRating3D value={review.overallRating} readonly size="md" showScore />
              <span className="text-[11px] text-[#2F3626]/60 mt-1">
                Based on 2-year living experience
              </span>
            </div>
          </div>

          {/* Property Reference */}
          {property && (
            <div
              onClick={() => onNavigate('property_detail', property.id)}
              className="p-3.5 rounded-2xl bg-[#EAE2D6]/40 border border-[#D8CEBE] flex items-center justify-between text-xs cursor-pointer hover:bg-[#EAE2D6] transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B9A6E]" />
                <span className="font-bold text-[#2F3626]">{property.title}</span>
                <span className="text-[#2F3626]/70 hidden sm:inline">• {property.address}</span>
              </div>
              <span className="text-xs font-bold text-[#8B9A6E]">View Flat →</span>
            </div>
          )}

          {/* 2. VOICE NOTE PLAYER */}
          {review.voiceNoteDuration && (
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#2F3626] uppercase tracking-wider">
                Tenant Voice Note Summary:
              </span>
              <VoiceNotePlayer
                duration={review.voiceNoteDuration}
                authorName={`Voice Note by ${review.authorName}`}
              />
            </div>
          )}

          {/* 3. FULL PHOTOS GRID */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2F3626] uppercase tracking-wider block">
              Move-Out Inspection Photos ({review.photos.length} Verified):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {review.photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden border border-[#EAE2D6] group"
                >
                  <img
                    src={photo.url}
                    alt={photo.label}
                    className="w-full h-56 object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#2F3626]/80 text-white backdrop-blur-md px-3 py-1 rounded-xl text-xs font-semibold">
                    {photo.label}
                  </div>
                  {photo.caption && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white text-xs">
                      {photo.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. THE FACTS PILLARS */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2F3626] uppercase tracking-wider block">
              Financial Facts & Tenancy Conditions:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
                <span className="text-[10px] text-[#2F3626]/60 block">Rent Paid</span>
                <span className="font-bold text-[#2F3626] text-sm">
                  ₦{review.facts.rentPaidNaira.toLocaleString()}/yr
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
                <span className="text-[10px] text-[#2F3626]/60 block">Agent Fee Paid</span>
                <span className="font-bold text-[#2F3626] text-sm">
                  ₦{review.facts.agentFeePaidNaira.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
                <span className="text-[10px] text-[#2F3626]/60 block">Caution Deposit</span>
                <span
                  className={`font-bold text-sm ${
                    review.facts.depositReturned === true
                      ? 'text-[#8B9A6E]'
                      : 'text-[#C4684A]'
                  }`}
                >
                  {review.facts.depositReturned === true
                    ? 'Returned in full'
                    : 'Withheld by landlord'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
                <span className="text-[10px] text-[#2F3626]/60 block">Water Source</span>
                <span className="font-bold text-[#8B9A6E]">{review.facts.waterSource}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
                <span className="text-[10px] text-[#2F3626]/60 block">Would Rent Again?</span>
                <span className="font-bold text-[#8B9A6E]">
                  {review.facts.wouldRentAgain ? 'Yes, would rent again' : 'No, would avoid'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
                <span className="text-[10px] text-[#2F3626]/60 block">Rent Raised Mid-Stay?</span>
                <span className="font-bold text-[#C4684A]">
                  {review.facts.rentIncreasedDuringStay ? 'Yes (+₦50k in Year 2)' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* 5. SUMMARY: WHAT I LOVED / DISLIKED */}
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#8B9A6E]/10 border border-[#8B9A6E]/20 text-xs sm:text-sm">
              <span className="font-bold text-[#6D7C52] block mb-1">
                💚 What I Loved Most:
              </span>
              <p className="leading-relaxed">{review.summaryLoved}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#C4684A]/10 border border-[#C4684A]/20 text-xs sm:text-sm">
              <span className="font-bold text-[#C4684A] block mb-1">
                ⚠️ What I Didn't Like:
              </span>
              <p className="leading-relaxed">{review.summaryDisliked}</p>
            </div>
          </div>

          {/* 6. OFFICIAL LANDLORD RIGHT OF REPLY */}
          {review.landlordReply && (
            <div className="p-4 rounded-2xl bg-[#EAE2D6]/40 border border-[#8B9A6E] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2F3626] flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-[#8B9A6E]" />
                  Verified Landlord Reply: {review.landlordReply.authorName}
                </span>
                <span className="text-[#2F3626]/60">{review.landlordReply.date}</span>
              </div>
              <p className="text-[#2F3626]/90 leading-relaxed italic">
                "{review.landlordReply.message}"
              </p>
              {review.landlordReply.resolvedStatus && (
                <div className="inline-block px-3 py-1 rounded-xl bg-[#8B9A6E] text-white font-bold text-[10px]">
                  ✓ Fixed: {review.landlordReply.resolvedStatus}
                </div>
              )}
            </div>
          )}

          {/* Actions: Helpful count, Ask Tenant button */}
          <div className="pt-4 border-t border-[#EAE2D6] flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-2xl transition-all ${
                hasLiked
                  ? 'bg-[#C4684A] text-white shadow-sm'
                  : 'bg-[#EAE2D6] text-[#2F3626] hover:bg-[#D8CEBE]'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{likes} People Found This Helpful</span>
            </button>

            <button
              onClick={() => {
                if (!isLoggedIn) onOpenGuestModal();
                else onNavigate('chat_thread');
              }}
              className="px-4 py-2 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask {review.authorName.split(' ')[0]} Directly</span>
            </button>
          </div>
        </div>

        {/* 7. COMMENTS THREAD (Open to guests & members) */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-5">
          <h3 className="font-heading font-extrabold text-lg text-[#2F3626]">
            Community Discussion ({comments.length})
          </h3>

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2F3626]">{c.name}</span>
                  <span className="text-[10px] text-[#2F3626]/60">{c.time}</span>
                </div>
                <p className="text-xs text-[#2F3626]/80 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="pt-3 border-t border-[#EAE2D6] space-y-3">
            <span className="text-xs font-bold text-[#2F3626] block">Leave a Comment:</span>
            {!isLoggedIn && (
              <input
                type="text"
                placeholder="Your name or nickname (e.g. Bassey from Uyo)"
                value={guestAuthor}
                onChange={(e) => setGuestAuthor(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
            )}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask a question about the water, landlord, or security..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold hover:bg-[#6D7C52] transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
