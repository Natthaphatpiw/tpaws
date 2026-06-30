import React, { useState } from 'react';
import { Search, MapPin, Heart, Home, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (searchTerm: string, province: string, animalType: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [province, setProvince] = useState('พื้นที่ทั้งหมด');
  const [animalType, setAnimalType] = useState('สัตว์ทั้งหมด');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, province, animalType);
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      {/* Cinematic Hero Block */}
      <section className="relative w-full h-[650px] md:h-[720px] flex items-center justify-center overflow-hidden bg-[#e6e2dc]">
        {/* Background dark overlay */}
        <div className="absolute inset-0 bg-black/45 z-10"></div>
        
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 w-full h-full scale-105 animate-pulse"
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7_OBJOrawcCf0nPiVinV8gZ32CCtTh-id9kSEi6hOLCDwfP0o9QPOBXw_-YHSGnF4-Dd2Pb1BPNVqNNwjqMlEkPgQh5bY-0PIvhszcF7qpd1qnLLJQeFeVp8Rr-b55xO_gick4I4mFXxIGdJYJza0jE6u6w1oMwnoVAAUUXWqYenlV6l0FPbDV5c5J4aPeeUC-Pvwtf1UA5muMCM-XQJrLfNtKp9NvmPDbS3KJCsVYyLBaDiHzPxu6gCOojmmHlUZ389_3_KC6Zo')",
            animationDuration: '10s'
          }}
        ></div>

        {/* Content Overlay */}
        <div className="relative z-20 text-center px-6 max-w-[850px] text-white">
          <span className="inline-flex items-center gap-1.5 bg-[#006d41]/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-wide uppercase border border-[#95f7bb]/20">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Official Thai Rescue Alliance
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            ทุกชีวิตมีค่า มาร่วมสร้างบ้านที่อบอุ่นให้น้องๆ ด้วยกัน
          </h1>
          <p className="font-sans text-lg md:text-xl mb-10 opacity-95 max-w-2xl mx-auto leading-relaxed">
            ศูนย์รวมมูลนิธิเพื่อสัตว์ทั่วไทย ค้นหา ช่วยเหลือ และส่งต่อความรักที่สมบูรณ์แบบ
          </p>
          
          <button 
            onClick={() => onSearch('', 'พื้นที่ทั้งหมด', 'สัตว์ทั้งหมด')}
            className="bg-[#ff8c42] text-[#331200] hover:bg-white hover:text-[#9b4500] px-8 py-4 rounded-full font-bold text-base shadow-lg hover:-translate-y-1 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            เริ่มช่วยเหลือวันนี้
            <span className="material-symbols-outlined text-xl">arrow_right_alt</span>
          </button>
        </div>
      </section>

      {/* Floating Interactive Filter Bar */}
      <section className="relative z-30 -mt-16 px-6 max-w-[1000px] w-full mx-auto">
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center border border-[#ddc1b3]/40"
        >
          {/* Main search term */}
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#564338]/60 w-5 h-5" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#f1ede7]/50 border-none focus:ring-2 focus:ring-[#ff8c42] text-sm text-[#1c1c18] placeholder-[#897266]/70 outline-none"
              placeholder="ค้นหามูลนิธิ หรือความช่วยเหลือใกล้คุณ..."
            />
          </div>

          {/* Quick Dropdowns */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#564338]/60 w-4 h-4" />
              <select 
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full pl-10 pr-8 py-3.5 rounded-full bg-[#f1ede7]/50 border-none focus:ring-2 focus:ring-[#ff8c42] text-sm text-[#1c1c18] appearance-none cursor-pointer outline-none font-medium"
              >
                <option value="พื้นที่ทั้งหมด">พื้นที่ทั้งหมด</option>
                <option value="Chiang Mai">เชียงใหม่ (Chiang Mai)</option>
                <option value="Phuket">ภูเก็ต (Phuket)</option>
                <option value="Bangkok">กรุงเทพฯ (Bangkok)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#564338]">
                expand_more
              </span>
            </div>

            <div className="relative flex-1 md:w-48">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#564338]/60 text-[18px]">
                pets
              </span>
              <select 
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                className="w-full pl-10 pr-8 py-3.5 rounded-full bg-[#f1ede7]/50 border-none focus:ring-2 focus:ring-[#ff8c42] text-sm text-[#1c1c18] appearance-none cursor-pointer outline-none font-medium"
              >
                <option value="สัตว์ทั้งหมด">สัตว์ทั้งหมด</option>
                <option value="Dogs">สุนัข (Dogs)</option>
                <option value="Cats">แมว (Cats)</option>
                <option value="Wildlife">สัตว์ป่า (Wildlife)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#564338]">
                expand_more
              </span>
            </div>

            <button 
              type="submit"
              className="bg-[#9b4500] text-white hover:bg-[#ff8c42] h-[52px] w-[52px] rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
              title="Search"
            >
              <span className="material-symbols-outlined text-white text-xl">arrow_forward</span>
            </button>
          </div>
        </form>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 px-6 max-w-[1200px] w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display text-[#9b4500] mb-3">Our Resilient Impact Journey</h2>
          <p className="text-base text-[#564338] max-w-lg mx-auto">Every action helps create a second chance of happiness for Thai stray animals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#f7f3ed] rounded-2xl p-8 text-center border border-[#e6e2dc] hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 rounded-full bg-[#ff8c42]/10 flex items-center justify-center text-[#ff8c42] mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">volunteer_activism</span>
            </div>
            <h3 className="font-display text-4xl font-extrabold text-[#9b4500] mb-2">100+</h3>
            <p className="font-bold text-xs uppercase tracking-wider text-[#564338]/80">มูลนิธิเข้าร่วม (Registered Shelters)</p>
          </div>

          <div className="bg-[#f7f3ed] rounded-2xl p-8 text-center border border-[#e6e2dc] hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 rounded-full bg-[#006d41]/10 flex items-center justify-center text-[#006d41] mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">home</span>
            </div>
            <h3 className="font-display text-4xl font-extrabold text-[#9b4500] mb-2">5,000+</h3>
            <p className="font-bold text-xs uppercase tracking-wider text-[#564338]/80">น้องได้รับบ้าน (Pets Adopted)</p>
          </div>

          <div className="bg-[#f7f3ed] rounded-2xl p-8 text-center border border-[#e6e2dc] hover:shadow-lg transition-all hover:-translate-y-1 group">
            <div className="w-16 h-16 rounded-full bg-[#006780]/10 flex items-center justify-center text-[#006780] mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl">savings</span>
            </div>
            <h3 className="font-display text-4xl font-extrabold text-[#9b4500] mb-2">1M+ ฿</h3>
            <p className="font-bold text-xs uppercase tracking-wider text-[#564338]/80">ยอดบริจาคสะสม (Total Charity Raised)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
