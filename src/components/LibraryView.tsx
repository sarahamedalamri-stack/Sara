import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Star, ChevronLeft, CheckCircle2, Search, X } from 'lucide-react';
import { Story } from '../types';
import { soundManager } from '../utils/audio';

interface LibraryViewProps {
  stories: Story[];
  onSelectStory: (story: Story) => void;
  completedStories: string[];
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  stories,
  onSelectStory,
  completedStories,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelect = (story: Story) => {
    soundManager.playClick();
    onSelectStory(story);
  };

  const filteredStories = useMemo(() => {
    if (!searchQuery.trim()) return stories;
    const query = searchQuery.trim().toLowerCase();
    return stories.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.subtitle.toLowerCase().includes(query) ||
        s.theme.toLowerCase().includes(query) ||
        s.moralValue.toLowerCase().includes(query)
    );
  }, [stories, searchQuery]);

  return (
    <div className="flex-1 py-8 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#26345C]/80 bg-[#8ED8F8]/30 px-3.5 py-1 rounded-full mb-3 border border-[#8ED8F8]/60">
          <BookOpen className="w-4 h-4 text-[#26345C]" />
          <span>مَكْتَبَةُ القَصَصِ المُصَوَّرَةِ (15 قِصَّةً كَامِلَةً)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#26345C] font-['Tajawal'] mb-3">
          اخْتَرْ قِصَّتَكَ وَابْدَأِ القِرَاءَةَ وَاللَّعِبَ!
        </h2>
        <p className="text-sm sm:text-base text-[#26345C]/80 leading-relaxed">
          15 قِصَّةً تَرْبَوِيَّةً أَصِيلَةً، لِكُلِّ قِصَّةٍ ثَلاثُ أَلْعَابٍ تَفَاعُلِيَّةٍ مُمْتِعَةٍ وَنُجُومٌ وَشَهَادَاتُ تَقْدِيرٍ.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#26345C]/50 absolute right-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابْحَثْ عَنْ عُنْوَانِ القِصَّةِ أَوْ قِيمَتِهَا..."
              className="w-full pl-10 pr-12 py-3 bg-white rounded-2xl border-2 border-[#B8A5F8]/40 focus:border-[#B8A5F8] focus:outline-none shadow-xs text-sm sm:text-base text-[#26345C] placeholder:text-[#26345C]/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 p-1 rounded-full hover:bg-slate-100 text-[#26345C]/60"
                title="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-xs text-[#26345C]/70 mt-2 text-right">
              نَتَائِجُ البَحْثِ: عُثِرَ عَلَى {filteredStories.length} قِصَّةً
            </div>
          )}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-[#26345C]/20 p-8 max-w-md mx-auto">
          <BookOpen className="w-12 h-12 text-[#26345C]/30 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#26345C] mb-1">لَمْ نَعْثُرْ عَلَى قِصَّةٍ تُطَابِقُ بَحْثَكَ</h3>
          <p className="text-xs text-[#26345C]/60 mb-4">جَرِّبِ البَحْثَ بِكَلِمَةٍ أُخْرَى مِثْلَ: النَّخِيل، الصَّدَاقَة، الكَنْز، السَّلْحَفَاة...</p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-4 py-2 rounded-xl bg-[#8ED8F8] text-[#26345C] text-xs font-bold"
          >
            عَرْضُ جَمِيعِ القِصَصِ
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredStories.map((story, idx) => {
            const isCompleted = completedStories.includes(story.id);

            return (
              <div
                key={story.id}
                className="bg-white rounded-3xl border-2 border-[#B8A5F8]/30 shadow-md shadow-[#B8A5F8]/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#B8A5F8] group"
              >
                {/* Story Image Container */}
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-[#8ED8F8]/10">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-[#26345C] shadow-xs flex items-center gap-1.5 border border-[#B8A5F8]/30">
                      <span className="w-5 h-5 rounded-full bg-[#FFD966] text-[#26345C] flex items-center justify-center text-[11px] font-black">
                        {idx + 1}
                      </span>
                      <span>{story.gradeLevel}</span>
                    </div>

                    {isCompleted && (
                      <div className="absolute top-3 left-3 bg-[#A8E6CF] text-[#134e4a] px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>مُكْتَمَلَة!</span>
                      </div>
                    )}
                  </div>

                  {/* Story Text Metadata */}
                  <div className="p-5 pb-3">
                    <h3 className="text-xl font-black text-[#26345C] font-['Tajawal'] mb-1.5 group-hover:text-[#6c51d6] transition-colors leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#26345C]/75 mb-3 line-clamp-2">
                      {story.subtitle}
                    </p>

                    <div className="p-2.5 bg-[#FFF9F0] rounded-xl border border-[#FFB8D2]/40 text-[11px] sm:text-xs text-[#26345C]/85 mb-2 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB8D2] shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold text-[#26345C]">القِيمَةُ:</strong>{' '}
                        {story.theme}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Read & Play Action Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleSelect(story)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#8ED8F8] hover:bg-[#70cef5] active:scale-98 font-bold text-sm sm:text-base text-[#26345C] shadow-xs transition-all cursor-pointer font-['Tajawal']"
                  >
                    <BookOpen className="w-4 h-4 text-[#26345C]" />
                    <span>اقْرَأْ وَالْعَبْ</span>
                    <ChevronLeft className="w-4 h-4 text-[#26345C] transition-transform group-hover:-translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
