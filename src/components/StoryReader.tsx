import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowRight, ArrowLeft, Gamepad2, Sparkles, ChevronRight, ChevronLeft, Type } from 'lucide-react';
import { Story, StoryParagraph } from '../types';
import { StoryNarrator, soundManager } from '../utils/audio';

interface StoryReaderProps {
  story: Story;
  onBackToLibrary: () => void;
  onStartGames: () => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  story,
  onBackToLibrary,
  onStartGames,
}) => {
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isLargeFont, setIsLargeFont] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'step' | 'full'>('step');

  const currentParagraph: StoryParagraph = story.paragraphs[currentParagraphIndex];

  // Stop narration on unmount or slide change
  useEffect(() => {
    return () => {
      StoryNarrator.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    soundManager.playClick();
    if (isPlayingAudio) {
      StoryNarrator.stop();
      setIsPlayingAudio(false);
    } else {
      const textToRead = viewMode === 'step' 
        ? currentParagraph.text 
        : story.paragraphs.map(p => p.text).join(' ');

      setIsPlayingAudio(true);
      const started = StoryNarrator.speak(
        textToRead,
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(true)
      );
      if (!started) {
        setIsPlayingAudio(false);
      }
    }
  };

  const handleNextParagraph = () => {
    soundManager.playClick();
    StoryNarrator.stop();
    setIsPlayingAudio(false);
    if (currentParagraphIndex < story.paragraphs.length - 1) {
      setCurrentParagraphIndex((prev) => prev + 1);
    }
  };

  const handlePrevParagraph = () => {
    soundManager.playClick();
    StoryNarrator.stop();
    setIsPlayingAudio(false);
    if (currentParagraphIndex > 0) {
      setCurrentParagraphIndex((prev) => prev - 1);
    }
  };

  const handleLaunchGames = () => {
    soundManager.playSuccess();
    StoryNarrator.stop();
    setIsPlayingAudio(false);
    onStartGames();
  };

  return (
    <div className="flex-1 py-6 sm:py-8 px-4 sm:px-6 max-w-4xl mx-auto w-full flex flex-col">
      {/* Top Bar for Story */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white/80 p-3 sm:p-4 rounded-2xl border border-[#B8A5F8]/40 shadow-xs">
        {/* زر «العودة إلى القصص» (Exact user label) */}
        <button
          onClick={() => {
            soundManager.playClick();
            StoryNarrator.stop();
            onBackToLibrary();
          }}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#26345C] hover:text-[#B8A5F8] transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى القصص</span>
        </button>

        {/* View Mode & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Narration Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#FFD966] text-[#26345C] animate-pulse shadow-sm'
                : 'bg-[#B8A5F8]/25 text-[#26345C] hover:bg-[#B8A5F8]/40'
            }`}
            title={isPlayingAudio ? 'إيقاف القراءة الصوتية' : 'تشغيل القراءة الصوتية'}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>إيقاف الصوت</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>استمع للقصة</span>
              </>
            )}
          </button>

          {/* Toggle Font Size */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsLargeFont(!isLargeFont);
            }}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isLargeFont
                ? 'bg-[#8ED8F8]/40 border-[#8ED8F8] text-[#26345C]'
                : 'bg-white border-[#26345C]/15 text-[#26345C]/75 hover:bg-slate-50'
            }`}
            title="تكبير / تصغير الخط"
          >
            <Type className="w-4 h-4" />
          </button>

          {/* Mode Switch: Step-by-step or Full Story */}
          <div className="flex bg-[#FFF9F0] p-1 rounded-xl border border-[#26345C]/10 text-xs font-semibold">
            <button
              onClick={() => {
                soundManager.playClick();
                StoryNarrator.stop();
                setIsPlayingAudio(false);
                setViewMode('step');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'step'
                  ? 'bg-white text-[#26345C] shadow-xs'
                  : 'text-[#26345C]/60 hover:text-[#26345C]'
              }`}
            >
              مشهد بمشهد
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                StoryNarrator.stop();
                setIsPlayingAudio(false);
                setViewMode('full');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'full'
                  ? 'bg-white text-[#26345C] shadow-xs'
                  : 'text-[#26345C]/60 hover:text-[#26345C]'
              }`}
            >
              القصة كاملة
            </button>
          </div>
        </div>
      </div>

      {/* Story Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-black text-[#26345C] font-['Tajawal'] mb-1">
          {story.title}
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#26345C]/75 max-w-xl mx-auto">
          {story.subtitle}
        </p>
      </div>

      {/* STEP-BY-STEP VIEW */}
      {viewMode === 'step' && (
        <div className="flex-1 flex flex-col justify-between">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-[#B8A5F8]/40 shadow-lg shadow-[#B8A5F8]/10 mb-6 flex flex-col">
            {/* Scene Illustration */}
            <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-[#8ED8F8]/10 mb-5 border border-[#26345C]/10">
              <img
                src={currentParagraph.image}
                alt={currentParagraph.caption}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2 left-2 bg-[#26345C]/85 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-xl font-medium text-center">
                {currentParagraph.caption}
              </div>
            </div>

            {/* Paragraph Text with Diacritics and Large Arabic Font */}
            <div
              className={`leading-relaxed text-[#26345C] font-semibold text-center py-3 px-2 sm:px-4 transition-all duration-200 ${
                isLargeFont ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}
              style={{ lineHeight: '2.1' }}
            >
              {currentParagraph.text}
            </div>

            {/* Step progress pills */}
            <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-[#26345C]/10">
              {story.paragraphs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playClick();
                    StoryNarrator.stop();
                    setIsPlayingAudio(false);
                    setCurrentParagraphIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentParagraphIndex
                      ? 'w-8 bg-[#B8A5F8]'
                      : 'w-2.5 bg-[#26345C]/20 hover:bg-[#26345C]/40'
                  }`}
                  aria-label={`المشهد ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevParagraph}
              disabled={currentParagraphIndex === 0}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold border transition-all cursor-pointer ${
                currentParagraphIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400'
                  : 'bg-white border-[#26345C]/20 text-[#26345C] hover:bg-slate-50 shadow-xs'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
              <span>المشهد السابق</span>
            </button>

            <span className="text-xs sm:text-sm font-bold text-[#26345C]/70">
              المشهد {currentParagraphIndex + 1} من {story.paragraphs.length}
            </span>

            {currentParagraphIndex < story.paragraphs.length - 1 ? (
              <button
                onClick={handleNextParagraph}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#8ED8F8] hover:bg-[#78cff3] text-[#26345C] text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                <span>المشهد التالي</span>
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              /* زر «ابدأ الألعاب» (Exact user label) */
              <button
                onClick={handleLaunchGames}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FFD966] hover:bg-[#ffe185] text-[#26345C] text-base font-extrabold shadow-md transition-all cursor-pointer animate-bounce"
              >
                <Gamepad2 className="w-5 h-5 text-[#26345C]" />
                <span>ابْدَأِ الأَلْعَابَ</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* FULL STORY VIEW */}
      {viewMode === 'full' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#B8A5F8]/40 shadow-lg shadow-[#B8A5F8]/10 space-y-8">
            {story.paragraphs.map((p, idx) => (
              <div
                key={p.id}
                className="flex flex-col md:flex-row gap-6 items-center border-b border-[#26345C]/10 last:border-0 pb-6 last:pb-0"
              >
                <div className="w-full md:w-1/3 aspect-16/10 rounded-2xl overflow-hidden shrink-0 border border-[#26345C]/10 shadow-xs">
                  <img
                    src={p.image}
                    alt={p.caption}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <span className="inline-block text-xs font-bold text-[#B8A5F8] mb-1">
                    المشهد {idx + 1}
                  </span>
                  <p
                    className={`leading-relaxed text-[#26345C] font-semibold ${
                      isLargeFont ? 'text-2xl' : 'text-xl'
                    }`}
                    style={{ lineHeight: '2.1' }}
                  >
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Launch Games CTA from full view */}
          <div className="text-center pt-2">
            <button
              onClick={handleLaunchGames}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-[#FFD966] hover:bg-[#ffe185] text-[#26345C] text-lg font-black shadow-lg shadow-[#FFD966]/40 border-2 border-[#FFD966] transition-all cursor-pointer font-['Tajawal']"
            >
              <Sparkles className="w-6 h-6 text-[#26345C] fill-[#26345C]" />
              <span>ابْدَأِ الأَلْعَابَ الخَاصَّةَ بِالقِصَّةِ</span>
              <ArrowLeft className="w-5 h-5 text-[#26345C]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
