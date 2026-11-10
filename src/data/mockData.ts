import { Property, Review, ScamReport, AgentProfile, Neighbourhood, Conversation, ChatMessage, AppNotification, User, PropertyAlertSubscription } from '../types';

export const CURRENT_USER: User = {
  id: 'usr_me',
  name: 'Bassey Etim',
  phone: '+234 803 456 7890',
  email: 'bassey.etim@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  role: 'tenant',
  badge: 'verified_tenant',
  reputationPoints: 420,
  level: 'Level 3: Trusted Reviewer',
  verifiedAt: 'March 2025',
  reviewsCount: 3,
  helpfulVotes: 58,
  location: 'Ewet Housing, Uyo',
  bio: 'Civil engineer in Uyo. Passionate about decent housing and exposing greedy fake agents.'
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Modern 2-Bedroom Flat in Fenced Compound',
    address: 'Plot 14, Unit C, Shelter Afrique Estate, Uyo',
    area: 'Shelter Afrique',
    coordinates: { lat: 5.0182, lng: 7.9421 },
    propertyType: '2-Bedroom Flat',
    coverPhoto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 4.2,
    totalReviews: 4,
    currentRentNaira: 850000,
    rentHistory: [
      { year: '2022', rent: 650000 },
      { year: '2023', rent: 750000 },
      { year: '2024', rent: 800000 },
      { year: '2025', rent: 850000 }
    ],
    ratings: {
      water: 4.8,
      light: 4.2,
      security: 4.9,
      drainage: 4.5,
      neighbours: 4.0,
      landlord: 3.8,
      valueForMoney: 4.0,
      agentHonesty: 4.5
    },
    floodRisk: 'Low',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade A (18-22h/day)',
    securityLevel: 'Gated + Vigilante',
    landlordName: 'Elder Okon Asuquo',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: true,
    spaceCategory: 'Apartment / Flat',
    rentPeriod: 'Per Year',
    contactName: 'Elder Okon Asuquo',
    contactPhone: '+234 803 711 2290',
    contactWhatsApp: '+2348037112290',
    contactRole: 'Landlord',
    directDealNotice: 'Direct landlord contact. Inspection is conducted during daytime. No advance commitment fees!'
  },
  {
    id: 'prop-2',
    title: 'Self-Contain Room with Tiled Kitchen & Balcony',
    address: '18 Ikot Ekpene Road (Opposite AKBC Transmitting Station), Uyo',
    area: 'Ikot Ekpene Road',
    coordinates: { lat: 5.0378, lng: 7.9152 },
    propertyType: 'Self-Contain',
    spaceCategory: 'Apartment / Flat',
    rentPeriod: 'Per Year',
    coverPhoto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 2.8,
    totalReviews: 6,
    currentRentNaira: 350000,
    rentHistory: [
      { year: '2023', rent: 280000 },
      { year: '2024', rent: 320000 },
      { year: '2025', rent: 350000 }
    ],
    ratings: {
      water: 2.1,
      light: 3.4,
      security: 3.0,
      drainage: 1.8,
      neighbours: 3.2,
      landlord: 2.0,
      valueForMoney: 2.5,
      agentHonesty: 2.0
    },
    floodRisk: 'High',
    waterReliability: 'Poor',
    powerGrade: 'Grade B (12-16h/day)',
    securityLevel: 'Fenced Compound',
    landlordName: 'Chief Emmanuel Udo',
    isVerifiedListing: false,
    scamReportsCount: 2,
    saved: false,
    contactName: 'Chief Emmanuel Udo',
    contactPhone: '+234 808 655 4321',
    contactWhatsApp: '+2348086554321',
    contactRole: 'Landlord',
    directDealNotice: 'Direct landlord contact. Check past tenant reviews about flooding during rainy season before committing.'
  },
  {
    id: 'prop-3',
    title: '3-Bedroom Executive Bungalow with Paved Compound',
    address: 'Road 6, Ewet Housing Estate, Uyo',
    area: 'Ewet Housing',
    coordinates: { lat: 5.0234, lng: 7.9312 },
    propertyType: '3-Bedroom Flat',
    coverPhoto: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 4.6,
    totalReviews: 5,
    currentRentNaira: 1400000,
    rentHistory: [
      { year: '2022', rent: 1100000 },
      { year: '2023', rent: 1250000 },
      { year: '2024', rent: 1350000 },
      { year: '2025', rent: 1400000 }
    ],
    ratings: {
      water: 4.9,
      light: 4.7,
      security: 5.0,
      drainage: 4.8,
      neighbours: 4.6,
      landlord: 4.3,
      valueForMoney: 4.2,
      agentHonesty: 4.7
    },
    floodRisk: 'Low',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade A (18-22h/day)',
    securityLevel: 'Gated + Vigilante',
    landlordName: 'Lady Victoria Akpan',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: true
  },
  {
    id: 'prop-4',
    title: 'Student Self-Con Lodge (Near Uniuyo Permanent Campus Gate)',
    address: 'Off Use Offot Road, Near Uniuyo Permanent Campus, Uyo',
    area: 'Use Offot',
    coordinates: { lat: 5.0456, lng: 7.9543 },
    propertyType: 'Student Hostel',
    coverPhoto: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 3.5,
    totalReviews: 8,
    currentRentNaira: 280000,
    rentHistory: [
      { year: '2023', rent: 220000 },
      { year: '2024', rent: 250000 },
      { year: '2025', rent: 280000 }
    ],
    ratings: {
      water: 3.9,
      light: 3.0,
      security: 3.7,
      drainage: 3.4,
      neighbours: 4.2,
      landlord: 3.1,
      valueForMoney: 3.6,
      agentHonesty: 3.2
    },
    floodRisk: 'Moderate',
    waterReliability: 'Seasonal',
    powerGrade: 'Grade B (12-16h/day)',
    securityLevel: 'Fenced Compound',
    landlordName: 'Caretaker Pastor Aniekan',
    isVerifiedListing: true,
    scamReportsCount: 1,
    saved: false
  },
  {
    id: 'prop-5',
    title: 'Serene 2-Bedroom Flat with Prepaid Meter',
    address: 'Near Ibom Hall, Abak Road, Uyo',
    area: 'Abak Road',
    coordinates: { lat: 5.0112, lng: 7.9045 },
    propertyType: '2-Bedroom Flat',
    coverPhoto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 3.9,
    totalReviews: 3,
    currentRentNaira: 650000,
    rentHistory: [
      { year: '2023', rent: 550000 },
      { year: '2024', rent: 600000 },
      { year: '2025', rent: 650000 }
    ],
    ratings: {
      water: 4.1,
      light: 3.8,
      security: 4.2,
      drainage: 3.7,
      neighbours: 4.0,
      landlord: 3.6,
      valueForMoney: 3.9,
      agentHonesty: 3.8
    },
    floodRisk: 'Moderate',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade B (12-16h/day)',
    securityLevel: 'Fenced Compound',
    landlordName: 'Mr. Iniobong Archibong',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: false
  },
  {
    id: 'prop-6',
    title: 'Spacious Mini Flat in Gated Avenue',
    address: 'Close to AKBC, Aka Road, Uyo',
    area: 'Aka Road',
    coordinates: { lat: 5.0098, lng: 7.9234 },
    propertyType: '1-Bedroom Flat',
    coverPhoto: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 4.0,
    totalReviews: 2,
    currentRentNaira: 450000,
    rentHistory: [
      { year: '2024', rent: 400000 },
      { year: '2025', rent: 450000 }
    ],
    ratings: {
      water: 4.5,
      light: 3.9,
      security: 4.1,
      drainage: 4.0,
      neighbours: 3.9,
      landlord: 3.7,
      valueForMoney: 4.1,
      agentHonesty: 4.0
    },
    floodRisk: 'Low',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade B (12-16h/day)',
    securityLevel: 'Gated + Vigilante',
    landlordName: 'Madam Grace Bassey',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: false,
    spaceCategory: 'Apartment / Flat',
    rentPeriod: 'Per Year',
    contactName: 'Madam Grace Bassey',
    contactPhone: '+234 802 334 5510',
    contactWhatsApp: '+2348023345510',
    contactRole: 'Landlord',
    directDealNotice: 'Direct deal with property landlady. Physical daytime inspection welcomed.'
  },
  {
    id: 'space-shop-1',
    title: 'Prime Roadside Lock-Up Shop (Double Shutters, Tiled, Pre-Paid Meter)',
    address: 'Opposite Ibom Plaza Shopping Arcade, Aka Road, Uyo',
    area: 'Aka Road',
    coordinates: { lat: 5.0321, lng: 7.9268 },
    spaceCategory: 'Store / Retail Shop',
    propertyType: 'Store / Retail Shop',
    rentPeriod: 'Per Year',
    coverPhoto: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 4.5,
    totalReviews: 5,
    currentRentNaira: 450000,
    rentHistory: [
      { year: '2023', rent: 350000 },
      { year: '2024', rent: 400000 },
      { year: '2025', rent: 450000 }
    ],
    ratings: {
      water: 4.0,
      light: 4.8,
      security: 4.7,
      drainage: 4.6,
      neighbours: 4.4,
      landlord: 4.5,
      valueForMoney: 4.6,
      agentHonesty: 4.8
    },
    floodRisk: 'Low',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade A (18-22h/day)',
    securityLevel: 'Gated + Vigilante',
    landlordName: 'Elder Bassey Udom',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: true,
    contactName: 'Elder Bassey Udom',
    contactPhone: '+234 803 441 9920',
    contactWhatsApp: '+2348034419920',
    contactRole: 'Landlord',
    directDealNotice: 'Direct deal with plaza owner. No agent agency fee! Payments made directly outside to owner after physical key verification.'
  },
  {
    id: 'space-event-1',
    title: 'Emerald Palms Marquee & Event Garden (500 Seater, AC Chillers & 100kVA Gen)',
    address: 'Plot 28, Shelter Afrique Extension (Near Golf Course Road), Uyo',
    area: 'Shelter Afrique',
    coordinates: { lat: 5.0145, lng: 7.9482 },
    spaceCategory: 'Event Center / Hall',
    propertyType: 'Event Center / Hall',
    rentPeriod: 'Per Day',
    coverPhoto: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 4.8,
    totalReviews: 7,
    currentRentNaira: 180000,
    rentHistory: [
      { year: '2023', rent: 140000 },
      { year: '2024', rent: 160000 },
      { year: '2025', rent: 180000 }
    ],
    ratings: {
      water: 4.9,
      light: 5.0,
      security: 4.9,
      drainage: 4.8,
      neighbours: 4.7,
      landlord: 4.8,
      valueForMoney: 4.7,
      agentHonesty: 4.9
    },
    floodRisk: 'Low',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade A (18-22h/day)',
    securityLevel: 'Gated + Vigilante',
    landlordName: 'Iniobong Ekanem (Facility Manager)',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: false,
    contactName: 'Iniobong Ekanem',
    contactPhone: '+234 812 559 1102',
    contactWhatsApp: '+2348125591102',
    contactRole: 'Space Host / Manager',
    directDealNotice: 'Direct booking with facility manager. Inspect stage, sound setup, AC chillers, and 80-car parking directly on site.'
  },
  {
    id: 'space-room-1',
    title: 'Furnished Student Room (Inverter Corridor Light, Borehole, 5min to Uniuyo)',
    address: '8 Ikpa Road (Walking Distance to Uniuyo Town Campus Gate), Uyo',
    area: 'Ikpa Road',
    coordinates: { lat: 5.0412, lng: 7.9205 },
    spaceCategory: 'Single Room / Student Lodge',
    propertyType: 'Single Room / Student Lodge',
    rentPeriod: 'Per Year',
    coverPhoto: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 3.8,
    totalReviews: 6,
    currentRentNaira: 160000,
    rentHistory: [
      { year: '2023', rent: 120000 },
      { year: '2024', rent: 140000 },
      { year: '2025', rent: 160000 }
    ],
    ratings: {
      water: 4.2,
      light: 3.8,
      security: 4.0,
      drainage: 3.6,
      neighbours: 4.1,
      landlord: 3.9,
      valueForMoney: 4.0,
      agentHonesty: 4.2
    },
    floodRisk: 'Moderate',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade B (12-16h/day)',
    securityLevel: 'Fenced Compound',
    landlordName: 'Madam Grace Udoh',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: true,
    contactName: 'Madam Grace Udoh',
    contactPhone: '+234 806 772 3144',
    contactWhatsApp: '+2348067723144',
    contactRole: 'Landlord',
    directDealNotice: 'Direct deal with compound landlady living in front bungalow. No extra agent consultation fees.'
  },
  {
    id: 'space-office-1',
    title: 'Serviced 2-Room Office Suite (Solar Inverter Backup & High-Speed Starlink)',
    address: '14 Edet Akpan Avenue (Four Lanes Commercial Strip), Uyo',
    area: 'Edet Akpan (Four Lanes)',
    coordinates: { lat: 5.0210, lng: 7.9388 },
    spaceCategory: 'Office / Co-Working',
    propertyType: 'Office / Co-Working',
    rentPeriod: 'Per Month',
    coverPhoto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    allPhotos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80'
    ],
    averageRating: 4.7,
    totalReviews: 4,
    currentRentNaira: 85000,
    rentHistory: [
      { year: '2023', rent: 65000 },
      { year: '2024', rent: 75000 },
      { year: '2025', rent: 85000 }
    ],
    ratings: {
      water: 4.8,
      light: 5.0,
      security: 4.8,
      drainage: 4.9,
      neighbours: 4.7,
      landlord: 4.6,
      valueForMoney: 4.6,
      agentHonesty: 4.7
    },
    floodRisk: 'Low',
    waterReliability: '24/7 Clean Borehole',
    powerGrade: 'Grade A (18-22h/day)',
    securityLevel: 'Gated + Vigilante',
    landlordName: 'Archibong & Partners Estates',
    isVerifiedListing: true,
    scamReportsCount: 0,
    saved: false,
    contactName: 'Mr. Nsikak Archibong',
    contactPhone: '+234 802 990 1284',
    contactWhatsApp: '+2348029901284',
    contactRole: 'Direct Agent',
    directDealNotice: 'Direct building manager representative. Agreement signed directly with office management.'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-shop-1',
    propertyId: 'space-shop-1',
    userId: 'guest-adaeze',
    authorName: 'Adaeze Kalu (Boutique Owner)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'verified_tenant',
    authorTenancyTime: 'Rented Lock-up Shop 2023 - 2025 (2 years)',
    datePosted: '5 days ago',
    overallRating: 4.6,
    isGuestReview: true,
    spaceUsageType: 'Commercial Retail Shop',
    ratings: {
      water: 4,
      light: 5,
      security: 5,
      drainage: 5,
      neighbours: 4,
      landlord: 5,
      valueForMoney: 4,
      agentHonesty: 5
    },
    summaryLoved: 'Unbeatable customer foot-traffic right opposite Ibom Plaza. The plaza generator runs whenever PHED takes light, and Elder Bassey never disturbs with arbitrary charges. Double steel shutters kept my stock safe.',
    summaryDisliked: 'Street parking directly in front of the plaza gets congested between 4:30pm and 7:00pm during rush hour.',
    photos: [
      {
        category: 'street',
        label: 'Aka Road Shop Frontage',
        url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
        caption: 'Customer entrance with tiled walkway.'
      }
    ],
    facts: {
      rentPaidNaira: 450000,
      rentPeriod: 'Per Year',
      tenancyDuration: '2 years (Boutique & Accessories)',
      agentFeePaidNaira: 0,
      cautionFeePaidNaira: 30000,
      agreementFeePaidNaira: 20000,
      rentIncreasedDuringStay: false,
      depositReturned: true,
      wouldRentAgain: true,
      recommendToFriend: true,
      waterSource: 'Borehole (clean)',
      powerPrepaidMeter: true
    },
    likesCount: 19,
    commentsCount: 3,
    userLiked: true
  },
  {
    id: 'rev-event-1',
    propertyId: 'space-event-1',
    userId: 'guest-aniefiok',
    authorName: 'Aniefiok Udofia (Wedding Host)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'verified_tenant',
    authorTenancyTime: 'Booked Wedding Reception (Nov 2025)',
    datePosted: '1 week ago',
    overallRating: 4.8,
    isGuestReview: true,
    spaceUsageType: 'Event Marquee & Garden',
    ratings: {
      water: 5,
      light: 5,
      security: 5,
      drainage: 5,
      neighbours: 4,
      landlord: 5,
      valueForMoney: 5,
      agentHonesty: 5
    },
    summaryLoved: 'The 100kVA backup generator engaged within 10 seconds of power cut during our event. The AC chillers kept over 450 guests cool in the afternoon heat. Iniobong the manager was on-site all day.',
    summaryDisliked: 'Must book at least 6 weeks in advance for Saturday dates as Shelter Afrique weekend slots fill up fast.',
    photos: [
      {
        category: 'compound',
        label: 'Marquee Hall Interior',
        url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
        caption: '500-guest banquet seating setup with high ceiling.'
      }
    ],
    facts: {
      rentPaidNaira: 180000,
      rentPeriod: 'Per Day',
      tenancyDuration: '1 Day Full Event Booking',
      agentFeePaidNaira: 0,
      cautionFeePaidNaira: 20000,
      agreementFeePaidNaira: 0,
      rentIncreasedDuringStay: false,
      depositReturned: true,
      wouldRentAgain: true,
      recommendToFriend: true,
      waterSource: 'Borehole (clean)',
      powerPrepaidMeter: true
    },
    likesCount: 28,
    commentsCount: 6,
    userLiked: false
  },
  {
    id: 'rev-1',
    propertyId: 'prop-1',
    userId: 'usr-chioma',
    authorName: 'Chioma Nwachukwu (Nurse at UUTH)',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'verified_tenant',
    authorTenancyTime: 'Packed out Oct 2025 • Stayed 2 years',
    datePosted: '3 weeks ago',
    overallRating: 4.5,
    ratings: {
      water: 5,
      light: 4,
      security: 5,
      drainage: 4,
      neighbours: 4,
      landlord: 4,
      valueForMoney: 4,
      agentHonesty: 5
    },
    summaryLoved: 'The borehole water is crystal clear and runs 24/7. Security in this Shelter Afrique avenue is top-notch; gate locks at 10:30pm with night vigilantes.',
    summaryDisliked: 'Elder Okon increased rent by ₦50k in year two without advance notice, and the prepaid meter is shared between two flats so you have to calculate units manually.',
    voiceNoteUrl: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
    voiceNoteDuration: '0:42',
    photos: [
      {
        category: 'compound',
        label: 'Compound & Gate',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        caption: 'Interlocked compound, no mud in August.',
        verifiedMetadata: { timestamp: '2025-10-14 16:20', geotag: 'Shelter Afrique, Uyo', isVerified: true }
      },
      {
        category: 'sitting_room',
        label: 'Sitting Room',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        caption: 'Spacious POP ceiling and cross ventilation.'
      },
      {
        category: 'bathroom',
        label: 'Bathroom & Water Source',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        caption: 'Pressure pump works great, water heater intact.'
      },
      {
        category: 'drainage',
        label: 'Street Drainage',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        caption: 'Gutter flows well towards the expressway.'
      }
    ],
    facts: {
      rentPaidNaira: 800000,
      rentPeriod: 'Yearly',
      tenancyDuration: '2023 - 2025',
      agentFeePaidNaira: 80000,
      cautionFeePaidNaira: 50000,
      agreementFeePaidNaira: 40000,
      rentIncreasedDuringStay: true,
      depositReturned: true,
      wouldRentAgain: true,
      recommendToFriend: true,
      waterSource: 'Borehole (clean)',
      powerPrepaidMeter: true
    },
    proofType: 'receipt',
    likesCount: 34,
    commentsCount: 9,
    userLiked: true,
    orderedVsGot: {
      agentPhoto: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      realPhoto: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      note: 'The agent pictures showed a marble kitchen island that actually only exists in Flat 1 upstairs. Downstairs kitchen is smaller.'
    },
    landlordReply: {
      authorName: 'Elder Okon Asuquo (Landlord)',
      authorRole: 'landlord',
      date: '2 weeks ago',
      message: 'Thank you Nurse Chioma for being a peaceful tenant. I acknowledge the notice issue on rent increment; we have now installed separate prepaid meters for each flat as of November 2025.',
      resolvedStatus: 'Separate Prepaid Meter installed Nov 2025'
    }
  },
  {
    id: 'rev-2',
    propertyId: 'prop-2',
    userId: 'usr-ubong',
    authorName: 'Ubong Sunday (Tech Freelancer)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'verified_tenant',
    authorTenancyTime: 'Packed out August 2025 • Stayed 1 year',
    datePosted: '1 month ago',
    overallRating: 2.1,
    ratings: {
      water: 1,
      light: 3,
      security: 3,
      drainage: 1,
      neighbours: 3,
      landlord: 1,
      valueForMoney: 2,
      agentHonesty: 1
    },
    summaryLoved: 'The location on Ikot Ekpene road is very central and easy to get Keke NAPEP to Plaza anytime.',
    summaryDisliked: 'WARNING: Compound floods up to knee level whenever it rains heavily for 2 hours! Water enters the kitchen. The landlord refused to unclog the front gutter and withheld my ₦40,000 caution deposit claiming wall paint scratches.',
    voiceNoteUrl: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
    voiceNoteDuration: '1:15',
    photos: [
      {
        category: 'drainage',
        label: 'Compound Flooding',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        caption: 'Flooding during July rains. Had to buy sandbags.',
        verifiedMetadata: { timestamp: '2025-07-22 09:15', geotag: 'Ikot Ekpene Rd, Uyo', isVerified: true }
      },
      {
        category: 'ceiling',
        label: 'Ceiling Leak',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        caption: 'Brown water stain right over the bed area.'
      }
    ],
    facts: {
      rentPaidNaira: 320000,
      rentPeriod: 'Yearly',
      tenancyDuration: '2024 - 2025',
      agentFeePaidNaira: 50000,
      cautionFeePaidNaira: 40000,
      agreementFeePaidNaira: 30000,
      rentIncreasedDuringStay: false,
      depositReturned: 'no',
      wouldRentAgain: false,
      recommendToFriend: false,
      waterSource: 'Well water (brown)',
      powerPrepaidMeter: false
    },
    proofType: 'agreement',
    likesCount: 89,
    commentsCount: 24,
    userLiked: false,
    orderedVsGot: {
      agentPhoto: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
      realPhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      note: 'Agent showed sunny dry photos taken during harmattan. During rainy season the compound becomes a pond.'
    }
  },
  {
    id: 'rev-3',
    propertyId: 'prop-4',
    userId: 'usr-aniekeme',
    authorName: 'Aniekeme Edet (UNIUYO Finalist)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    authorBadge: 'verified_tenant',
    authorTenancyTime: 'Packed out Sept 2025 • Stayed 1 year',
    datePosted: '2 months ago',
    overallRating: 3.7,
    ratings: {
      water: 4,
      light: 3,
      security: 4,
      drainage: 3,
      neighbours: 5,
      landlord: 3,
      valueForMoney: 4,
      agentHonesty: 3
    },
    summaryLoved: 'Only 7 minutes trek to UNIUYO Permanent campus gate. Fellow students are very respectful and quiet during exams.',
    summaryDisliked: 'Pumping machine gets spoilt almost every exam period because 16 rooms share one borehole. We contributed ₦2,000 each twice.',
    photos: [
      {
        category: 'bedroom',
        label: 'Room space',
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        caption: 'Enough space for 4.5ft mattress, study desk and wardrobe.'
      }
    ],
    facts: {
      rentPaidNaira: 250000,
      rentPeriod: 'Yearly',
      tenancyDuration: '2024 - 2025',
      agentFeePaidNaira: 25000,
      cautionFeePaidNaira: 20000,
      agreementFeePaidNaira: 15000,
      rentIncreasedDuringStay: false,
      depositReturned: 'partial',
      wouldRentAgain: true,
      recommendToFriend: true,
      waterSource: 'Borehole',
      powerPrepaidMeter: true
    },
    likesCount: 19,
    commentsCount: 5,
    userLiked: false
  }
];

export const MOCK_SCAM_REPORTS: ScamReport[] = [
  {
    id: 'scam-1',
    reportedName: 'Francis Udeme (Claims to be Chief Agent)',
    reportedPhone: '+234 802 341 9912',
    reportedRole: 'fake_agent',
    propertyAddress: 'No 45 Aka Road (Near AKBC)',
    area: 'Aka Road',
    scamType: 'Collected money & vanished',
    amountLostNaira: 420000,
    dateReported: 'November 2, 2025',
    status: 'verified_warning',
    reportCount: 4,
    description: 'Brought 3 different prospective tenants to inspect a flat while the real caretaker was away. Collected full rent of ₦350,000 + ₦70,000 agency fee into an OPay account named "Udoh F.", issued fake receipt with a forged phone number, and switched off phone immediately.',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
    ],
    reporterDisplay: 'Reported by Kufre B. & 3 others'
  },
  {
    id: 'scam-2',
    reportedName: 'Godwin "Gentle" Akpan',
    reportedPhone: '+234 814 990 1283',
    reportedRole: 'fake_agent',
    propertyAddress: 'Opposite Uniuyo Annex Gate, Ikot Ekpene Road',
    area: 'Ikot Ekpene Road',
    scamType: 'Double letting / multiple tenants',
    amountLostNaira: 500000,
    dateReported: 'October 19, 2025',
    status: 'verified_warning',
    reportCount: 3,
    description: 'Let the same self-contain room to two different students at the same time. Both showed up with mattresses and suitcases on resumption day only to find another student already inside with key.',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80'
    ],
    reporterDisplay: 'Reported by Idongesit & 2 others'
  },
  {
    id: 'scam-3',
    reportedName: 'Prestige Property Consult (Caretaker Mfon)',
    reportedPhone: '+234 703 118 4429',
    reportedRole: 'fake_agent',
    propertyAddress: 'Near Timber Market, Itam',
    area: 'Itam',
    scamType: 'Excessive illegal inspection fee extortion',
    amountLostNaira: 18000,
    dateReported: 'November 7, 2025',
    status: 'under_review',
    reportCount: 2,
    description: 'Demands ₦5,000 non-refundable "registration & fuel fee" per inspection. Takes clients to already occupied houses or properties with no intention to let, just to cycle inspection fee collections.',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
    ],
    reporterDisplay: 'Reported by Akaninyene M.'
  }
];

export const MOCK_AGENTS: AgentProfile[] = [
  {
    id: 'agent-1',
    name: 'Arc. Edidiong Bassey',
    agencyName: 'TrueTrust Properties AKS',
    phone: '+234 803 772 1099',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    badge: 'verified_agent',
    rating: 4.8,
    totalReviews: 38,
    dealsCompleted: 64,
    areasCovered: ['Shelter Afrique', 'Ewet Housing', 'Osongama'],
    officeAddress: 'Suite 4, Ibom Plaza Commercial Block, Uyo',
    verifiedSince: 'January 2024 (Physical office & CAC verified)',
    scamReportsCount: 0,
    responseRate: '98% within 1 hour',
    listedPropertiesCount: 8,
    bio: 'Registered architect and licensed Akwa Ibom property manager. Zero inspection fees, standard 10% agency fee strictly on agreement signing.'
  },
  {
    id: 'agent-2',
    name: 'Barrister Emem Umoh',
    agencyName: 'Umoh & Associates Legal Realty',
    phone: '+234 816 339 4811',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    badge: 'verified_agent',
    rating: 4.9,
    totalReviews: 29,
    dealsCompleted: 45,
    areasCovered: ['Ewet Housing', 'Aka Road', 'Abak Road'],
    officeAddress: '12 Oron Road, Uyo',
    verifiedSince: 'March 2024',
    scamReportsCount: 0,
    responseRate: '95% within 2 hours',
    listedPropertiesCount: 5,
    bio: 'Legal practitioner specializing in tenancy law and verified landlord title deeds. Ensuring tenants never pay for unverified properties.'
  }
];

export const MOCK_NEIGHBOURHOODS: Neighbourhood[] = [
  {
    id: 'ewet-housing',
    name: 'Ewet Housing Estate',
    description: 'High-brow, peaceful residential estate in Uyo with paved avenues, manicured flowers, top-tier security gates and underground drainage.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    averageRentSelfCon: 450000,
    averageRent2Bed: 1100000,
    floodRisk: 'Low',
    floodRiskNote: 'Underground gutters prevent waterlogging even during peak monsoon rains.',
    powerRating: 'Grade A (19 hrs average)',
    waterQuality: 'Excellent clean boreholes',
    securityRating: 'Very High (Gate access passes & armed night vigilantes)',
    studentFriendly: false,
    commuteNote: '5 mins drive to Banking Layout, 10 mins to Ibom Tropicana',
    reviewCount: 42
  },
  {
    id: 'shelter-afrique',
    name: 'Shelter Afrique Estate',
    description: 'Expansive master-planned estate on Oron Road. Popular with doctors, oil workers, tech professionals and families wanting space.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    averageRentSelfCon: 380000,
    averageRent2Bed: 850000,
    floodRisk: 'Low',
    floodRiskNote: 'Natural topography slopes toward the peripheral drainage channel.',
    powerRating: 'Grade A (18 hrs average)',
    waterQuality: 'High quality dedicated boreholes',
    securityRating: 'High (Police post at main gate)',
    studentFriendly: false,
    commuteNote: 'Direct access to Oron Road and Airport expressway',
    reviewCount: 65
  },
  {
    id: 'ikot-ekpene-road',
    name: 'Ikot Ekpene Road Axis',
    description: 'Vibrant commercial and residential corridor connecting Uyo Plaza to Itam and Ikot Ekpene. Heavy public transport accessibility.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    averageRentSelfCon: 280000,
    averageRent2Bed: 600000,
    floodRisk: 'High',
    floodRiskNote: 'Compounds behind main road suffer seasonal flooding. Always verify drainage before paying.',
    powerRating: 'Grade B (13 hrs average)',
    waterQuality: 'Varies by compound; request water clarity test',
    securityRating: 'Moderate (Busy thoroughfare, secure compound gate recommended)',
    studentFriendly: true,
    commuteNote: 'Keke NAPEP passes every 30 seconds to Plaza',
    reviewCount: 78
  },
  {
    id: 'use-offot',
    name: 'Use Offot / Uniuyo Campus Axis',
    description: 'Primary student residential community adjacent to University of Uyo permanent campus. Hundreds of mini-hostels and student flats.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    averageRentSelfCon: 240000,
    averageRent2Bed: 480000,
    floodRisk: 'Moderate',
    floodRiskNote: 'Some sand roads become muddy in July-August, but houses on elevated plots stay dry.',
    powerRating: 'Grade B (14 hrs average)',
    waterQuality: 'Good boreholes with occasional generator-pumping schedules',
    securityRating: 'Good (Active student SUG security patrol and local youth vigils)',
    studentFriendly: true,
    commuteNote: 'Walking distance to campus lecture halls and labs',
    reviewCount: 91
  },
  {
    id: 'abak-road',
    name: 'Abak Road & State Secretariat Axis',
    description: 'Favored by civil servants and bank employees. Home to Idongesit Nkanga Secretariat and Ibom Hall.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    averageRentSelfCon: 320000,
    averageRent2Bed: 700000,
    floodRisk: 'Moderate',
    floodRiskNote: 'Main road is well tarred with modern culverts.',
    powerRating: 'Grade A (17 hrs average near government lines)',
    waterQuality: 'Clean boreholes',
    securityRating: 'High',
    studentFriendly: false,
    commuteNote: 'Walk to Secretariat and State Hospital',
    reviewCount: 39
  },
  {
    id: 'aka-road',
    name: 'Aka Road & Nsikak Eduok Axis',
    description: 'Prime hub of commerce, eateries, churches, and modern apartment compounds connecting Ring Road 2 and Plaza.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80',
    averageRentSelfCon: 340000,
    averageRent2Bed: 750000,
    floodRisk: 'Low',
    floodRiskNote: 'Great culverts along dual carriageway.',
    powerRating: 'Grade B (15 hrs average)',
    waterQuality: 'Very clean boreholes',
    securityRating: 'High',
    studentFriendly: true,
    commuteNote: 'Quick link to all parts of Uyo via Ring Road',
    reviewCount: 54
  }
];

export const MOCK_FEE_BENCHMARKS = [
  {
    area: 'Shelter Afrique',
    typicalAgencyPercent: '10%',
    typicalLegalPercent: '5% - 10%',
    typicalCautionDeposit: '₦50,000 - ₦80,000',
    inspectionFeeNorm: 'FREE (Verified agents only)',
    riskNote: 'Any agent asking for ₦10,000 inspection fee here is inflating charges.'
  },
  {
    area: 'Ewet Housing',
    typicalAgencyPercent: '10%',
    typicalLegalPercent: '10%',
    typicalCautionDeposit: '₦100,000 (Refundable)',
    inspectionFeeNorm: 'FREE to ₦2,000 fuel support',
    riskNote: 'Insist on signed legal receipt from the property lawyer.'
  },
  {
    area: 'Ikot Ekpene Road',
    typicalAgencyPercent: '10%',
    typicalLegalPercent: '5%',
    typicalCautionDeposit: '₦30,000 - ₦50,000',
    inspectionFeeNorm: '₦1,000 - ₦2,000 max',
    riskNote: 'Watch out for fly-by-night agents without physical offices.'
  },
  {
    area: 'Use Offot / Uniuyo Axis',
    typicalAgencyPercent: '10% (₦20,000 - ₦25,000)',
    typicalLegalPercent: '₦10,000 flat',
    typicalCautionDeposit: '₦15,000 - ₦25,000',
    inspectionFeeNorm: 'FREE to ₦1,000',
    riskNote: 'Never pay "lodge reservation" money via WhatsApp without meeting caretaker inside compound.'
  },
  {
    area: 'Itam / Ring Road',
    typicalAgencyPercent: '10%',
    typicalLegalPercent: '5%',
    typicalCautionDeposit: '₦25,000 - ₦40,000',
    inspectionFeeNorm: '₦1,000',
    riskNote: 'Verify compound ownership at village head or family representative if uncompleted building.'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participantId: 'usr-chioma',
    participantName: 'Chioma Nwachukwu (Nurse)',
    participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    participantRole: 'Outgoing Tenant',
    participantBadge: 'verified_tenant',
    lastMessage: 'Yes! The landlord returned my caution deposit in full, just make sure you clean the tiles before inspection.',
    lastMessageTime: '12:40 PM',
    unreadCount: 1,
    propertyContext: {
      id: 'prop-1',
      title: 'Modern 2-Bedroom Flat, Shelter Afrique',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'conv-2',
    participantId: 'agent-1',
    participantName: 'Arc. Edidiong Bassey',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    participantRole: 'Verified Agent',
    participantBadge: 'verified_agent',
    lastMessage: 'Good afternoon. I have the keys with me. We can do physical inspection at 4:30 PM today at Shelter Afrique.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    propertyContext: {
      id: 'prop-1',
      title: 'Modern 2-Bedroom Flat, Shelter Afrique',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80'
    }
  },
  {
    id: 'conv-3',
    participantId: 'usr-ubong',
    participantName: 'Ubong Sunday',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    participantRole: 'Former Tenant',
    participantBadge: 'verified_tenant',
    lastMessage: 'Don’t pay brother! Go during rainy day to see the gutter yourself.',
    lastMessageTime: '3 days ago',
    unreadCount: 0,
    propertyContext: {
      id: 'prop-2',
      title: 'Self-Contain Room, Ikot Ekpene Road',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80'
    }
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'usr_me',
    senderName: 'Bassey Etim',
    senderAvatar: CURRENT_USER.avatar,
    timestamp: '11:15 AM',
    text: 'Hello Nurse Chioma! I saw your move-out review for the Shelter Afrique 2-bedroom. Does the compound flood when it rains heavily?',
    isMine: true
  },
  {
    id: 'msg-2',
    senderId: 'usr-chioma',
    senderName: 'Chioma Nwachukwu',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    timestamp: '11:22 AM',
    text: 'Hello Bassey! No, it does not flood at all. Shelter Afrique has great underground storm drains. The water runs off immediately.',
    isMine: false
  },
  {
    id: 'msg-3',
    senderId: 'usr_me',
    senderName: 'Bassey Etim',
    senderAvatar: CURRENT_USER.avatar,
    timestamp: '11:30 AM',
    text: 'Thank you! What about caution fee? Did Elder Okon refund your deposit without trouble?',
    isMine: true
  },
  {
    id: 'msg-4',
    senderId: 'usr-chioma',
    senderName: 'Chioma Nwachukwu',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    timestamp: '12:40 PM',
    text: 'Yes! The landlord returned my caution deposit in full, just make sure you clean the tiles before inspection and clear any outstanding light bill.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80',
    propertyCard: {
      id: 'prop-1',
      title: 'Modern 2-Bedroom Flat in Fenced Compound',
      address: 'Plot 14, Unit C, Shelter Afrique Estate, Uyo',
      rent: 850000,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80'
    },
    isMine: false
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Review on Saved Property',
    message: 'Ubong Sunday just posted a photo review for 18 Ikot Ekpene Road with warning flags.',
    timestamp: '10 minutes ago',
    type: 'review',
    read: false,
    linkScreen: 'property_detail',
    linkParam: 'prop-2'
  },
  {
    id: 'notif-2',
    title: '⚠️ Scam Alert in Aka Road',
    message: 'A fake agent claiming to represent No 45 Aka Road was reported by 4 house hunters.',
    timestamp: '2 hours ago',
    type: 'scam_alert',
    read: false,
    linkScreen: 'scam_report_detail',
    linkParam: 'scam-1'
  },
  {
    id: 'notif-3',
    title: 'Landlord Replied to Your Inquiry',
    message: 'Elder Okon replied: "Separate Prepaid Meter installed Nov 2025".',
    timestamp: '1 day ago',
    type: 'reply',
    read: true,
    linkScreen: 'single_review',
    linkParam: 'rev-1'
  },
  {
    id: 'notif-4',
    title: '🎉 150 Points Earned!',
    message: 'Your move-out review passed geotag verification. You unlocked Level 3: Trusted Reviewer.',
    timestamp: '3 days ago',
    type: 'reward',
    read: true,
    linkScreen: 'rewards'
  }
];

export const REWARD_AIRTIME_OPTIONS = [
  { id: 'mtn-500', network: 'MTN Nigeria', amount: 500, pointsCost: 100, label: '₦500 Airtime' },
  { id: 'mtn-1000', network: 'MTN Nigeria', amount: 1000, pointsCost: 200, label: '₦1,000 Airtime / 1.5GB Data' },
  { id: 'airtel-1000', network: 'Airtel Nigeria', amount: 1000, pointsCost: 200, label: '₦1,000 Airtime / 2GB Data' },
  { id: 'glo-1500', network: 'Glo Nigeria', amount: 1500, pointsCost: 300, label: '₦1,500 Airtime / 3.5GB Data' }
];

export const TOP_REVIEWERS = [
  { rank: 1, name: 'Aniekan Ufot', points: 980, reviews: 7, badge: 'Verified Tenant', location: 'Uniuyo Permanent Campus' },
  { rank: 2, name: 'Chioma Nwachukwu', points: 760, reviews: 5, badge: 'Verified Tenant', location: 'Shelter Afrique' },
  { rank: 3, name: 'Bassey Etim (You)', points: 420, reviews: 3, badge: 'Verified Tenant', location: 'Ewet Housing' },
  { rank: 4, name: 'Kufre Sunday', points: 390, reviews: 3, badge: 'Verified Tenant', location: 'Aka Road' },
  { rank: 5, name: 'Blessing Okon', points: 310, reviews: 2, badge: 'Verified Tenant', location: 'Itam' }
];

export const MOCK_ALERT_SUBSCRIPTIONS: PropertyAlertSubscription[] = [
  {
    id: 'alert-1',
    name: 'Shelter Afrique 2-Bed Under ₦900k',
    location: 'Shelter Afrique',
    propertyType: '2-Bedroom Flat',
    minPriceNaira: 500000,
    maxPriceNaira: 900000,
    onlyVerifiedListings: true,
    minRating: 4.0,
    channels: {
      email: true,
      push: true,
      whatsapp: true,
    },
    emailAddress: 'bassey.etim@gmail.com',
    phoneNumber: '+234 803 456 7890',
    frequency: 'instant',
    createdAt: 'Oct 28, 2025',
    active: true,
    matchCount: 2,
  },
  {
    id: 'alert-2',
    name: 'Ewet Housing Executive Flats',
    location: 'Ewet Housing',
    propertyType: 'All Types',
    maxPriceNaira: 1500000,
    onlyVerifiedListings: true,
    minRating: 4.5,
    channels: {
      email: true,
      push: false,
      whatsapp: false,
    },
    emailAddress: 'bassey.etim@gmail.com',
    frequency: 'daily_digest',
    createdAt: 'Nov 02, 2025',
    active: true,
    matchCount: 1,
  },
  {
    id: 'alert-3',
    name: 'Uniuyo / Use Offot Student Lodges',
    location: 'Use Offot',
    propertyType: 'Student Hostel',
    maxPriceNaira: 300000,
    onlyVerifiedListings: false,
    minRating: 3.0,
    channels: {
      email: false,
      push: true,
      whatsapp: true,
    },
    phoneNumber: '+234 803 456 7890',
    frequency: 'instant',
    createdAt: 'Nov 05, 2025',
    active: true,
    matchCount: 3,
  },
];
