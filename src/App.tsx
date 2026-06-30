import React, { useState } from 'react';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import BrowseFoundations from './components/BrowseFoundations';
import FoundationDetailsView from './components/FoundationDetailsView';
import PetProfileView from './components/PetProfileView';
import MatchingQuiz from './components/MatchingQuiz';
import SavedDashboard from './components/SavedDashboard';

import { FOUNDATIONS, PETS } from './data';
import { Donation, Pet } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, Info, Heart, X, Check } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'foundations' | 'find' | 'details' | 'dashboard'>('home');
  const [selectedFoundationId, setSelectedFoundationId] = useState<string | null>(null);
  
  // Interactive pet profile details modal state
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showPetDetailModal, setShowPetDetailModal] = useState<boolean>(false);
  const [adoptSubmit, setAdoptSubmit] = useState<boolean>(false);

  // Filters hand-off from Home Search
  const [searchParams, setSearchParams] = useState({
    searchTerm: '',
    province: 'All Provinces',
    animalType: 'Animal Type'
  });

  // Global Interactive States
  const [likedPetIds, setLikedPetIds] = useState<string[]>(['thong']); // Pre-populate with Thong for interactive dashboard!
  const [dislikedPetIds, setDislikedPetIds] = useState<string[]>([]);
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: 'don-1',
      foundationId: 'happy-tails-haven',
      foundationName: 'Happy Tails Haven',
      amount: 500,
      date: '28 Jun 2026'
    }
  ]); // Pre-populate with a support transaction!

  // Navigation handlers
  const handleHomeSearch = (searchTerm: string, province: string, animalType: string) => {
    setSearchParams({
      searchTerm,
      province,
      animalType
    });
    // Direct user to discovery dashboard
    setCurrentTab('foundations');
  };

  const handleSelectFoundation = (id: string) => {
    setSelectedFoundationId(id);
    setCurrentTab('details');
  };

  const handleSelectPet = (petId: string) => {
    const pet = PETS.find(p => p.id === petId);
    if (pet) {
      setSelectedPet(pet);
      setShowPetDetailModal(true);
    }
  };

  // State mutators
  const handleLikePet = (petId: string) => {
    if (!likedPetIds.includes(petId)) {
      setLikedPetIds(prev => [...prev, petId]);
    }
  };

  const handleDislikePet = (petId: string) => {
    if (!dislikedPetIds.includes(petId)) {
      setDislikedPetIds(prev => [...prev, petId]);
    }
  };

  const handleRemoveLikedPet = (petId: string) => {
    setLikedPetIds(prev => prev.filter(id => id !== petId));
  };

  const handleDonate = (amount: number) => {
    if (!selectedFoundationId) return;
    const foundation = FOUNDATIONS.find(f => f.id === selectedFoundationId);
    if (!foundation) return;

    const newDonation: Donation = {
      id: `don-${Date.now()}`,
      foundationId: foundation.id,
      foundationName: foundation.name,
      amount,
      date: new Date().toLocaleDateString('en-TH', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setDonations(prev => [newDonation, ...prev]);
  };

  // Tab mode for Find a Pet view (tinder swiper vs matching quiz)
  const [findMode, setFindMode] = useState<'swiper' | 'quiz'>('swiper');

  // Map Liked IDs to Pet models
  const likedPets = PETS.filter(p => likedPetIds.includes(p.id));

  // Determine current foundation detailed profile
  const currentFoundation = FOUNDATIONS.find(f => f.id === selectedFoundationId) || FOUNDATIONS[0];

  return (
    <div className="min-h-screen flex flex-col relative bg-[#fdf9f3] text-[#1c1c18] paw-pattern selection:bg-[#ffdbc9]">
      
      {/* Universal Sticky Header Navigation */}
      <TopNavBar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // Auto clean details states when switching tabs
          if (tab !== 'details') {
            setSelectedFoundationId(null);
          }
        }} 
        savedLikedCount={likedPetIds.length}
      />

      {/* Main Screen Router with smooth fading entry triggers */}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-grow flex flex-col"
          >
            {currentTab === 'home' && (
              <HeroSection onSearch={handleHomeSearch} />
            )}

            {currentTab === 'foundations' && (
              <BrowseFoundations 
                foundations={FOUNDATIONS}
                onSelectFoundation={handleSelectFoundation}
                initialProvince={searchParams.province}
                initialAnimalType={searchParams.animalType}
                initialSearchTerm={searchParams.searchTerm}
              />
            )}

            {currentTab === 'details' && selectedFoundationId && (
              <FoundationDetailsView
                foundation={currentFoundation}
                pets={PETS}
                onBack={() => setCurrentTab('foundations')}
                onSelectPet={handleSelectPet}
                onDonate={handleDonate}
              />
            )}

            {currentTab === 'find' && (
              <div className="flex-grow flex flex-col">
                {/* Switch view headers toggle */}
                <div className="w-full bg-[#f1ede7]/60 border-b border-[#ddc1b3]/40 py-3 px-6 flex justify-center gap-4">
                  <button
                    onClick={() => setFindMode('swiper')}
                    className={`cursor-pointer px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all ${
                      findMode === 'swiper'
                        ? 'bg-[#9b4500] text-white shadow-md'
                        : 'bg-white text-[#564338] border border-[#ddc1b3]/40 hover:bg-[#f1ede7]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">style</span>
                    Swipe Matcher Deck
                  </button>
                  
                  <button
                    onClick={() => setFindMode('quiz')}
                    className={`cursor-pointer px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all ${
                      findMode === 'quiz'
                        ? 'bg-[#9b4500] text-white shadow-md'
                        : 'bg-white text-[#564338] border border-[#ddc1b3]/40 hover:bg-[#f1ede7]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Take matching Quiz
                  </button>
                </div>

                {findMode === 'swiper' ? (
                  <PetProfileView
                    pets={PETS}
                    onLikePet={handleLikePet}
                    onDislikePet={handleDislikePet}
                    likedPets={likedPetIds}
                    dislikedPets={dislikedPetIds}
                  />
                ) : (
                  <MatchingQuiz
                    pets={PETS}
                    onSelectPet={handleSelectPet}
                    onSaveQuizResult={(matchedIds) => {
                      // Automatically put matched items into swipe pipeline as options
                      console.log("Matched IDs computed: ", matchedIds);
                    }}
                  />
                )}
              </div>
            )}

            {currentTab === 'dashboard' && (
              <SavedDashboard
                likedPets={likedPets}
                donations={donations}
                onRemoveLikedPet={handleRemoveLikedPet}
                onSelectPet={handleSelectPet}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding Navigation */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Unified Pet Detail Dialog Modal Popup */}
      <AnimatePresence>
        {showPetDetailModal && selectedPet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fdf9f3] max-w-[650px] w-full rounded-2xl shadow-2xl border border-[#ddc1b3] overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={() => { setShowPetDetailModal(false); setAdoptSubmit(false); }}
                className="absolute top-4 right-4 bg-white/80 text-[#1c1c18] hover:text-[#ba1a1a] p-1.5 rounded-full z-20 cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side (Image) */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedPet.mainImage} 
                  alt={selectedPet.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold font-display">{selectedPet.name}</h3>
                  <p className="text-xs opacity-90">{selectedPet.breed} • {selectedPet.age}</p>
                </div>
              </div>

              {/* Right Side (Backstory details / adoption form) */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between max-h-[500px] overflow-y-auto custom-scrollbar">
                {!adoptSubmit ? (
                  <div>
                    <span className="bg-[#b7eaff] text-[#004e61] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                      {selectedPet.location}
                    </span>
                    <h4 className="text-base font-bold text-[#9b4500] mb-2 font-display">Backstory Detail</h4>
                    <p className="text-xs text-[#564338] leading-relaxed mb-4 italic">
                      {selectedPet.about}
                    </p>
                    <p className="text-xs text-[#564338] leading-relaxed mb-4">
                      {selectedPet.longAbout || "น้องนิสัยน่ารักมาก พลังงานบวกล้นหลาม สุขภาพแข็งแรง ได้รับการตรวจโรคและฉีดวัคซีนป้องกันพื้นฐานครบถ้วนแล้วครับ"}
                    </p>

                    {/* Checkbox attributes */}
                    <div className="grid grid-cols-2 gap-2 mb-6 text-[11px] text-[#1c1c18] font-bold">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-[#006d41]">check_circle</span>
                        Vaccinated
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-[#006d41]">check_circle</span>
                        Neutered
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-[#006d41]">check_circle</span>
                        House Trained
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-[#006d41]">check_circle</span>
                        Good with Kids
                      </div>
                    </div>

                    <button
                      onClick={() => setAdoptSubmit(true)}
                      className="w-full bg-[#006d41] hover:bg-[#005230] text-white font-bold py-3 rounded-full text-xs transition-colors cursor-pointer"
                    >
                      Apply to Adopt {selectedPet.name}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6 flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 bg-[#006d41]/10 rounded-full flex items-center justify-center text-[#006d41] mb-3">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-[#006d41] mb-1">Request Dispatched!</h4>
                    <p className="text-xs text-[#564338] leading-relaxed max-w-xs mx-auto mb-6">
                      An adoption counselor representing the shelter will contact you shortly to complete verification. Thank you!
                    </p>
                    <button
                      onClick={() => { setShowPetDetailModal(false); setAdoptSubmit(false); }}
                      className="bg-[#9b4500] hover:bg-[#ff8c42] text-white font-bold py-2 px-6 rounded-full text-xs cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
