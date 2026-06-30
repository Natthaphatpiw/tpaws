import React, { useState } from 'react';
import { Pet, Donation } from '../types';
import { Heart, CreditCard, Calendar, Trash2, Send, MessageSquare, AlertCircle, Sparkles, UserCheck, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SavedDashboardProps {
  likedPets: Pet[];
  donations: Donation[];
  onRemoveLikedPet: (petId: string) => void;
  onSelectPet: (petId: string) => void;
}

export default function SavedDashboard({
  likedPets,
  donations,
  onRemoveLikedPet,
  onSelectPet
}: SavedDashboardProps) {
  const [activeChatPet, setActiveChatPet] = useState<Pet | null>(null);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'pet'; text: string; time: string }[]>([]);

  // Calculate sum of donations
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  // Chat reply templates tailored to individual pet personalities
  const getPetReply = (petName: string, msg: string): string => {
    const lowercaseMsg = msg.toLowerCase();
    
    if (petName === 'เจ้าทอง') {
      if (lowercaseMsg.includes('สวัสดี') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hello')) {
        return 'โฮ่งๆ! สวัสดีครับพี่ใจดี ผมสลัดความง่วงมาคุยเลยนะเนี่ย สบายดีไหมครับ? 🐾';
      }
      if (lowercaseMsg.includes('กิน') || lowercaseMsg.includes('อาหาร') || lowercaseMsg.includes('ลูกบอล')) {
        return 'ผมวิ่งเก็บลูกบอลเก่งมากกกก! แล้วก็ชอบกินขนมตับอบแห้งที่สุดเลย พี่มีติดมือมาฝากผมบ้างไหมนะ? 🎾🍖';
      }
      return 'เจ้าทองดีใจจังที่มีคนคุยด้วย! ผมรอพี่มารับผมไปเลี้ยงอยู่นะครับ ผมร่าเริงและสัญญาจะไม่ดื้อเลยครับ! โฮ่ง!';
    }
    
    if (petName === 'Milo') {
      if (lowercaseMsg.includes('hi') || lowercaseMsg.includes('hello') || lowercaseMsg.includes('สวัสดี')) {
        return 'Bark! Hi there! I am Milo, the coolest puppy in Chiang Mai! Want to play with me right now? 🐕✨';
      }
      return 'Yip! I just finished chasing a butterfly in the grass! I have so much energy and I would love to run with you all day! 🦋';
    }

    if (petName === 'Bella') {
      return 'Woof... Hello dear friend. I am Bella. I am taking a peaceful afternoon nap right now under a warm tree, but I am sending you a soft hug. Thank you for thinking of me. 🌸';
    }

    return `Woof! Hello! I am ${petName}. I am super happy that you added me to your favorite list. Let's meet at the sanctuary soon! ❤️`;
  };

  const handleStartChat = (pet: Pet) => {
    setActiveChatPet(pet);
    // Initialize chat logs with a customized greeting
    const greeting = pet.name === 'เจ้าทอง' 
      ? 'โฮ่งๆ! ขอบคุณที่ถูกใจผมนะครับพี่ใจดี มีอะไรอยากถามเจ้าทองไหมครับ?' 
      : `Woof! Thank you for liking me! I am ${pet.name}. Ask me anything about my favorite treats or naps!`;
    
    setChatLog([
      { sender: 'pet', text: greeting, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !activeChatPet) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = chatMessage;
    
    // Add User message
    const updatedLog = [...chatLog, { sender: 'user' as const, text: userMsg, time: userTime }];
    setChatLog(updatedLog);
    setChatMessage('');

    // Simulate Pet reply with a short delay
    setTimeout(() => {
      const petReplyText = getPetReply(activeChatPet.name, userMsg);
      const petTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChatLog(prev => [...prev, { sender: 'pet' as const, text: petReplyText, time: petTime }]);
    }, 700);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-8 relative paw-pattern min-h-screen">
      
      {/* Dashboard Top Header Overview */}
      <section className="bg-white rounded-2xl border border-[#ddc1b3]/60 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#ffdbc9] flex items-center justify-center text-[#9b4500]">
            <span className="material-symbols-outlined text-4xl">account_circle</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1c1c18] font-display">My Sanctuary Profile</h1>
            <p className="text-sm text-[#564338]">peonypiwpiw@gmail.com • Supporter Status</p>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="flex gap-4 w-full md:w-auto">
          <div className="bg-[#f7f3ed] p-4 rounded-xl border border-[#ddc1b3]/40 text-center flex-1 md:flex-none md:w-40 shadow-inner">
            <span className="block text-[#9b4500] font-display text-2xl font-extrabold">{likedPets.length}</span>
            <span className="text-[11px] font-bold text-[#564338] uppercase tracking-wider">Favorites</span>
          </div>
          <div className="bg-[#f7f3ed] p-4 rounded-xl border border-[#ddc1b3]/40 text-center flex-1 md:flex-none md:w-48 shadow-inner">
            <span className="block text-[#006d41] font-display text-2xl font-extrabold">{totalDonations.toLocaleString()} ฿</span>
            <span className="text-[11px] font-bold text-[#564338] uppercase tracking-wider">Donated Sum</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Saved Pets & Donation History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Saved/Liked Pets List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex justify-between items-baseline">
            <h2 className="text-xl font-bold font-display text-[#9b4500] flex items-center gap-1.5">
              <Heart className="w-5 h-5 text-[#ff8c42] fill-current" />
              My Favorite Pets
            </h2>
            <span className="text-xs text-[#564338] font-semibold">Click a pet to chat!</span>
          </div>

          {likedPets.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#ddc1b3]/50 p-12 text-center shadow-sm">
              <span className="material-symbols-outlined text-5xl text-[#564338]/60 mb-3">pets</span>
              <h3 className="font-display font-bold text-lg text-[#1c1c18]">Your Favorite List is Empty</h3>
              <p className="text-sm text-[#564338] max-w-sm mx-auto mt-1 leading-relaxed">
                Go to the swiper deck or take the matching quiz to find and save sweet furry friends waiting for a family!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {likedPets.map((pet) => (
                <div
                  key={pet.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#ddc1b3]/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="flex gap-4 p-4">
                    <img
                      src={pet.mainImage}
                      alt={pet.name}
                      className="w-20 h-20 rounded-lg object-cover border border-[#ddc1b3]/30"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold font-display text-[#1c1c18] text-base">{pet.name}</h3>
                        <span className="text-[11px] text-[#564338]">{pet.age}</span>
                      </div>
                      <p className="text-[11px] text-[#006d41] font-bold mb-2">{pet.breed}</p>
                      
                      {/* Tags */}
                      <div className="flex gap-1.5 flex-wrap">
                        {pet.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="bg-[#f1ede7] text-[#564338] text-[9px] px-2 py-0.5 rounded font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer buttons of card */}
                  <div className="bg-[#fdf9f3] p-3 border-t border-[#ddc1b3]/30 flex gap-2">
                    <button
                      onClick={() => handleStartChat(pet)}
                      className="flex-1 bg-[#006d41] hover:bg-[#005230] text-white py-2 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Chat with Buddy
                    </button>
                    
                    <button
                      onClick={() => onSelectPet(pet.id)}
                      className="bg-[#f1ede7] hover:bg-[#ddc1b3]/40 text-[#564338] p-2 rounded-full cursor-pointer"
                      title="View Profile Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onRemoveLikedPet(pet.id)}
                      className="bg-[#ffdad6] hover:bg-[#ba1a1a] hover:text-white text-[#ba1a1a] p-2 rounded-full transition-colors cursor-pointer"
                      title="Remove Favorite"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Donation History Sidebar (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h2 className="text-xl font-bold font-display text-[#9b4500] flex items-center gap-1.5">
            <CreditCard className="w-5 h-5 text-[#ff8c42]" />
            Donation History
          </h2>

          <div className="bg-white rounded-2xl border border-[#ddc1b3]/60 p-4 shadow-sm flex flex-col gap-4">
            {donations.length === 0 ? (
              <div className="text-center py-10 text-[#564338]/80 text-xs">
                <AlertCircle className="w-8 h-8 text-[#564338]/60 mx-auto mb-2" />
                No transactions recorded yet. Support animal shelters by donating today!
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
                {donations.map((donation) => (
                  <div
                    key={donation.id}
                    className="p-3 bg-[#f7f3ed] rounded-xl border border-[#ddc1b3]/40 flex justify-between items-center text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-[#1c1c18]">{donation.foundationName}</h4>
                      <span className="text-[10px] text-[#564338] flex items-center gap-0.5 mt-0.5">
                        <Calendar className="w-3 h-3 text-[#ff8c42]" />
                        {donation.date}
                      </span>
                    </div>
                    <span className="font-extrabold text-[#006d41] bg-[#95f7bb]/30 px-2.5 py-1 rounded-full border border-[#006d41]/10">
                      +{donation.amount.toLocaleString()} ฿
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Interactive Chat overlay component */}
      <AnimatePresence>
        {activeChatPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs p-4">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-[#fdf9f3] w-full max-w-[450px] h-full max-h-[600px] rounded-2xl shadow-2xl border border-[#ddc1b3] flex flex-col overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-[#006d41] p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={activeChatPet.mainImage}
                    alt={activeChatPet.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/40"
                  />
                  <div>
                    <h3 className="font-bold font-display text-sm">{activeChatPet.name}</h3>
                    <span className="text-[10px] text-white/80 font-bold flex items-center gap-0.5">
                      <Sparkles className="w-3 h-3 text-[#ff8c42]" />
                      Active • Chatting via PawLink
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveChatPet(null)}
                  className="text-white/80 hover:text-white font-bold cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Chat Message Logs Area */}
              <div className="flex-grow p-4 overflow-y-auto custom-scrollbar flex flex-col gap-3 bg-white/50">
                {chatLog.map((log, index) => {
                  const isUser = log.sender === 'user';
                  return (
                    <div
                      key={index}
                      className={`flex flex-col max-w-[80%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
                    >
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-[#9b4500] text-white rounded-tr-none'
                            : 'bg-[#f1ede7] text-[#1c1c18] rounded-tl-none border border-[#ddc1b3]/40'
                        }`}
                      >
                        {log.text}
                      </div>
                      <span className="text-[9px] text-[#564338]/60 mt-1 px-1 font-bold">{log.time}</span>
                    </div>
                  );
                })}
              </div>

              {/* Message input panel */}
              <form onSubmit={handleSendMessage} className="p-3 bg-[#fdf9f3] border-t border-[#ddc1b3]/40 flex gap-2">
                <input
                  type="text"
                  placeholder={`พิมพ์ข้อความคุยกับ ${activeChatPet.name}...`}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-grow bg-white border border-[#ddc1b3] rounded-full py-2.5 px-4 text-xs focus:ring-2 focus:ring-[#006d41] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#006d41] hover:bg-[#005230] text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple X icon replacement
function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
