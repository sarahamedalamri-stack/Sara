import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Home } from 'lucide-react';
import { ActiveScreen } from '../types';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  totalStars: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  totalStars,
  isMuted,
  onToggleMute,
}) => {
  const handleNav = (screen: ActiveScreen) => {
    soundManager.playClick();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F0]/90 backdrop-blur-md border-b border-[#26345C]/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-right group cursor-pointer focus:outline-none"
          title="العودة للصفحة الرئيسية"
        >
          <div className="w-10 h-10 rounded-xl bg-[#B8A5F8] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <BookOpen className="w-5 h-5 text-[#26345C]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#26345C] font-['Tajawal']">
              أبطال القراءة
            </span>
            <span className="text-[11px] text-[#26345C]/70 -mt-1 font-medium hidden sm:inline">
              سلطنة عُمان
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeScreen === 'home'
                ? 'bg-[#B8A5F8]/30 text-[#26345C] font-bold'
                : 'text-[#26345C]/75 hover:text-[#26345C] hover:bg-[#8ED8F8]/20'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>الرئيسية</span>
          </button>

          <button
            onClick={() => handleNav('library')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              activeScreen === 'library' || activeScreen === 'story'
                ? 'bg-[#8ED8F8]/40 text-[#26345C] font-bold'
                : 'text-[#26345C]/75 hover:text-[#26345C] hover:bg-[#8ED8F8]/20'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>مكتبة القصص</span>
          </button>
        </nav>

        {/* Zone 3: Rewards & Audio control */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Star Counter */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFD966]/40 border border-[#FFD966]/60 text-[#26345C] font-bold text-sm sm:text-base tabular-nums shadow-xs"
            title="مجموع نجومك الذهبية"
          >
            <Sparkles className="w-4 h-4 text-[#D97706] fill-[#FFD966]" />
            <span>{totalStars}</span>
            <span className="text-xs font-normal text-[#26345C]/70 hidden xs:inline">نجمة</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              isMuted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-emerald-50 border-[#A8E6CF] text-emerald-800 hover:bg-[#A8E6CF]/30'
            }`}
            title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم المؤثرات الصوتية'}
            aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
