export type UserRole = 'tenant' | 'house_hunter' | 'agent' | 'landlord' | 'admin';

export type VerificationBadge = 'verified_tenant' | 'verified_landlord' | 'verified_agent' | 'unverified';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar: string;
  role: UserRole;
  badge: VerificationBadge;
  reputationPoints: number;
  level: string;
  verifiedAt?: string;
  reviewsCount: number;
  helpfulVotes: number;
  location?: string;
  bio?: string;
}

export interface RatingBreakdown {
  water: number; // 1-5
  light: number; // 1-5
  security: number; // 1-5
  drainage: number; // 1-5 (flooding resistance)
  neighbours: number; // 1-5
  landlord: number; // 1-5
  valueForMoney: number; // 1-5
  agentHonesty?: number; // 1-5
}

export interface MoveOutFacts {
  rentPaidNaira: number;
  rentPeriod: string; // e.g. "Per Year"
  tenancyDuration: string; // e.g. "2023 - 2025 (2 years)"
  agentFeePaidNaira: number;
  cautionFeePaidNaira: number;
  agreementFeePaidNaira: number;
  rentIncreasedDuringStay: boolean;
  depositReturned: boolean | 'partial' | 'no';
  wouldRentAgain: boolean;
  recommendToFriend: boolean;
  waterSource: string; // "Borehole (clean)", "Well", "Public tap", "Water tanker"
  powerPrepaidMeter: boolean; // true = prepaid card, false = estimated billing
}

export interface RoomPhoto {
  category: 'compound' | 'sitting_room' | 'bedroom' | 'kitchen' | 'bathroom' | 'ceiling' | 'water_source' | 'meter' | 'drainage' | 'street';
  label: string;
  url: string;
  caption?: string;
  verifiedMetadata?: {
    timestamp: string;
    geotag: string;
    isVerified: boolean;
  };
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  authorBadge: VerificationBadge;
  authorTenancyTime: string; // "Lived here Oct 2023 - Nov 2025"
  datePosted: string;
  overallRating: number;
  ratings: RatingBreakdown;
  summaryLoved: string;
  summaryDisliked: string;
  voiceNoteUrl?: string;
  voiceNoteDuration?: string;
  photos: RoomPhoto[];
  facts: MoveOutFacts;
  proofType?: 'receipt' | 'agreement' | 'geotagged_photos';
  likesCount: number;
  commentsCount: number;
  userLiked?: boolean;
  orderedVsGot?: {
    agentPhoto: string;
    realPhoto: string;
    note: string;
  };
  landlordReply?: {
    authorName: string;
    authorRole: 'landlord' | 'agent';
    date: string;
    message: string;
    resolvedStatus?: string; // e.g. "Roof leak repaired Dec 2025"
  };
  isGuestReview?: boolean;
  spaceUsageType?: string; // e.g. "Rented shop for fashion boutique", "Rented flat for 2 yrs", "Booked hall for wedding"
}

export type SpaceCategory =
  | 'Apartment / Flat'
  | 'Single Room / Student Lodge'
  | 'Store / Retail Shop'
  | 'Event Center / Hall'
  | 'Office / Co-Working'
  | 'Warehouse / Storage';

export interface Property {
  id: string;
  title: string;
  address: string;
  area: string; // e.g. "Ewet Housing", "Shelter Afrique", "Ikot Ekpene Road", "Aka Road", etc.
  coordinates: { lat: number; lng: number };
  spaceCategory?: SpaceCategory;
  propertyType: string;
  rentPeriod?: 'Per Year' | 'Per Month' | 'Per Day' | 'Per Event';
  coverPhoto: string;
  allPhotos: string[];
  averageRating: number;
  totalReviews: number;
  currentRentNaira: number;
  rentHistory: { year: string; rent: number }[];
  ratings: RatingBreakdown;
  floodRisk: 'Low' | 'Moderate' | 'High';
  waterReliability: '24/7 Clean Borehole' | 'Seasonal' | 'Poor';
  powerGrade: 'Grade A (18-22h/day)' | 'Grade B (12-16h/day)' | 'Grade C (<8h/day)';
  securityLevel: 'Gated + Vigilante' | 'Fenced Compound' | 'Open Compound';
  landlordId?: string;
  landlordName?: string;
  isVerifiedListing?: boolean;
  scamReportsCount: number;
  saved?: boolean;
  // Direct Host Contact Details (Open Community Model - Payments Outside Platform)
  contactName?: string;
  contactPhone?: string;
  contactWhatsApp?: string;
  contactRole?: 'Landlord' | 'Direct Agent' | 'Space Host / Manager';
  directDealNotice?: string;
  postedByUserId?: string;
}

export interface ScamReport {
  id: string;
  reportedName: string;
  reportedPhone: string;
  reportedRole: 'fake_agent' | 'landlord' | 'purported_owner' | 'caretaker';
  propertyAddress: string;
  area: string;
  scamType: 'Collected money & vanished' | 'Double letting / multiple tenants' | 'What I ordered vs what I got misrepresentation' | 'Fake property listing' | 'Excessive illegal inspection fee extortion';
  amountLostNaira: number;
  dateReported: string;
  status: 'verified_warning' | 'under_review' | 'resolved';
  reportCount: number;
  description: string;
  evidencePhotos: string[];
  reporterDisplay: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  agencyName: string;
  phone: string;
  avatar: string;
  badge: VerificationBadge;
  rating: number;
  totalReviews: number;
  dealsCompleted: number;
  areasCovered: string[];
  officeAddress: string;
  verifiedSince: string;
  scamReportsCount: number;
  responseRate: string;
  listedPropertiesCount: number;
  bio: string;
}

export interface Neighbourhood {
  id: string;
  name: string;
  description: string;
  image: string;
  averageRentSelfCon: number;
  averageRent2Bed: number;
  floodRisk: 'Low' | 'Moderate' | 'High';
  floodRiskNote: string;
  powerRating: string;
  waterQuality: string;
  securityRating: string;
  studentFriendly: boolean;
  commuteNote: string;
  reviewCount: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
  text: string;
  imageUrl?: string;
  propertyCard?: {
    id: string;
    title: string;
    address: string;
    rent: number;
    image: string;
  };
  isMine: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  participantBadge: VerificationBadge;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  propertyContext?: {
    id: string;
    title: string;
    image: string;
  };
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'review' | 'scam_alert' | 'reply' | 'verification' | 'reward' | 'property_alert';
  read: boolean;
  linkScreen?: string;
  linkParam?: string;
}

export interface PropertyAlertSubscription {
  id: string;
  name: string;
  location: string;
  propertyType: string;
  minPriceNaira?: number;
  maxPriceNaira: number;
  onlyVerifiedListings: boolean;
  minRating: number;
  channels: {
    email: boolean;
    push: boolean;
    whatsapp?: boolean;
  };
  emailAddress?: string;
  phoneNumber?: string;
  frequency: 'instant' | 'daily_digest';
  createdAt: string;
  active: boolean;
  matchCount: number;
}
