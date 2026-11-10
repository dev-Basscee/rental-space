import React, { useState } from 'react';
import {
  MapPin,
  List,
  Search,
  Star,
  CheckCircle2,
  X,
  Navigation as NavIcon,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../data/mockData';
import { Property } from '../types';

interface MapViewProps {
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
}

export const MapView: React.FC<MapViewProps> = ({ onNavigate, onOpenGuestModal }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(MOCK_PROPERTIES[0]);
  const [filterArea, setFilterArea] = useState('All');

  // Simulated coordinate positions on map canvas for Uyo layout
  const mapHotspots = [
    { id: 'prop-1', name: 'Shelter Afrique Flat', x: 70, y: 35, rating: 4.2, price: '₦850k', flood: 'Low' },
    { id: 'prop-2', name: 'Ikot Ekpene Rd Self-Con', x: 30, y: 25, rating: 2.8, price: '₦350k', flood: 'High' },
    { id: 'prop-3', name: 'Ewet Housing Bungalow', x: 55, y: 50, rating: 4.6, price: '₦1.4M', flood: 'Low' },
    { id: 'prop-4', name: 'Use Offot Student Lodge', x: 80, y: 70, rating: 3.5, price: '₦280k', flood: 'Mod' },
    { id: 'prop-5', name: 'Abak Road 2-Bed Flat', x: 25, y: 65, rating: 3.9, price: '₦650k', flood: 'Mod' },
    { id: 'prop-6', name: 'Aka Road Mini Flat', x: 45, y: 80, rating: 4.0, price: '₦450k', flood: 'Low' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#EAE2D6] overflow-hidden flex flex-col pb-24 md:pb-0">
      
      {/* Top Floating Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-md border border-[#D8CEBE] flex items-center gap-2 text-xs">
          <MapPin className="w-4 h-4 text-[#8B9A6E]" />
          <span className="font-bold text-[#2F3626]">Uyo Interactive Map</span>
          <span className="text-[#2F3626]/60 hidden sm:inline">• Tap pins to inspect truth</span>
        </div>

        <button
          onClick={() => onNavigate('search')}
          className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-[#D8CEBE] text-xs font-bold text-[#2F3626] hover:bg-[#EAE2D6] transition-colors flex items-center gap-1.5"
        >
          <List className="w-4 h-4 text-[#8B9A6E]" />
          <span>Switch to List</span>
        </button>
      </div>

      {/* Stylized Interactive Map Canvas (Simulated Vector Map of Uyo) */}
      <div className="relative flex-1 w-full h-[600px] md:h-full bg-[#EAE2D6] overflow-hidden flex items-center justify-center select-none">
        {/* Subtle grid and road lines representing Uyo Ring Roads and Avenues */}
        <svg className="absolute inset-0 w-full h-full stroke-[#D8CEBE] stroke-[2] opacity-70">
          <line x1="0" y1="30%" x2="100%" y2="30%" strokeDasharray="6 6" />
          <line x1="0" y1="65%" x2="100%" y2="65%" strokeDasharray="6 6" />
          <line x1="40%" y1="0" x2="40%" y2="100%" strokeDasharray="6 6" />
          <line x1="75%" y1="0" x2="75%" y2="100%" strokeDasharray="6 6" />
          {/* Uyo Plaza Roundabout */}
          <circle cx="45%" cy="50%" r="55" fill="#F7F2EB" stroke="#8B9A6E" strokeWidth="3" />
        </svg>

        {/* Landmarks Labels on Map */}
        <div className="absolute top-[48%] left-[44%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#6D7C52] uppercase bg-white/80 px-2 py-0.5 rounded-md shadow-xs">
            Ibom Plaza (Center)
          </span>
        </div>
        <div className="absolute top-[18%] left-[20%] text-[10px] font-bold text-[#2F3626]/50 uppercase tracking-wider pointer-events-none">
          Ikot Ekpene Rd Axis
        </div>
        <div className="absolute top-[20%] right-[18%] text-[10px] font-bold text-[#2F3626]/50 uppercase tracking-wider pointer-events-none">
          Shelter Afrique / Oron Rd
        </div>
        <div className="absolute bottom-[22%] right-[15%] text-[10px] font-bold text-[#2F3626]/50 uppercase tracking-wider pointer-events-none">
          Uniuyo Permanent Campus
        </div>
        <div className="absolute bottom-[20%] left-[18%] text-[10px] font-bold text-[#2F3626]/50 uppercase tracking-wider pointer-events-none">
          Abak Rd / Secretariat
        </div>

        {/* Map Pins with Rating Bubbles */}
        {mapHotspots.map((spot) => {
          const prop = MOCK_PROPERTIES.find((p) => p.id === spot.id);
          const isSelected = selectedProperty?.id === spot.id;

          return (
            <div
              key={spot.id}
              style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              onClick={() => prop && setSelectedProperty(prop)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform duration-200 hover:scale-115"
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl shadow-lg border-2 transition-all ${
                  isSelected
                    ? 'bg-[#2F3626] text-white border-[#F3CD6D] scale-110'
                    : spot.rating >= 4.0
                    ? 'bg-[#8B9A6E] text-white border-white'
                    : 'bg-[#C4684A] text-white border-white'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current text-[#F3CD6D]" />
                <span className="text-xs font-bold font-mono">{spot.rating}</span>
                <span className="text-[11px] font-medium border-l border-white/40 pl-1.5">
                  {spot.price}
                </span>
              </div>
              <div
                className={`w-2 h-2 mx-auto rotate-45 -mt-1 ${
                  isSelected
                    ? 'bg-[#2F3626]'
                    : spot.rating >= 4.0
                    ? 'bg-[#8B9A6E]'
                    : 'bg-[#C4684A]'
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Bottom Property Preview Drawer */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 z-30 max-w-lg mx-auto bg-white rounded-3xl p-4 shadow-2xl border border-[#D8CEBE] animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-[10px] font-bold">
                {selectedProperty.propertyType}
              </span>
              <span className="text-xs font-bold text-[#8B9A6E]">
                ₦{(selectedProperty.currentRentNaira / 1000).toLocaleString()}k/yr
              </span>
            </div>
            <button
              onClick={() => setSelectedProperty(null)}
              className="p-1 rounded-full text-[#2F3626]/50 hover:text-[#2F3626]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3">
            <img
              src={selectedProperty.coverPhoto}
              alt={selectedProperty.title}
              className="w-24 h-24 rounded-2xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-heading font-bold text-sm text-[#2F3626] line-clamp-1">
                {selectedProperty.title}
              </h4>
              <p className="text-[11px] text-[#2F3626]/70 line-clamp-1">
                {selectedProperty.address}
              </p>
              
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <span className="font-bold text-[#2F3626] flex items-center gap-0.5">
                  ⭐ {selectedProperty.averageRating}
                </span>
                <span className="text-[#2F3626]/60">({selectedProperty.totalReviews} reviews)</span>
                <span
                  className={`ml-auto font-bold ${
                    selectedProperty.floodRisk === 'Low'
                      ? 'text-[#8B9A6E]'
                      : 'text-[#C4684A]'
                  }`}
                >
                  Flood: {selectedProperty.floodRisk}
                </span>
              </div>

              <button
                onClick={() => onNavigate('property_detail', selectedProperty.id)}
                className="w-full mt-2 py-1.5 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold hover:bg-[#6D7C52] transition-colors flex items-center justify-center gap-1"
              >
                <span>View Real Move-Out Photos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
