import React from 'react';
import { ArrowLeft, Sparkles, BookOpen, Compass, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/stories';
import { soundManager } from '../utils/audio';

interface HomePageProps {
  onStartAdventure: () => void;
  storiesCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartAdventure, storiesCount }) => {
  const handleStart = () => {
    soundManager.playSuccess();
    onStartAdventure();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-between py-6 sm:py-10 px-4 sm:px-6 max-w-5xl mx-auto w-full">
      {/* Top Banner / Oman Context & Count */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-[#26345C]/80 bg-[#B8A5F8]/20 px-4 py-1.5 rounded-full border border-[#B8A5F8]/40 mb-4 animate-fade-in text-center">
        <Sparkles className="w-4 h-4 text-[#FFD966] fill-[#FFD966]" />
        <span>مِنَصَّةُ أَبْطَالِ القِرَاءَةِ • فِي سَلْطَنَةِ عُمانَ</span>
        <span className="hidden sm:inline">•</span>
        <span className="font-bold text-[#26345C]">مَكْتَبَةٌ غَنِيَّةٌ تَضُمُّ {storiesCount} قِصَّةً مُصَوَّرَةً</span>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center text-center my-auto">
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-[#26345C] tracking-tight font-['Tajawal'] mb-3">
          أَبْطَالُ القِرَاءَةِ
        </h1>

        {/* Welcome Greeting (Exact user requirement) */}
        <p className="text-xl sm:text-2xl font-bold text-[#26345C]/90 max-w-2xl mb-6 leading-relaxed">
          «مَرْحَبًا يَا بَطَلَ القِرَاءَةِ! هَيَّا نَكْتَشِفُ الحِكَايَاتِ وَنَفْتَحُ كُنُوزَ المَعْرِفَةِ»
        </p>

        {/* Main Story Hero Illustration Card */}
        <div className="w-full max-w-2xl bg-white rounded-3xl p-3 sm:p-4 shadow-lg shadow-[#B8A5F8]/15 border-2 border-[#B8A5F8]/30 mb-8 overflow-hidden group">
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#8ED8F8]/10">
            <img
              src={HERO_IMAGE}
              alt="أبطال القراءة في سلطنة عُمان يقرؤون تحت ظلال النخيل"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#26345C]/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#26345C] shadow-xs flex items-center gap-1.5 border border-[#B8A5F8]/40">
              <BookOpen className="w-4 h-4 text-[#26345C]" />
              <span>{storiesCount} قِصَصٍ كَامِلَةٍ مَعَ الأَلْعَابِ</span>
            </div>
          </div>
          <div className="pt-3 pb-1 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-[#26345C]/80">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#B8A5F8]" />
              15 قصة مصورة أصلية
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#8ED8F8]" />
              3 ألعاب تفاعلية لكل قصة
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#FFD966]" />
              شهادات إنجاز ونجوم
            </span>
          </div>
        </div>

        {/* Clear Start Reading Button */}
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 text-xl sm:text-2xl font-black text-[#26345C] bg-[#FFD966] hover:bg-[#ffe185] active:scale-95 rounded-2xl sm:rounded-3xl shadow-lg shadow-[#FFD966]/40 border-2 border-[#FFD966]/80 transition-all cursor-pointer font-['Tajawal']"
          aria-label="ابدأ القراءة"
        >
          <Sparkles className="w-6 h-6 text-[#26345C] fill-[#26345C] animate-pulse" />
          <span>ابْدَأِ القِرَاءَةَ</span>
          <ArrowLeft className="w-6 h-6 text-[#26345C] transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* Designer Attribution at Bottom of Home Page */}
      <div className="mt-8 pt-4 w-full flex justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/80 border border-[#B8A5F8]/40 shadow-xs text-sm sm:text-base font-bold text-[#26345C]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B8A5F8]" />
          <span>تَصْمِيمٌ وَإِعْدَادٌ: أ. سَارَه العَامِرِي</span>
        </div>
      </div>
    </div>
  );
};
