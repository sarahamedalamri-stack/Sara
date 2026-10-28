import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../../types';
import { soundManager } from '../../utils/audio';

interface GameQuizProps {
  questions: QuizQuestion[];
  onCompleteGame: (earnedStars: number) => void;
  onBackToStory: () => void;
}

export const GameQuiz: React.FC<GameQuizProps> = ({
  questions,
  onCompleteGame,
  onBackToStory,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [earnedStarsCount, setEarnedStarsCount] = useState<number>(0);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<number[]>([]);

  const currentQ = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted && isCorrect) return; // Prevent changing after correct answer
    soundManager.playClick();
    setSelectedOption(idx);
    setIsSubmitted(true);

    if (idx === currentQ.correctIndex) {
      setIsCorrect(true);
      soundManager.playSuccess();
      soundManager.playStar();
      if (!answeredQuestionIds.includes(currentQ.id)) {
        setEarnedStarsCount((prev) => prev + 1);
        setAnsweredQuestionIds((prev) => [...prev, currentQ.id]);
      }
    } else {
      setIsCorrect(false);
      soundManager.playTryAgain();
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
      setIsCorrect(false);
    } else {
      soundManager.playSuccess();
      onCompleteGame(earnedStarsCount);
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="flex-1 py-6 sm:py-8 px-4 sm:px-6 max-w-3xl mx-auto w-full flex flex-col justify-between">
      {/* Top Header & Breadcrumb */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToStory();
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#26345C] hover:text-[#B8A5F8] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للقصة</span>
          </button>

          {/* Game Tag (Exact User Title: تحدي الفهم) */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#B8A5F8]/30 border border-[#B8A5F8]/50 text-xs font-bold text-[#26345C]">
            <HelpCircle className="w-4 h-4 text-[#26345C]" />
            <span>اللُّعْبَةُ الأُولَى: تَحَدِّي الفَهْمِ</span>
          </div>

          {/* Stars Earned */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD966]/40 border border-[#FFD966]/60 text-xs font-bold text-[#26345C] tabular-nums">
            <Sparkles className="w-4 h-4 text-[#D97706] fill-[#FFD966]" />
            <span>{earnedStarsCount} نجوم</span>
          </div>
        </div>

        {/* Progress Bar & Question Counter */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-[#26345C]/75 mb-1.5">
            <span>السُّؤَالُ {currentIndex + 1} مِنْ {questions.length}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#26345C]/15 p-0.5">
            <div
              className="h-full bg-[#8ED8F8] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#B8A5F8]/40 shadow-lg shadow-[#B8A5F8]/10 mb-6 text-center">
          <span className="text-xs font-bold text-[#B8A5F8] tracking-wide mb-2 block">
            اقْرَأِ السُّؤَالَ جَيِّدًا وَاخْتَرِ الإِجَابَةَ الصَّحِيحَةَ:
          </span>
          <h3
            className="text-xl sm:text-2xl font-bold text-[#26345C] font-['Tajawal'] leading-relaxed"
            style={{ lineHeight: '1.9' }}
          >
            {currentQ.question}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3.5 mb-6">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            let optionStyles = 'bg-white border-[#26345C]/15 hover:border-[#8ED8F8] hover:bg-[#8ED8F8]/10 text-[#26345C]';

            if (isSubmitted) {
              if (isSelected) {
                if (isCorrect) {
                  optionStyles = 'bg-[#A8E6CF]/30 border-[#A8E6CF] text-[#134e4a] ring-2 ring-[#A8E6CF] font-bold';
                } else {
                  optionStyles = 'bg-[#FFB8D2]/30 border-[#FFB8D2] text-rose-900 font-bold';
                }
              } else if (idx === currentQ.correctIndex && !isCorrect) {
                optionStyles = 'bg-white border-dashed border-[#A8E6CF]/60 text-[#26345C]';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isSubmitted && isCorrect}
                className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-right transition-all flex items-center justify-between gap-3 text-base sm:text-lg font-semibold cursor-pointer shadow-xs ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-[#FFF9F0] border border-[#26345C]/15 flex items-center justify-center text-sm font-bold text-[#26345C] shrink-0">
                    {idx === 0 ? 'أ' : idx === 1 ? 'ب' : 'ج'}
                  </span>
                  <span>{option}</span>
                </div>
                {isSubmitted && isSelected && (
                  <div>
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-lg">إجابة غير صحيحة</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Card */}
        {isSubmitted && (
          <div
            className={`p-4 sm:p-5 rounded-2xl border-2 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right transition-all animate-fade-in ${
              isCorrect
                ? 'bg-[#A8E6CF]/25 border-[#A8E6CF] text-[#134e4a]'
                : 'bg-[#FFB8D2]/25 border-[#FFB8D2] text-[#881337]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isCorrect ? (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#FFD966] text-[#26345C] flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-6 h-6 fill-[#26345C]" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-emerald-900">
                      أَحْسَنْتَ يَا بَطَلَ القِرَاءَةِ! ✨ (+1 نجمة)
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-800">
                      {currentQ.explanation}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#FFB8D2] text-[#881337] flex items-center justify-center shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-base font-bold">
                      حَاوِلْ مَرَّةً أُخْرَى، أَنْتَ تَسْتَطِيعُ! 💪
                    </div>
                    <div className="text-xs sm:text-sm">
                      تَأَمَّلْ أَحْدَاثَ القِصَّةِ جَيِّدًا وَاخْتَرِ الإِجَابَةَ الصَّحِيحَةَ.
                    </div>
                  </div>
                </>
              )}
            </div>

            {!isCorrect && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 rounded-xl bg-white text-[#881337] border border-[#FFB8D2] font-bold text-sm hover:bg-rose-50 cursor-pointer shrink-0"
              >
                إِعَادَةُ المُحَاوَلَةِ
              </button>
            )}
          </div>
        )}
      </div>

      {/* Next Question Navigation */}
      <div className="pt-2 flex justify-end">
        {isSubmitted && isCorrect && (
          <button
            onClick={handleNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#FFD966] hover:bg-[#ffe185] text-[#26345C] font-extrabold text-base shadow-md transition-all cursor-pointer font-['Tajawal']"
          >
            <span>{isLastQuestion ? 'الانْتِقَالُ إِلَى لُعْبَةِ «رَتِّبِ الأَحْدَاثَ»' : 'السُّؤَالُ التَّالِي'}</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
