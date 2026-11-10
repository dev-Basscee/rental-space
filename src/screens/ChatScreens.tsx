import React, { useState } from 'react';
import {
  ChevronLeft,
  Send,
  Image,
  ShieldAlert,
  ShieldCheck,
  CheckCheck,
  AlertCircle,
  MapPin,
  Building
} from 'lucide-react';
import { MOCK_CONVERSATIONS, MOCK_CHAT_MESSAGES, CURRENT_USER } from '../data/mockData';
import { Conversation, ChatMessage } from '../types';

interface ChatScreensProps {
  initialView?: 'inbox' | 'thread';
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
  isLoggedIn: boolean;
}

export const ChatScreens: React.FC<ChatScreensProps> = ({
  initialView = 'inbox',
  onNavigate,
  onOpenGuestModal,
  isLoggedIn,
}) => {
  const [view, setView] = useState<'inbox' | 'thread'>(initialView);
  const [selectedConv, setSelectedConv] = useState<Conversation>(MOCK_CONVERSATIONS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'usr_me',
      senderName: CURRENT_USER.name,
      senderAvatar: CURRENT_USER.avatar,
      timestamp: 'Just now',
      text: inputText.trim(),
      isMine: true,
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5">
        
        {/* Toggle between Inbox and Thread in Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {view === 'thread' && (
              <button
                onClick={() => setView('inbox')}
                className="p-1.5 rounded-xl bg-white border border-[#D8CEBE] text-[#2F3626] hover:bg-[#EAE2D6] mr-1"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="font-heading font-extrabold text-2xl text-[#2F3626]">
              {view === 'inbox' ? 'Community Chat Inbox' : selectedConv.participantName}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('inbox')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                view === 'inbox' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              23. Inbox
            </button>
            <button
              onClick={() => setView('thread')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                view === 'thread' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              24. Chat Thread
            </button>
          </div>
        </div>

        {/* ---------------- SCREEN 23: CHAT INBOX ---------------- */}
        {view === 'inbox' && (
          <div className="bg-white rounded-3xl border border-[#EAE2D6] shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[#EAE2D6] bg-[#F7F2EB] flex items-center justify-between text-xs">
              <span className="font-bold text-[#2F3626]">Active Conversations</span>
              <span className="text-[#2F3626]/60">3 unread messages</span>
            </div>

            <div className="divide-y divide-[#EAE2D6]">
              {MOCK_CONVERSATIONS.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => {
                    setSelectedConv(conv);
                    setView('thread');
                  }}
                  className="p-4 sm:p-5 flex items-start gap-3 hover:bg-[#F7F2EB] transition-colors cursor-pointer"
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-12 h-12 rounded-2xl object-cover border border-[#8B9A6E]"
                    />
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B9A6E] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-bold text-sm text-[#2F3626] truncate">
                          {conv.participantName}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B9A6E]/15 text-[#6D7C52] font-semibold shrink-0">
                          {conv.participantRole}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#2F3626]/50 shrink-0 ml-2">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    {conv.propertyContext && (
                      <p className="text-[11px] text-[#8B9A6E] font-semibold truncate mt-0.5">
                        Regarding: {conv.propertyContext.title}
                      </p>
                    )}

                    <p className="text-xs text-[#2F3626]/75 truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 24: CHAT THREAD ---------------- */}
        {view === 'thread' && (
          <div className="bg-white rounded-3xl border border-[#EAE2D6] shadow-sm overflow-hidden flex flex-col h-[580px]">
            {/* Safety Tip Banner */}
            <div className="bg-[#C4684A]/10 border-b border-[#C4684A]/20 p-2.5 px-4 flex items-center justify-between text-xs text-[#C4684A]">
              <span className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Safety Tip: Never pay rent, commitment fees or deposits before inspecting in person!</span>
              </span>
              <span className="text-[11px] font-semibold hidden sm:inline underline cursor-pointer">
                Scam Rules
              </span>
            </div>

            {/* Conversation Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-[#F7F2EB]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    msg.isMine ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!msg.isMine && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs space-y-2 shadow-xs ${
                      msg.isMine
                        ? 'bg-[#8B9A6E] text-white rounded-br-none'
                        : 'bg-white text-[#2F3626] border border-[#EAE2D6] rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>

                    {/* Image sharing inside chat */}
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="Shared in chat"
                        className="rounded-xl w-full h-36 object-cover border border-white/20"
                      />
                    )}

                    {/* Property Card Attached Inside Chat */}
                    {msg.propertyCard && (
                      <div
                        onClick={() => onNavigate('property_detail', msg.propertyCard?.id)}
                        className="p-2.5 rounded-xl bg-white/95 text-[#2F3626] border border-[#D8CEBE] flex items-center gap-2 cursor-pointer hover:bg-white transition-colors"
                      >
                        <img
                          src={msg.propertyCard.image}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-[11px] truncate">
                            {msg.propertyCard.title}
                          </p>
                          <p className="text-[10px] text-[#8B9A6E] font-bold">
                            ₦{(msg.propertyCard.rent / 1000).toLocaleString()}k/yr
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      className={`text-[9px] text-right ${
                        msg.isMine ? 'text-white/70' : 'text-[#2F3626]/50'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#EAE2D6] flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-[#2F3626]/60 hover:text-[#8B9A6E] transition-colors"
                title="Attach photo"
              >
                <Image className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Ask about water pumping, noise, or caution deposit..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
              <button
                type="submit"
                className="p-2.5 rounded-2xl bg-[#8B9A6E] text-white hover:bg-[#6D7C52] transition-colors shadow-sm shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
