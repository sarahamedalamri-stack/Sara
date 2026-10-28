import React, { useEffect, useState } from 'react';
import { Trophy, Sparkles, RotateCcw, BookOpen, Star, CheckCircle, Award, Printer } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface GameCelebrationProps {
  storyTitle: string;
  totalStars: number;
  quizScore: number;
  maxQuiz: number;
  riddlesScore: number;
  maxRiddles: number;
  onReplay: () => void;
  onBackToLibrary: () => void;
}

export const GameCelebration: React.FC<GameCelebrationProps> = ({
  storyTitle,
  totalStars,
  quizScore,
  maxQuiz,
  riddlesScore,
  maxRiddles,
  onReplay,
  onBackToLibrary,
}) => {
  const [studentName, setStudentName] = useState<string>('');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  useEffect(() => {
    soundManager.playApplause();
  }, []);

  const handlePrintCertificate = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6 max-w-3xl mx-auto w-full flex flex-col items-center text-center my-auto">
      {/* Trophy Badge */}
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#FFD966] text-[#26345C] flex items-center justify-center shadow-xl shadow-[#FFD966]/40 border-4 border-white animate-bounce">
          <Trophy className="w-14 h-14 sm:w-18 sm:h-18 text-[#26345C]" />
        </div>
        <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-[#B8A5F8] text-white flex items-center justify-center shadow-md animate-pulse">
          <Sparkles className="w-5 h-5 text-[#26345C] fill-[#26345C]" />
        </div>
      </div>

      {/* Main Success Title */}
      <div className="inline-block px-4 py-1.5 rounded-full bg-[#A8E6CF]/40 border border-[#A8E6CF] text-xs sm:text-sm font-bold text-emerald-950 mb-3">
        مُبَارَكٌ لَكَ يَا مُبْدِعُ!
      </div>
      <h2 className="text-3xl sm:text-5xl font-black text-[#26345C] font-['Tajawal'] mb-3">
        أَنْتَ بَطَلُ القِرَاءَةِ! 🏆
      </h2>
      <p className="text-base sm:text-lg font-semibold text-[#26345C]/80 max-w-lg mb-8 leading-relaxed">
        لَقَدْ أَكْمَلْتَ قِرَاءَةَ قِصَّةِ «{storyTitle}» وَأَنْجَزْتَ جَمِيعَ الأَلْعَابِ التَّفَاعُلِيَّةِ بِنَجَاحٍ بَاهِرٍ!
      </p>

      {/* Score Summary Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#B8A5F8]/40 shadow-lg shadow-[#B8A5F8]/10 mb-8">
        <h3 className="text-lg font-bold text-[#26345C] font-['Tajawal'] mb-4 pb-3 border-b border-[#26345C]/10 flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-[#FFD966] fill-[#FFD966]" />
          <span>سِجِلُّ الإِنْجَازِ وَالنُّقَاطِ</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {/* Game 1 Result */}
          <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#B8A5F8]/30 flex flex-col items-center">
            <span className="text-xs text-[#26345C]/70 mb-1 font-semibold">تحدي الفهم</span>
            <span className="text-xl font-black text-[#26345C] tabular-nums font-['Tajawal']">
              {quizScore} / {maxQuiz}
            </span>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-bold">
              <CheckCircle className="w-3.5 h-3.5" /> 5 نجوم
            </span>
          </div>

          {/* Game 2 Result */}
          <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#8ED8F8]/40 flex flex-col items-center">
            <span className="text-xs text-[#26345C]/70 mb-1 font-semibold">ترتيب الأحداث</span>
            <span className="text-xl font-black text-[#26345C] tabular-nums font-['Tajawal']">
              ٤ / ٤
            </span>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-bold">
              <CheckCircle className="w-3.5 h-3.5" /> 3 نجوم
            </span>
          </div>

          {/* Game 3 Result */}
          <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#FFB8D2]/40 flex flex-col items-center">
            <span className="text-xs text-[#26345C]/70 mb-1 font-semibold">اكتشف السر</span>
            <span className="text-xl font-black text-[#26345C] tabular-nums font-['Tajawal']">
              {riddlesScore} / {maxRiddles}
            </span>
            <span className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-bold">
              <CheckCircle className="w-3.5 h-3.5" /> 4 نجوم
            </span>
          </div>
        </div>

        {/* Total Stars Pill */}
        <div className="py-3 px-6 rounded-2xl bg-[#FFD966]/30 border border-[#FFD966]/80 flex items-center justify-center gap-3">
          <Sparkles className="w-6 h-6 text-[#D97706] fill-[#FFD966]" />
          <span className="text-lg font-black text-[#26345C] font-['Tajawal']">
            مَجْمُوعُ نُجُومِكَ الذَّهَبِيَّةِ: {totalStars} نَجْمَةً! ⭐
          </span>
        </div>
      </div>

      {/* Official Certificate of Achievement: بطل القراءة */}
      <div className="w-full bg-linear-to-b from-white to-[#FFF9F0] rounded-3xl p-6 sm:p-8 border-4 border-double border-[#FFD966] shadow-xl shadow-[#FFD966]/20 mb-8 relative overflow-hidden text-center">
        {/* Decorative corner ribbons */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#26345C]/15">
          <div className="text-right">
            <span className="text-xs font-bold text-[#26345C]/70 block">سَلْطَنَةُ عُمانَ</span>
            <span className="text-xs font-semibold text-[#26345C]/60">مُبَادَرَةُ أَبْطَالِ القِرَاءَةِ</span>
          </div>
          <Award className="w-10 h-10 text-[#FFD966]" />
          <div className="text-left">
            <span className="text-xs font-bold text-[#26345C]/70 block">أَبْطَالُ القِرَاءَةِ</span>
            <span className="text-xs font-semibold text-[#26345C]/60">تَمَيُّزٌ قِرَائِيٌّ</span>
          </div>
        </div>

        <h4 className="text-2xl sm:text-3xl font-black text-[#26345C] font-['Tajawal'] mb-3 tracking-wide">
          شَهَادَةُ إِنْجَازٍ: بَطَلُ القِرَاءَةِ
        </h4>

        <p className="text-sm sm:text-base text-[#26345C]/80 mb-4 leading-relaxed">
          تَشْهَدُ إِدَارَةُ المِنَصَّةِ بِأَنَّ البَطَلَ المُمَيَّزَ:
        </p>

        {/* Student Name Field */}
        <div className="max-w-xs mx-auto mb-4">
          {isEditingName ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="اكْتُبِ اسْمَكَ هُنَا..."
                className="flex-1 px-3 py-1.5 border-2 border-[#B8A5F8] rounded-xl text-center font-bold text-[#26345C] text-base focus:outline-none bg-white"
                autoFocus
              />
              <button
                onClick={() => setIsEditingName(false)}
                className="px-3 py-1.5 rounded-xl bg-[#8ED8F8] text-[#26345C] font-bold text-xs"
              >
                حِفْظ
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="w-full py-1.5 px-4 rounded-xl border-b-2 border-dashed border-[#B8A5F8] text-xl font-black text-[#26345C] hover:bg-[#8ED8F8]/10 transition-colors"
              title="اضغط لتعديل الاسم على الشهادة"
            >
              {studentName.trim() ? studentName : '(اضْغَطْ هُنَا لِكِتَابَةِ اسْمِكَ)'}
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-[#26345C]/80 max-w-md mx-auto mb-6 leading-relaxed">
          قَدْ أَتَمَّ قِرَاءَةَ قِصَّةِ «{storyTitle}» وَأَجَابَ عَنْ جَمِيعِ أَنْشِطَةِ الفَهْمِ وَالتَّرْتِيبِ وَالاسْتِنْتَاجِ بِدَرَجَةِ شَرَفٍ.
        </p>

        {/* Designer Signature on Certificate */}
        <div className="flex items-center justify-between pt-4 border-t border-[#26345C]/15 text-xs text-[#26345C]/80">
          <div className="text-right">
            <span className="block font-medium">الخَتْمُ التَّقْدِيرِيُّ:</span>
            <span className="font-bold text-emerald-800">★ مُجْتَازٌ بِمَرْتَبَةِ الشَّرَفِ ★</span>
          </div>
          <div className="text-left">
            <span className="block font-medium">إِعْدَادٌ وَإِشْرَافٌ:</span>
            <span className="font-bold text-[#26345C]">أ. سَارَه العَامِرِي</span>
          </div>
        </div>

        <button
          onClick={handlePrintCertificate}
          className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#26345C]/70 hover:text-[#26345C] cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>طِبَاعَةُ الشَّهَادَةِ أَوْ حِفْظُهَا كَـ PDF</span>
        </button>
      </div>

      {/* Action Buttons: العب مرة أخرى & اختر قصة أخرى (Exact user labels) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => {
            soundManager.playClick();
            onReplay();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-[#26345C] font-bold text-base border-2 border-[#26345C]/20 shadow-xs transition-all cursor-pointer font-['Tajawal']"
        >
          <RotateCcw className="w-5 h-5" />
          <span>الْعَبْ مَرَّةً أُخْرَى</span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onBackToLibrary();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#8ED8F8] hover:bg-[#70cdf5] text-[#26345C] font-extrabold text-base shadow-sm transition-all cursor-pointer font-['Tajawal']"
        >
          <BookOpen className="w-5 h-5 text-[#26345C]" />
          <span>اخْتَرْ قِصَّةً أُخْرَى</span>
        </button>
      </div>
    </div>
  );
};
