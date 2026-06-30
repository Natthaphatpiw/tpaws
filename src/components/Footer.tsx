import React from 'react';

interface FooterProps {
  setCurrentTab: (tab: 'home' | 'foundations' | 'find' | 'details' | 'dashboard') => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-[#f1ede7] dark:bg-[#e6e2dc] border-t border-[#ddc1b3]/50 w-full py-12 px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Information */}
        <div className="col-span-1 md:col-span-2">
          <button 
            onClick={() => setCurrentTab('home')}
            className="text-2xl font-bold text-[#9b4500] font-display mb-3 flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl font-bold">pets</span>
            ThaiPaws
          </button>
          <p className="text-sm text-[#564338] leading-relaxed max-w-sm">
            © 2026 ThaiPaws Foundation. All rights reserved. Registered Charity Thailand (No. TH-9982-445). Connecting sanctuaries and compassionate individuals across the country.
          </p>
        </div>

        {/* Dynamic Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm text-[#1c1c18] uppercase tracking-wider">Quick Navigation</h4>
          <button 
            onClick={() => setCurrentTab('foundations')}
            className="text-left text-[#564338] hover:text-[#006d41] transition-colors text-[14px] hover:underline decoration-[#006d41] underline-offset-4 cursor-pointer"
          >
            Foundation Registration
          </button>
          <button 
            onClick={() => setCurrentTab('find')}
            className="text-left text-[#564338] hover:text-[#006d41] transition-colors text-[14px] hover:underline decoration-[#006d41] underline-offset-4 cursor-pointer"
          >
            Find a Pet
          </button>
          <button 
            onClick={() => setCurrentTab('dashboard')}
            className="text-left text-[#564338] hover:text-[#006d41] transition-colors text-[14px] hover:underline decoration-[#006d41] underline-offset-4 cursor-pointer"
          >
            Volunteer Portal
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-sm text-[#1c1c18] uppercase tracking-wider">Support & Legal</h4>
          <button 
            onClick={() => setCurrentTab('home')}
            className="text-left text-[#564338] hover:text-[#006d41] transition-colors text-[14px] hover:underline decoration-[#006d41] underline-offset-4 cursor-pointer"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => setCurrentTab('home')}
            className="text-left text-[#564338] hover:text-[#006d41] transition-colors text-[14px] hover:underline decoration-[#006d41] underline-offset-4 cursor-pointer"
          >
            Contact Us
          </button>
          <button 
            onClick={() => alert('Thank you for subscribing to our newsletter! ❤️')}
            className="text-left text-[#564338] hover:text-[#006d41] transition-colors text-[14px] hover:underline decoration-[#006d41] underline-offset-4 cursor-pointer"
          >
            Newsletter Signup
          </button>
        </div>
      </div>
    </footer>
  );
}
