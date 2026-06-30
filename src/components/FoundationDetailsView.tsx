import React, { useState } from 'react';
import { Foundation, Pet } from '../types';
import { Heart, Share2, Shield, Calendar, ArrowLeft, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FoundationDetailsViewProps {
  foundation: Foundation;
  pets: Pet[];
  onBack: () => void;
  onSelectPet: (petId: string) => void;
  onDonate: (amount: number) => void;
}

export default function FoundationDetailsView({
  foundation,
  pets,
  onBack,
  onSelectPet,
  onDonate
}: FoundationDetailsViewProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [receiptAmount, setReceiptAmount] = useState<number>(0);

  // Filter adoptable pets belonging to this foundation
  const foundationPets = pets.filter(p => p.foundationId === foundation.id);

  // Handle donation submission
  const handleDonateNow = () => {
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    if (isNaN(amount) || amount <= 0) {
      alert('Please select or input a valid donation amount! ❤️');
      return;
    }
    
    // Call props to add donation history
    onDonate(amount);
    
    // Set state for receipt modal popup
    setReceiptAmount(amount);
    setShowReceipt(true);
    
    // Clear inputs
    setCustomAmount('');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Support ${foundation.name}`,
        text: `Join me in supporting vulnerable animals at ${foundation.name}!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback copy
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it with your friends to spread the love! 🐾');
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-8 relative paw-pattern min-h-screen">
      {/* Back navigation button */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#9b4500] hover:text-[#ff8c42] bg-[#ffdbc9]/40 py-2 px-4 rounded-full transition-all cursor-pointer border border-[#ddc1b3]/30"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Discovery
      </button>

      {/* Hero Banner Section */}
      <section className="w-full h-[380px] md:h-[460px] rounded-2xl overflow-hidden relative shadow-md mb-8">
        <img
          alt={foundation.name}
          className="w-full h-full object-cover"
          src={foundation.bannerImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-2 tracking-tight">
            {foundation.name}
          </h1>
          <p className="text-base md:text-lg opacity-90 max-w-3xl leading-relaxed">
            {foundation.description}
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Area (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Mission Card */}
          <section className="bg-white p-6 md:p-8 rounded-2xl border border-[#ddc1b3]/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 text-[#9b4500] pointer-events-none">
              <span className="material-symbols-outlined text-[100px]">favorite</span>
            </div>
            
            <h2 className="text-2xl font-bold font-display text-[#9b4500] mb-4 flex items-center gap-1.5">
              <Shield className="w-6 h-6 text-[#006d41]" />
              Our Mission
            </h2>
            <p className="text-base text-[#1c1c18] mb-6 leading-relaxed">
              {foundation.mission}
            </p>
            
            <div className="flex items-center gap-1.5 text-[#564338]/80 text-xs font-semibold bg-[#f1ede7]/60 py-2 px-3.5 rounded-full inline-flex border border-[#ddc1b3]/30">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Official Registration No: {foundation.verifiedNo}</span>
            </div>
          </section>

          {/* Recent Activities Gallery Section */}
          <section>
            <h3 className="text-xl font-bold font-display text-[#1c1c18] mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#006780]" />
              Recent Activities &amp; Rescues
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="rounded-xl overflow-hidden h-40 border border-[#ddc1b3]/50 shadow-sm relative group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF9kr10i-opD5ZkuZR-AVrZkscbINECquOPatY1nF5wVb8E4HlUUFGFFlk9er7zgVD3GouSLvPT7dYMW7QS6urfHO6Jaa84KhHeob56PnP_ijSt9CPk5mPClg1qvGtjAK-QppeF9DoUwo2RVMn53VIEOLdYw7gEFppKolR2TOMz0AynWRXZxzWihjPxmtG5jupkuAVBYs9dzMByGBPXZ6aBm4cCHJhSzBE1Fxhzp1WQmzxUdYy53G2FTV_Ql_nP18Q6El22glbJOw"
                  alt="Volunteer bathing" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[10px] text-white font-bold">Volunteer Bathing Sessions</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-40 border border-[#ddc1b3]/50 shadow-sm relative group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4vc9jr1B5BIuYV7g2AxjZjx4EyMVlVlbKrHVuhyYrtonSuTAzlHOAM3C9IRXHx51Odtec9JwJjhomtsKYoO1v10VSm0FSzNuZvD5EubO252ioj_ctuUFnc0eKVHvL4HzP0oA0o6K0k84xVNsvHGtZzdS8PI6piYO88JjGCdJoodltf1nvetQgPZulBWzK7-AQfUcdMlQYxTn-iRQDWzKVO3xKbKIL4uK2bHHGXtjCflZicahSms7zpEkZJyRtN2qH2l83RA1SvzY"
                  alt="Community adoption event" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[10px] text-white font-bold">Community Adoption Fairs</span>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden h-40 border border-[#ddc1b3]/50 shadow-sm relative group col-span-2 md:col-span-1">
                <img 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFeLwTI30oB_YQMkCgr5UCtaMlkIy25me_mLIGJOlHek-6Ie16lmLluX8EgNKlXRkWGZNUeLGBx17mk2Jv3eGP7DE1mLw2RfiOl8cuYbFlU2t6qpmwRY6eWBRnN_3C04gtE26Y3TpKmaECAPHCWqMF9jjvm_hl9D9-NNJC_2hpGyibdHWK4p_aIMahjt4MhOxNri88CtozbHt025XW1tdOD6l2fk94Ct4HZOrRiOPh1nQuTCFDnAgtzHrpQh-gaoQfdqdqJKYLeMs"
                  alt="Rehabilitated rescue dog" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                  <span className="text-[10px] text-white font-bold">Rehabilitation Recovery Programs</span>
                </div>
              </div>
            </div>
          </section>

          {/* Pets Waiting List (น้องๆ ที่กำลังรอคอย) */}
          <section className="mt-2">
            <h3 className="text-xl font-bold font-display text-[#1c1c18] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9b4500]">pets</span>
              น้องๆ ที่กำลังรอคอยความรัก (Adoptable Buddies)
            </h3>

            {foundationPets.length === 0 ? (
              <div className="bg-[#f7f3ed] p-6 rounded-2xl border border-[#ddc1b3]/50 text-center text-[#564338]">
                Currently all rescued friends have successfully matched or are under recovery care! Support us to help rescue more animals.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {foundationPets.map((pet) => (
                  <div
                    key={pet.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#ddc1b3]/60 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="h-56 relative overflow-hidden border-b border-[#ddc1b3]/20 group">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={pet.mainImage}
                        alt={pet.name}
                      />
                      <div className="absolute top-3 right-3 bg-[#006d41] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {pet.breed}
                      </div>
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="text-xl font-bold font-display text-[#1c1c18]">{pet.name}</h4>
                          <span className="text-[#564338] text-xs font-semibold">{pet.age}</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap mb-4">
                          {pet.tags.map((tag, i) => (
                            <span key={i} className="bg-[#f1ede7] text-[#564338] text-[11px] px-2.5 py-0.5 rounded-full font-semibold">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectPet(pet.id)}
                        className="w-full py-2.5 rounded-full border-2 border-[#006d41] text-[#006d41] font-bold text-xs hover:bg-[#006d41] hover:text-white transition-colors cursor-pointer text-center"
                      >
                        Meet {pet.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* Right Side Sidebar Widget Area (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-[100px] bg-white p-6 rounded-2xl border border-[#ddc1b3] shadow-lg flex flex-col gap-6">
            
            {/* Donation Area */}
            <div>
              <h3 className="text-xl font-bold font-display text-[#9b4500] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                บริจาคให้มูลนิธินี้
              </h3>
              <p className="text-xs text-[#564338] leading-relaxed">
                Your kind contribution directly provides food, cage-free shelter, and urgent medical operations for our rescued street friends.
              </p>
            </div>

            {/* Quick pre-defined amounts buttons */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-3 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'border-[#ff8c42] bg-[#ffdbc9]/40 text-[#9b4500]'
                        : 'border-[#ddc1b3]/60 bg-[#fdf9f3] text-[#1c1c18] hover:border-[#ff8c42]'
                    }`}
                  >
                    {amt} ฿
                  </button>
                ))}
              </div>

              {/* Custom input amount */}
              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#564338] text-sm font-bold">฿</span>
                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="w-full bg-[#f7f3ed] border border-[#ddc1b3] rounded-xl py-3.5 pl-10 pr-4 text-sm text-[#1c1c18] focus:ring-2 focus:ring-[#ff8c42] placeholder-[#897266]/50 focus:outline-none outline-none font-semibold"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDonateNow}
                className="w-full bg-[#ff8c42] hover:bg-[#9b4500] text-white py-4 rounded-full font-bold text-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">favorite</span>
                Donate Now
              </button>
              
              <button
                onClick={handleShare}
                className="w-full bg-transparent text-[#006780] hover:bg-[#f1ede7] py-4 rounded-full font-bold text-sm transition-colors flex justify-center items-center gap-2 cursor-pointer border border-[#ddc1b3]/30"
              >
                <Share2 className="w-4 h-4" />
                Share Foundation
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Thank You Receipt Modal PopUp (AnimatePresence!) */}
      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fdf9f3] max-w-[450px] w-full rounded-2xl shadow-2xl border border-[#ddc1b3] p-6 relative overflow-hidden"
            >
              {/* Confetti element overlay */}
              <div className="absolute top-0 right-0 opacity-5 pointer-events-none text-[#006d41]">
                <span className="material-symbols-outlined text-[150px]">volunteer_activism</span>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#006d41]/15 flex items-center justify-center text-[#006d41] mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-bold font-display text-[#006d41] mb-1">
                  Donation Successful!
                </h3>
                <p className="text-xs text-[#564338]/80 font-bold mb-4 uppercase tracking-widest">
                  Thank You for Your Generosity ❤️
                </p>

                {/* Receipt Card */}
                <div className="bg-white rounded-xl p-4 border border-[#ddc1b3]/60 shadow-inner w-full mb-6 text-left">
                  <div className="flex justify-between border-b border-[#f1ede7] pb-2 mb-2 text-xs text-[#564338]">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-[#1c1c18] font-bold">TXN-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#f1ede7] pb-2 mb-2 text-xs text-[#564338]">
                    <span>Foundation:</span>
                    <span className="font-bold text-[#1c1c18]">{foundation.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#f1ede7] pb-2 mb-2 text-xs text-[#564338]">
                    <span>Amount Paid:</span>
                    <span className="font-bold text-[#9b4500] text-sm">{receiptAmount.toLocaleString()} ฿</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#564338]">
                    <span>Date:</span>
                    <span className="font-bold text-[#1c1c18]">{new Date().toLocaleDateString('en-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                <p className="text-xs text-[#564338] leading-relaxed mb-6">
                  Your official tax-deductible receipt has been registered to your account dashboard history! Thank you for supporting the street paws of Thailand.
                </p>

                <button
                  onClick={() => setShowReceipt(false)}
                  className="w-full bg-[#9b4500] hover:bg-[#ff8c42] text-white font-bold py-3 rounded-full text-xs transition-colors cursor-pointer"
                >
                  Dismiss Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
