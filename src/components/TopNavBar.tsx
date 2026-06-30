import React from 'react';
import { Search, Heart, User, Sparkles } from 'lucide-react';

interface TopNavBarProps {
  currentTab: 'home' | 'foundations' | 'find' | 'details' | 'dashboard';
  setCurrentTab: (tab: 'home' | 'foundations' | 'find' | 'details' | 'dashboard') => void;
  savedLikedCount: number;
}

export default function TopNavBar({ currentTab, setCurrentTab, savedLikedCount }: TopNavBarProps) {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#fdf9f3]/80 backdrop-blur-md shadow-sm border-b border-[#ddc1b3]/30">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <button 
          onClick={() => setCurrentTab('home')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="material-symbols-outlined text-3xl font-bold text-[#9b4500] group-hover:scale-110 transition-transform">
            pets
          </span>
          <span className="text-3xl font-bold font-display text-[#9b4500] tracking-tight">
            ThaiPaws
          </span>
        </button>

        {/* Navigation Items */}
        <nav className="hidden md:flex gap-6 items-center">
          <button
            onClick={() => setCurrentTab('foundations')}
            className={`cursor-pointer text-[15px] font-semibold py-1 px-3 rounded-full transition-all duration-200 ${
              currentTab === 'foundations'
                ? 'text-[#9b4500] bg-[#ffdbc9]/40 border-b-2 border-[#9b4500]'
                : 'text-[#564338] hover:text-[#9b4500] hover:bg-[#f1ede7]'
            }`}
          >
            Browse Foundations
          </button>
          
          <button
            onClick={() => setCurrentTab('find')}
            className={`cursor-pointer text-[15px] font-semibold py-1 px-3 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
              currentTab === 'find'
                ? 'text-[#9b4500] bg-[#ffdbc9]/40 border-b-2 border-[#9b4500]'
                : 'text-[#564338] hover:text-[#9b4500] hover:bg-[#f1ede7]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#ff8c42]" />
            Find a Pet / Quiz
          </button>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`cursor-pointer text-[15px] font-semibold py-1 px-3 rounded-full transition-all duration-200 flex items-center gap-1 ${
              currentTab === 'dashboard'
                ? 'text-[#9b4500] bg-[#ffdbc9]/40 border-b-2 border-[#9b4500]'
                : 'text-[#564338] hover:text-[#9b4500] hover:bg-[#f1ede7]'
            }`}
          >
            My Saved
            {savedLikedCount > 0 && (
              <span className="bg-[#9b4500] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {savedLikedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentTab('foundations')}
            className="bg-[#ff8c42] text-white hover:bg-[#9b4500] px-5 py-2.5 rounded-full font-bold text-sm hover:shadow-md transition-all cursor-pointer"
          >
            Donate Now
          </button>

          <button 
            onClick={() => setCurrentTab('dashboard')}
            className="w-10 h-10 rounded-full bg-[#f1ede7] overflow-hidden border border-[#ddc1b3] flex items-center justify-center cursor-pointer hover:border-[#9b4500] transition-colors"
            title="My Saved & Dashboard"
          >
            <img 
              alt="User profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3Ngv1Ew2quzXza58GaJxlz4ZIXSR7j65rGVuB7LMYo7t6RtVecBwtRknQ8riZmUoVISyJFO9CTLWgCsjJ8013B5E7JOIgcTt7isypfEUH4yJG0QNdOK1g7eq6670SSJNhr3Pn5CMBUa35Qjj1_ar-GOitBtT6f9f9ib_PeNiuphdire5IEU12J-r12a46Tdx6hIUwpc_Tnl36NR9meu_TjY8aLk-FpSGAe21bYhEUyeFZ4Tjdy1oEq7ckSOZYAtmXsjkVj4ek1JQ"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
