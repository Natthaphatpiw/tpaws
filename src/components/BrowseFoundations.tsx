import React, { useState, useMemo } from 'react';
import { Foundation } from '../types';
import { MapPin, Plus, Minus, Compass, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';

interface BrowseFoundationsProps {
  foundations: Foundation[];
  onSelectFoundation: (id: string) => void;
  initialProvince?: string;
  initialAnimalType?: string;
  initialSearchTerm?: string;
}

export default function BrowseFoundations({
  foundations,
  onSelectFoundation,
  initialProvince = 'All Provinces',
  initialAnimalType = 'Animal Type',
  initialSearchTerm = ''
}: BrowseFoundationsProps) {
  // State for filters
  const [province, setProvince] = useState(initialProvince === 'พื้นที่ทั้งหมด' ? 'All Provinces' : initialProvince);
  const [animalType, setAnimalType] = useState(initialAnimalType === 'สัตว์ทั้งหมด' ? 'Animal Type' : initialAnimalType);
  const [search, setSearch] = useState(initialSearchTerm);
  
  // Interactive map state
  const [zoom, setZoom] = useState(1);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  // Filter logic
  const filteredFoundations = useMemo(() => {
    return foundations.filter((f) => {
      const matchProvince = province === 'All Provinces' || f.location.toLowerCase() === province.toLowerCase();
      
      const matchType = animalType === 'Animal Type' || f.animalTypes.some(
        (t) => t.toLowerCase() === animalType.toLowerCase() || (animalType === 'Dogs' && t === 'Dogs') || (animalType === 'Cats' && t === 'Cats')
      );
      
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                          f.location.toLowerCase().includes(search.toLowerCase());

      return matchProvince && matchType && matchSearch;
    });
  }, [foundations, province, animalType, search]);

  // Adjust Zoom
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetLocation = () => {
    setZoom(1);
    setActiveMarkerId('paws-bangkok'); // Default focus on Bangkok
  };

  return (
    <div className="flex-grow flex flex-col md:flex-row max-w-[1200px] w-full mx-auto p-6 gap-6 h-[calc(100vh-100px)]">
      
      {/* Left Side: Filter and List view */}
      <section className="w-full md:w-[420px] lg:w-[480px] flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar pr-1">
        <header className="mb-2">
          <h1 className="text-2xl font-bold font-display text-[#1c1c18] mb-1">
            Foundation Discovery
          </h1>
          <p className="text-sm text-[#564338] leading-relaxed">
            Find sanctuaries and registered rescue organizations across Thailand that need your kind support.
          </p>
        </header>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f1ede7]/50 border border-[#ddc1b3] rounded-full py-2.5 px-4 text-sm text-[#1c1c18] placeholder-[#897266]/70 focus:outline-none focus:ring-2 focus:ring-[#ff8c42]"
          />
        </div>

        {/* Filters Panel */}
        <div className="bg-[#f7f3ed] p-4 rounded-xl border border-[#ddc1b3] shadow-sm flex gap-3">
          {/* Province selector */}
          <div className="relative flex-grow">
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full bg-[#ffffff] text-sm text-[#1c1c18] border border-[#ddc1b3] rounded-full py-2 px-4 appearance-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent cursor-pointer outline-none font-semibold"
            >
              <option value="All Provinces">All Provinces</option>
              <option value="Chiang Mai">Chiang Mai (เชียงใหม่)</option>
              <option value="Phuket">Phuket (ภูเก็ต)</option>
              <option value="Bangkok">Bangkok (กรุงเทพฯ)</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#564338] text-[18px]">
              expand_more
            </span>
          </div>

          {/* Animal Type selector */}
          <div className="relative flex-grow">
            <select
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
              className="w-full bg-[#ffffff] text-sm text-[#1c1c18] border border-[#ddc1b3] rounded-full py-2 px-4 appearance-none focus:ring-2 focus:ring-[#ff8c42] focus:border-transparent cursor-pointer outline-none font-semibold"
            >
              <option value="Animal Type">Animal Type</option>
              <option value="Dogs">Dogs (สุนัข)</option>
              <option value="Cats">Cats (แมว)</option>
              <option value="Wildlife">Wildlife (สัตว์ป่า)</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#564338] text-[18px]">
              expand_more
            </span>
          </div>
        </div>

        {/* List of filtered foundations */}
        <div className="flex-grow flex flex-col gap-4">
          {filteredFoundations.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-[#ddc1b3] p-6">
              <span className="material-symbols-outlined text-4xl text-[#897266]/70 mb-2">search_off</span>
              <p className="font-semibold text-lg text-[#1c1c18]">No Foundations Found</p>
              <p className="text-sm text-[#564338] mt-1">Try resetting your search query or dropdown filters.</p>
              <button 
                onClick={() => { setSearch(''); setProvince('All Provinces'); setAnimalType('Animal Type'); }}
                className="mt-4 bg-[#ff8c42] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#9b4500] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFoundations.map((f) => (
              <article
                key={f.id}
                onClick={() => {
                  setActiveMarkerId(f.id);
                  onSelectFoundation(f.id);
                }}
                className={`bg-white rounded-xl border p-4 flex gap-4 cursor-pointer group transition-all duration-300 ${
                  activeMarkerId === f.id 
                    ? 'border-[#9b4500] ring-2 ring-[#ffdbc9] shadow-md bg-[#ffdbc9]/10' 
                    : 'border-[#ddc1b3]/60 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden relative border border-[#ddc1b3]/30">
                  <img
                    alt={f.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={f.thumbnailImage}
                  />
                </div>

                {/* Content details */}
                <div className="flex flex-col flex-grow justify-between py-1">
                  <div>
                    <h3 className="font-display font-bold text-[#1c1c18] text-lg leading-tight mb-1 group-hover:text-[#9b4500] transition-colors">
                      {f.name}
                    </h3>
                    <div className="flex items-center text-[#564338]/80 text-xs gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#ff8c42]">location_on</span>
                      {f.location}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {f.animalTypes.map((type, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 bg-[#b7eaff] text-[#004e61] rounded-full text-[11px] font-bold"
                      >
                        {type}
                      </span>
                    ))}
                    {f.urgent && (
                      <span className="px-2.5 py-0.5 bg-[#ffdad6] text-[#ba1a1a] rounded-full text-[11px] font-bold border border-[#ba1a1a]/20 flex items-center gap-0.5 animate-pulse">
                        <AlertCircle className="w-3 h-3" />
                        Urgent Support
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="flex items-center justify-center pl-1">
                  <span className="material-symbols-outlined text-[#ff8c42] group-hover:translate-x-1.5 transition-transform">
                    arrow_forward_ios
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Right Side: Visual Styled Map */}
      <section className="flex-grow bg-[#fdf9f3] rounded-2xl border border-[#ddc1b3] shadow-sm overflow-hidden relative min-h-[350px] md:min-h-0 h-full flex flex-col">
        {/* Map Header Overlay */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md border border-[#ddc1b3]/40 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006d41] font-bold">explore</span>
          <span className="text-xs font-bold text-[#1c1c18]">Interactive Thailand Sanctuary Map</span>
        </div>

        {/* The map canvas space */}
        <div className="w-full flex-grow relative overflow-hidden bg-[#ebe8e2]">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-300 relative"
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC92wPLNfII1BuqynFOGbpgPYHNSjEBx_CIAAh2etmHQpc2zjWl67KwsV3of3PnqtglMyc-qt4WpT99VH3RmEBOWR8-gXsMxoJmXp6cWQRbne3Wu83pkUjpAsTWXgMKhwGYG24Kd4frDL5M0LaKcoEsUg2IYpZPfC_0DOGrSUHJbfmMPyNcGrlRj95vu0PCpIsIz-auZRRDlJWWNiQQy6cvCitQ8nBZ50zt1-9-w5qDuD6SaTokY67vZGwaMX3jtEPSyqIWLhBoMmg')",
              transform: `scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Interactive Markers for Foundations */}
            {foundations.map((f) => {
              const isSelected = activeMarkerId === f.id;
              return (
                <div
                  key={f.id}
                  className="absolute cursor-pointer group transition-all duration-300"
                  style={{ 
                    top: `${f.coords.y}%`, 
                    left: `${f.coords.x}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isSelected ? 30 : 10
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMarkerId(f.id);
                  }}
                >
                  {/* Paw Print Pin animation */}
                  <div className="relative flex flex-col items-center">
                    <span className={`material-symbols-outlined text-3xl drop-shadow-lg transition-transform duration-300 ${
                      isSelected 
                        ? 'text-[#9b4500] scale-125' 
                        : 'text-[#ff8c42] group-hover:scale-125 group-hover:text-[#9b4500]'
                    }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      pets
                    </span>
                    
                    {/* Ring Pulse effect */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full border-2 border-[#9b4500] animate-ping opacity-60 pointer-events-none"></span>
                    )}

                    {/* Quick Floating Tooltip Card */}
                    <div className={`absolute bottom-full mb-2 bg-white text-[#1c1c18] p-3 rounded-xl whitespace-nowrap shadow-xl pointer-events-auto z-50 border border-[#ddc1b3] flex flex-col gap-1 transition-all duration-200 ${
                      isSelected ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'
                    }`}>
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="font-bold font-display text-sm text-[#9b4500]">
                          {f.name}
                        </span>
                        {f.urgent && (
                          <span className="bg-[#ffdad6] text-[#ba1a1a] text-[9px] px-1.5 py-0.5 rounded font-bold animate-pulse">URGENT</span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#564338]/80 flex items-center gap-0.5 font-semibold">
                        <span className="material-symbols-outlined text-[12px]">location_on</span>
                        {f.location} • {f.animalTypes.join(', ')}
                      </span>
                      <button 
                        onClick={() => onSelectFoundation(f.id)}
                        className="mt-1.5 bg-[#9b4500] hover:bg-[#ff8c42] text-white text-[10px] py-1 px-2.5 rounded-full font-bold transition-all text-center"
                      >
                        Visit Foundation
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Map Control Buttons Overlay */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-[#1c1c18] hover:text-[#9b4500] transition-colors border border-[#ddc1b3]/50 cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-[#1c1c18] hover:text-[#9b4500] transition-colors border border-[#ddc1b3]/50 cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetLocation}
            className="w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center text-[#1c1c18] hover:text-[#006d41] transition-colors border border-[#ddc1b3]/50 cursor-pointer mt-2"
            title="Locate Capital"
          >
            <Compass className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
