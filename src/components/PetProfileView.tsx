import React, { useState } from 'react';
import { Pet } from '../types';
import { ShieldCheck, Heart, X, Info, Check, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';

interface PetProfileViewProps {
  pets: Pet[];
  onLikePet: (petId: string) => void;
  onDislikePet: (petId: string) => void;
  likedPets: string[];
  dislikedPets: string[];
}

export default function PetProfileView({
  pets,
  onLikePet,
  onDislikePet,
  likedPets,
  dislikedPets
}: PetProfileViewProps) {
  // Filter out already liked/disliked pets from current deck
  const activeDeck = pets.filter(p => !likedPets.includes(p.id) && !dislikedPets.includes(p.id));
  const currentPet = activeDeck[0] || null;

  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [adoptFormSubmitted, setAdoptFormSubmitted] = useState(false);

  // Swipe gesture values via Motion
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-15, 15]);
  const opacityLike = useTransform(x, [20, 100], [0, 1]);
  const opacityNope = useTransform(x, [-100, -20], [1, 0]);

  // Action Triggers
  const handleLike = () => {
    if (!currentPet) return;
    onLikePet(currentPet.id);
  };

  const handleDislike = () => {
    if (!currentPet) return;
    onDislikePet(currentPet.id);
  };

  const handleResetDeck = () => {
    // Refresh the deck by resetting state handled by parent (passed via props)
    // We'll let the user click to clear arrays
    alert("Deck reset successfully! Go back to matching or swipe again. ❤️");
    window.location.reload(); // Simple instant clean state refresh
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-6 flex flex-col items-center justify-center relative min-h-[calc(100vh-100px)]">
      {/* Decorative background paw patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #FF8C42 2px, transparent 2px), radial-gradient(circle at 80% 70%, #006d41 2px, transparent 2px)", backgroundSize: '100px 100px' }}></div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side: Profile Card (Swipe Area) */}
        <div className="relative w-full aspect-[3/4] max-h-[580px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentPet ? (
              <motion.div
                key={currentPet.id}
                style={{ x, rotate }}
                drag="x"
                dragConstraints={{ left: -300, right: 300 }}
                onDragEnd={(event, info) => {
                  if (info.offset.x > 140) {
                    handleLike();
                  } else if (info.offset.x < -140) {
                    handleDislike();
                  }
                }}
                className="w-full h-full bg-white rounded-2xl shadow-xl border border-[#ddc1b3]/40 overflow-hidden relative flex flex-col cursor-grab active:cursor-grabbing hover:shadow-2xl transition-shadow duration-300 select-none"
              >
                {/* Main image area */}
                <div className="h-3/4 w-full relative">
                  <img
                    alt={currentPet.name}
                    className="w-full h-full object-cover pointer-events-none"
                    src={currentPet.mainImage}
                  />
                  {/* Dark gradient overlay for typography readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Top floating badges overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-[#006d41] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {currentPet.breed}
                    </span>
                    <span className="bg-[#ff8c42] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {currentPet.location}
                    </span>
                  </div>
                </div>

                {/* Bottom info banner section */}
                <div className="h-1/4 bg-white p-4 flex flex-col justify-between relative -mt-4 z-10 rounded-t-2xl">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold font-display text-[#1c1c18] flex items-baseline gap-2">
                      {currentPet.name}
                      <span className="text-base text-[#564338] font-normal">{currentPet.age}</span>
                    </h2>
                    <p className="text-xs text-[#564338] mt-1 line-clamp-1 italic">
                      {currentPet.about}
                    </p>
                  </div>
                </div>

                {/* Left/Right Floating Swipe Indicators (LIKE vs NOPE stamps) */}
                <motion.div 
                  style={{ opacity: opacityLike }} 
                  className="absolute top-1/4 left-6 text-[#006d41] border-4 border-[#006d41] px-4 py-1.5 rounded-xl font-bold text-3xl font-display rotate-[-15deg] pointer-events-none z-30"
                >
                  LIKE
                </motion.div>
                
                <motion.div 
                  style={{ opacity: opacityNope }} 
                  className="absolute top-1/4 right-6 text-[#ba1a1a] border-4 border-[#ba1a1a] px-4 py-1.5 rounded-xl font-bold text-3xl font-display rotate-[15deg] pointer-events-none z-30"
                >
                  NOPE
                </motion.div>

                {/* Swipe Action Buttons overlayed on card */}
                <div className="absolute bottom-4 w-full flex justify-center gap-6 px-4 z-20">
                  <button
                    onClick={handleDislike}
                    className="w-12 h-12 bg-white border-2 border-[#ba1a1a] rounded-full flex items-center justify-center text-[#ba1a1a] hover:bg-[#ffdad6] transition-all shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                    title="Skip (Nope)"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={() => setShowInfoPanel(!showInfoPanel)}
                    className="w-10 h-10 bg-white border border-[#ddc1b3] rounded-full flex items-center justify-center text-[#564338] hover:bg-[#f1ede7] transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer mt-1"
                    title="Toggle details backstory"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleLike}
                    className="w-12 h-12 bg-white border-2 border-[#006d41] rounded-full flex items-center justify-center text-[#006d41] hover:bg-[#95f7bb]/40 transition-all shadow-md hover:scale-110 active:scale-95 cursor-pointer"
                    title="Love (Like)"
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full bg-white rounded-2xl shadow-xl border border-[#ddc1b3]/40 p-8 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-5xl text-[#ff8c42] mb-4 animate-bounce">
                  volunteer_activism
                </span>
                <h3 className="font-display text-xl font-bold text-[#1c1c18] mb-2">No More Pets in This Deck!</h3>
                <p className="text-sm text-[#564338] mb-6 leading-relaxed">
                  You have swiped through all available pets. Check your saved dashboard to review your matches or reset the list!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleResetDeck}
                    className="bg-[#9b4500] hover:bg-[#ff8c42] text-white font-bold py-2.5 px-6 rounded-full text-xs cursor-pointer"
                  >
                    Reset Swipe Deck
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Backstory and Details Panel */}
        <div className="flex flex-col gap-6 h-full justify-center md:pl-6">
          <AnimatePresence mode="wait">
            {currentPet && showInfoPanel ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-[#f1ede7] rounded-xl p-6 shadow-sm border border-[#ddc1b3]/50">
                  <h3 className="text-xl font-bold font-display text-[#9b4500] mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-[#ff8c42]" />
                    About {currentPet.name}
                  </h3>
                  <p className="text-sm text-[#564338] leading-relaxed mb-4 italic font-semibold">
                    {currentPet.about}
                  </p>
                  <p className="text-sm text-[#564338] leading-relaxed">
                    {currentPet.longAbout || "น้องกระตือรือร้น ร่าเริง นิสัยดี อ่อนโยน แข็งแรงสมบูรณ์ รอผู้ใจบุญพากลับบ้านเพื่อไปเป็นครอบครัวที่แสนสุขด้วยกันครับ"}
                  </p>
                </div>

                {/* Checklist badging stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f7f3ed] p-3.5 rounded-xl border border-[#ddc1b3]/40 flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#006780] font-bold text-lg">
                      vaccines
                    </span>
                    <span className="text-xs font-semibold text-[#1c1c18]">
                      {currentPet.vaccinated ? 'Vaccinated' : 'Under vaccination'}
                    </span>
                  </div>

                  <div className="bg-[#f7f3ed] p-3.5 rounded-xl border border-[#ddc1b3]/40 flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#006780] font-bold text-lg">
                      male
                    </span>
                    <span className="text-xs font-semibold text-[#1c1c18]">
                      {currentPet.neutered ? 'Neutered' : 'Not Neutered'}
                    </span>
                  </div>

                  <div className="bg-[#f7f3ed] p-3.5 rounded-xl border border-[#ddc1b3]/40 flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#006780] font-bold text-lg">
                      home
                    </span>
                    <span className="text-xs font-semibold text-[#1c1c18]">
                      {currentPet.houseTrained ? 'House Trained' : 'Needs Training'}
                    </span>
                  </div>

                  <div className="bg-[#f7f3ed] p-3.5 rounded-xl border border-[#ddc1b3]/40 flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#006780] font-bold text-lg">
                      child_care
                    </span>
                    <span className="text-xs font-semibold text-[#1c1c18]">
                      {currentPet.goodWithKids ? 'Good with Kids' : 'Best for Adults'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowAdoptModal(true)}
                  className="w-full py-3.5 bg-[#9b4500] hover:bg-[#ff8c42] text-white rounded-full font-bold text-sm shadow-md transition-all text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  Read Full Profile & Adopt
                </button>
              </motion.div>
            ) : (
              <div className="bg-[#f7f3ed] p-8 rounded-xl border border-[#ddc1b3]/40 text-center">
                <span className="material-symbols-outlined text-4xl text-[#564338]/60 mb-2">info</span>
                <p className="font-semibold text-sm text-[#1c1c18]">Backstory Hidden</p>
                <p className="text-xs text-[#564338] mt-1">Click the "i" info button on the card overlay to show detailed descriptions and vaccine records!</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Adoption Form Modal (PopUp overlay) */}
      <AnimatePresence>
        {showAdoptModal && currentPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fdf9f3] max-w-[500px] w-full rounded-2xl shadow-2xl border border-[#ddc1b3] p-6 relative"
            >
              <button
                onClick={() => { setShowAdoptModal(false); setAdoptFormSubmitted(false); }}
                className="absolute top-4 right-4 text-[#564338] hover:text-[#ba1a1a] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {!adoptFormSubmitted ? (
                <div>
                  <h3 className="text-xl font-bold font-display text-[#9b4500] mb-2 flex items-center gap-1.5">
                    Adopt {currentPet.name}
                  </h3>
                  <p className="text-xs text-[#564338] mb-4">
                    Send an adoption request directly to PAWS / Soi Dog. A verified representative will review and contact you within 48 hours!
                  </p>

                  <form onSubmit={(e) => { e.preventDefault(); setAdoptFormSubmitted(true); }} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1c1c18] uppercase tracking-wide mb-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="John Doe"
                        className="w-full bg-[#f1ede7]/50 border border-[#ddc1b3] rounded-lg py-2.5 px-3 text-sm text-[#1c1c18] focus:ring-2 focus:ring-[#ff8c42] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#1c1c18] uppercase tracking-wide mb-1">Contact Phone</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="08X-XXX-XXXX"
                          className="w-full bg-[#f1ede7]/50 border border-[#ddc1b3] rounded-lg py-2.5 px-3 text-sm text-[#1c1c18] focus:ring-2 focus:ring-[#ff8c42] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1c1c18] uppercase tracking-wide mb-1">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="john@example.com"
                          className="w-full bg-[#f1ede7]/50 border border-[#ddc1b3] rounded-lg py-2.5 px-3 text-sm text-[#1c1c18] focus:ring-2 focus:ring-[#ff8c42] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1c1c18] uppercase tracking-wide mb-1">Why do you want to adopt?</label>
                      <textarea 
                        rows={3}
                        required 
                        placeholder="Describe your living environment, garden space, or experience with pets..."
                        className="w-full bg-[#f1ede7]/50 border border-[#ddc1b3] rounded-lg py-2 px-3 text-sm text-[#1c1c18] focus:ring-2 focus:ring-[#ff8c42] outline-none resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#006d41] hover:bg-[#005230] text-white font-bold rounded-full text-xs cursor-pointer transition-colors mt-2"
                    >
                      Submit Adoption Application
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-[#006d41]/10 rounded-full flex items-center justify-center text-[#006d41] mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-[#006d41] mb-1">Application Submitted!</h4>
                  <p className="text-xs text-[#564338] max-w-sm mx-auto leading-relaxed mb-6">
                    Thank you! Your information has been securely dispatched to the shelter managing {currentPet.name}. We will touch base via email/phone soon.
                  </p>
                  <button
                    onClick={() => { setShowAdoptModal(false); setAdoptFormSubmitted(false); }}
                    className="bg-[#9b4500] hover:bg-[#ff8c42] text-white font-bold py-2 px-6 rounded-full text-xs cursor-pointer"
                  >
                    Back to Swipe Deck
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
