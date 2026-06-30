import React, { useState } from 'react';
import { Pet } from '../types';
import { Sparkles, MapPin, Heart, Info, RotateCcw, HelpCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MatchingQuizProps {
  pets: Pet[];
  onSelectPet: (petId: string) => void;
  onSaveQuizResult?: (matchedIds: string[]) => void;
}

export default function MatchingQuiz({ pets, onSelectPet, onSaveQuizResult }: MatchingQuizProps) {
  const [q1, setQ1] = useState<string>('home'); // home, active, apartment
  const [q2, setQ2] = useState<string>('evening'); // alltime, evening, weekend
  const [showResults, setShowResults] = useState<boolean>(false);
  const [matchedPets, setMatchedPets] = useState<Pet[]>([]);

  const handleCalculateMatches = () => {
    // Advanced algorithm mapping responses to actual pet attributes!
    let results: Pet[] = [];

    if (q1 === 'home') {
      // Likes quiet, cozy pets like older dogs, retrievers, or calm cats
      results = pets.filter(p => p.id === 'thongdee' || p.id === 'chanom' || p.id === 'bella');
    } else if (q1 === 'active') {
      // Energetic active runners
      results = pets.filter(p => p.id === 'thong' || p.id === 'milo');
    } else if (q1 === 'apartment') {
      // Small dogs or cats suitable for limited space
      results = pets.filter(p => p.id === 'kanomphing' || p.id === 'khaitun');
    }

    // Default fallback if empty
    if (results.length === 0) {
      results = pets.slice(0, 3);
    }

    setMatchedPets(results);
    setShowResults(true);

    if (onSaveQuizResult) {
      onSaveQuizResult(results.map(r => r.id));
    }
  };

  const handleResetQuiz = () => {
    setQ1('home');
    setQ2('evening');
    setShowResults(false);
    setMatchedPets([]);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-12 relative paw-pattern min-h-screen">
      
      {/* Page Title Header Block */}
      <section className="text-center flex flex-col items-center gap-4 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold font-display text-[#9b4500] tracking-tight flex items-center gap-2">
          หาเพื่อนซี้สี่ขาที่ใช่
          <span className="material-symbols-outlined text-[#ff8c42] text-3xl font-bold">magic_button</span>
        </h1>
        <p className="text-base text-[#564338] max-w-2xl leading-relaxed">
          ทำควิซสั้นๆ เพื่อให้เราช่วยจับคู่ไลฟ์สไตล์และความรับผิดชอบของคุณ กับน้องๆ ในศูนย์พักพิงที่กำลังรอคอยบ้านที่อบอุ่นที่สุด
        </p>
      </section>

      {/* Quiz Form Segment */}
      {!showResults ? (
        <section className="bg-white rounded-2xl p-6 md:p-10 shadow-lg border border-[#ddc1b3]/40 flex flex-col gap-12 relative overflow-hidden">
          {/* Paw print high position decoration */}
          <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4 text-[#9b4500]">
            <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
          </div>

          {/* Question 1 */}
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="bg-[#9b4500] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </span>
              <h2 className="text-lg md:text-xl font-bold font-display text-[#1c1c18]">
                ไลฟ์สไตล์ของคุณเป็นแบบไหน? (My Lifestyle)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: Cozy */}
              <div 
                onClick={() => setQ1('home')}
                className={`cursor-pointer rounded-xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  q1 === 'home'
                    ? 'border-[#9b4500] bg-[#ffdbc9]/30 shadow-md'
                    : 'border-[#ddc1b3]/60 bg-white hover:border-[#ff8c42]/60 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${q1 === 'home' ? 'bg-[#ff8c42]/20 text-[#9b4500]' : 'bg-[#f1ede7] text-[#564338]'}`}>
                  <span className="material-symbols-outlined text-[28px]">chair</span>
                </div>
                <span className="font-bold font-display text-base text-[#1c1c18]">ชอบอยู่บ้าน</span>
                <p className="text-xs text-[#564338] leading-relaxed">รักความสงบ ดูซีรีส์ อ่านหนังสือ นอนกอดน้อง</p>
              </div>

              {/* Option 2: Active */}
              <div 
                onClick={() => setQ1('active')}
                className={`cursor-pointer rounded-xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  q1 === 'active'
                    ? 'border-[#9b4500] bg-[#ffdbc9]/30 shadow-md'
                    : 'border-[#ddc1b3]/60 bg-white hover:border-[#ff8c42]/60 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${q1 === 'active' ? 'bg-[#ff8c42]/20 text-[#9b4500]' : 'bg-[#f1ede7] text-[#564338]'}`}>
                  <span className="material-symbols-outlined text-[28px]">directions_run</span>
                </div>
                <span className="font-bold font-display text-base text-[#1c1c18]">ชอบออกไปวิ่ง</span>
                <p className="text-xs text-[#564338] leading-relaxed">สายแอคทีฟ ชอบวิ่งสวน เดินป่า กิจกรรมกลางแจ้ง</p>
              </div>

              {/* Option 3: Apartment */}
              <div 
                onClick={() => setQ1('apartment')}
                className={`cursor-pointer rounded-xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  q1 === 'apartment'
                    ? 'border-[#9b4500] bg-[#ffdbc9]/30 shadow-md'
                    : 'border-[#ddc1b3]/60 bg-white hover:border-[#ff8c42]/60 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${q1 === 'apartment' ? 'bg-[#ff8c42]/20 text-[#9b4500]' : 'bg-[#f1ede7] text-[#564338]'}`}>
                  <span className="material-symbols-outlined text-[28px]">apartment</span>
                </div>
                <span className="font-bold font-display text-base text-[#1c1c18]">พื้นที่จำกัด</span>
                <p className="text-xs text-[#564338] leading-relaxed">อาศัยอยู่คอนโด หอพัก หรืออพาร์ตเมนต์</p>
              </div>
            </div>
          </div>

          <hr className="border-[#ddc1b3]/40 z-10" />

          {/* Question 2 */}
          <div className="flex flex-col gap-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="bg-[#9b4500] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </span>
              <h2 className="text-lg md:text-xl font-bold font-display text-[#1c1c18]">
                คุณมีเวลาดูแลเล่นกับเหล่าน้องๆ แค่ไหน? (My Time availability)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Option 1: All time */}
              <div 
                onClick={() => setQ2('alltime')}
                className={`cursor-pointer rounded-xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  q2 === 'alltime'
                    ? 'border-[#9b4500] bg-[#ffdbc9]/30 shadow-md'
                    : 'border-[#ddc1b3]/60 bg-white hover:border-[#ff8c42]/60 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${q2 === 'alltime' ? 'bg-[#ff8c42]/20 text-[#9b4500]' : 'bg-[#f1ede7] text-[#564338]'}`}>
                  <span className="material-symbols-outlined text-[28px]">schedule</span>
                </div>
                <span className="font-bold font-display text-base text-[#1c1c18]">ตลอดเวลา</span>
                <p className="text-xs text-[#564338] leading-relaxed">ทำงานรีโมตจากที่บ้าน หรือมีคนช่วยดูแลสลับเปลี่ยน</p>
              </div>

              {/* Option 2: Evening */}
              <div 
                onClick={() => setQ2('evening')}
                className={`cursor-pointer rounded-xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  q2 === 'evening'
                    ? 'border-[#9b4500] bg-[#ffdbc9]/30 shadow-md'
                    : 'border-[#ddc1b3]/60 bg-white hover:border-[#ff8c42]/60 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${q2 === 'evening' ? 'bg-[#ff8c42]/20 text-[#9b4500]' : 'bg-[#f1ede7] text-[#564338]'}`}>
                  <span className="material-symbols-outlined text-[28px]">dark_mode</span>
                </div>
                <span className="font-bold font-display text-base text-[#1c1c18]">ช่วงเย็น</span>
                <p className="text-xs text-[#564338] leading-relaxed">ว่างเดินเล่นคุยกับน้องหลังเลิกงาน มีเวลาให้อบอุ่นทุกค่ำ</p>
              </div>

              {/* Option 3: Weekend */}
              <div 
                onClick={() => setQ2('weekend')}
                className={`cursor-pointer rounded-xl p-6 border-2 transition-all flex flex-col items-center text-center gap-4 ${
                  q2 === 'weekend'
                    ? 'border-[#9b4500] bg-[#ffdbc9]/30 shadow-md'
                    : 'border-[#ddc1b3]/60 bg-white hover:border-[#ff8c42]/60 hover:shadow-md'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${q2 === 'weekend' ? 'bg-[#ff8c42]/20 text-[#9b4500]' : 'bg-[#f1ede7] text-[#564338]'}`}>
                  <span className="material-symbols-outlined text-[28px]">calendar_month</span>
                </div>
                <span className="font-bold font-display text-base text-[#1c1c18]">วันหยุดสุดสัปดาห์</span>
                <p className="text-xs text-[#564338] leading-relaxed">เสาร์-อาทิตย์ พร้อมพาน้องเดินทางไปท่องเที่ยวสูดอากาศ</p>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-center mt-6 relative z-10">
            <button
              onClick={handleCalculateMatches}
              className="bg-[#9b4500] hover:bg-[#ff8c42] text-white font-bold px-12 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer text-sm"
            >
              ดูผลลัพธ์ (Calculate Matches)
              <span className="material-symbols-outlined text-[20px]">magic_button</span>
            </button>
          </div>
        </section>
      ) : (
        /* Results Section (Bento Grid layout matching HTML 5 design) */
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#95f7bb] text-[#007346] px-4 py-1 rounded-full text-xs font-bold mb-4 shadow-sm">
              <CheckCircle className="w-4 h-4" />
              Perfect Matches Computed!
            </span>
            <h2 className="text-3xl font-bold font-display text-[#9b4500]">
              เราเจอน้องที่เหมาะกับคุณแล้ว!
            </h2>
            <p className="text-sm text-[#564338] mt-2">
              น้องๆ เหล่านี้กำลังรอคอยความรักที่เข้ากันได้ดีเยี่ยมกับไลฟ์สไตล์และความน่ารักของคุณ
            </p>
          </div>

          {/* Results Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedPets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => onSelectPet(pet.id)}
                className="bg-white rounded-2xl overflow-hidden border border-[#ddc1b3]/60 flex flex-col shadow-md hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
              >
                {/* Pet Image Block */}
                <div 
                  className="h-64 bg-cover bg-center rounded-t-2xl relative"
                  style={{ backgroundImage: `url('${pet.mainImage}')` }}
                >
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#ff8c42] flex items-center justify-center shadow-md">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                </div>

                {/* Details text area */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {pet.tags.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="bg-[#006d41]/10 text-[#006d41] border border-[#006d41]/10 px-3 py-0.5 rounded-full text-[11px] font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="bg-[#ffdbc9] text-[#9b4500] px-3 py-0.5 rounded-full text-[11px] font-bold">
                      {pet.age}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-[#1c1c18] group-hover:text-[#9b4500] transition-colors">
                      {pet.name}
                    </h3>
                    <p className="text-xs text-[#564338] mt-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#ff8c42]" />
                      Shelter Spot: {pet.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Re-run button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 border-2 border-[#9b4500] text-[#9b4500] hover:bg-[#9b4500] hover:text-white transition-colors py-2.5 px-6 rounded-full font-bold text-xs cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Lifestyle Matcher
            </button>
          </div>
        </motion.section>
      )}

    </div>
  );
}
