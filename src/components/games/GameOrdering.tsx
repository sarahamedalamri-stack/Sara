import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, CheckCircle2, RotateCcw, ArrowLeft, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { OrderItem } from '../../types';
import { soundManager } from '../../utils/audio';

interface GameOrderingProps {
  items: OrderItem[];
  onCompleteGame: (earnedStars: number) => void;
  onBackToStory: () => void;
}

export const GameOrdering: React.FC<GameOrderingProps> = ({
  items,
  onCompleteGame,
  onBackToStory,
}) => {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isAllCorrect, setIsAllCorrect] = useState<boolean>(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  useEffect(() => {
    shuffleItems();
  }, [items]);

  const shuffleItems = () => {
    const shuffled = [...items];
    let attempts = 0;
    while (attempts < 10) {
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const isIdentical = shuffled.every((item, idx) => item.stepNumber === idx + 1);
      if (!isIdentical) break;
      attempts++;
    }
    setCurrentOrder(shuffled);
    setIsChecked(false);
    setIsAllCorrect(false);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    soundManager.playClick();
    setIsChecked(false);
    const newItems = [...currentOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newItems.length) {
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      setCurrentOrder(newItems);
    }
  };

  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIdx: number) => {
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    soundManager.playClick();
    setIsChecked(false);
    const newItems = [...currentOrder];
    const draggedItem = newItems[draggedIdx];
    newItems.splice(draggedIdx, 1);
    newItems.splice(targetIdx, 0, draggedItem);
    setCurrentOrder(newItems);
    setDraggedIdx(null);
  };

  const handleCheckOrder = () => {
    soundManager.playClick();
    setIsChecked(true);

    const allCorrect = currentOrder.every((item, idx) => item.stepNumber === idx + 1);
    if (allCorrect) {
      setIsAllCorrect(true);
      soundManager.playSuccess();
      soundManager.playStar();
    } else {
      setIsAllCorrect(false);
      soundManager.playTryAgain();
    }
  };

  const handleProceed = () => {
    soundManager.playSuccess();
    onCompleteGame(3); // 3 stars for ordering events correctly
  };

  return (
    <div className="flex-1 py-6 sm:py-8 px-4 sm:px-6 max-w-3xl mx-auto w-full flex flex-col justify-between">
      {/* Top Header */}
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

          {/* Game Tag (Exact User Title: رتّب الأحداث) */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8ED8F8]/30 border border-[#8ED8F8]/60 text-xs font-bold text-[#26345C]">
            <Layers className="w-4 h-4 text-[#26345C]" />
            <span>اللُّعْبَةُ الثَّانِيَةُ: رَتِّبِ الأَحْدَاثَ</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD966]/40 border border-[#FFD966]/60 text-xs font-bold text-[#26345C] tabular-nums">
            <Sparkles className="w-4 h-4 text-[#D97706] fill-[#FFD966]" />
            <span>3 نجوم</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#B8A5F8]/40 shadow-xs mb-6 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-[#26345C] font-['Tajawal'] mb-1">
            رَتِّبِ الأَحْدَاثَ التَّالِيَةَ بِحَسَبِ تَسَلْسُلِهَا فِي القِصَّةِ:
          </h3>
          <p className="text-xs sm:text-sm text-[#26345C]/75">
            اسْتَخْدِمْ أَزْرَارَ التَّحْرِيكِ (أَعْلَى / أَسْفَل) أَوْ قُمْ بِسَحْبِ البِطَاقَةِ لِتَرْتِيبِ الأَحْدَاثِ مِنَ البِدَايَةِ إِلَى النِّهَايَةِ.
          </p>
        </div>

        {/* Cards List */}
        <div className="space-y-3 mb-6">
          {currentOrder.map((item, idx) => {
            const isCorrectPosition = item.stepNumber === idx + 1;
            let cardBorder = 'border-[#26345C]/15';
            let cardBg = 'bg-white';

            if (isChecked) {
              if (isCorrectPosition) {
                cardBorder = 'border-emerald-400 ring-2 ring-emerald-200';
                cardBg = 'bg-[#A8E6CF]/20';
              } else {
                cardBorder = 'border-rose-300';
                cardBg = 'bg-[#FFB8D2]/20';
              }
            }

            return (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(idx)}
                className={`p-3 sm:p-4 rounded-2xl border-2 shadow-xs transition-all flex items-center justify-between gap-3 ${cardBg} ${cardBorder}`}
              >
                {/* Visual Number & Scene Thumbnail */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF9F0] border border-[#26345C]/20 flex items-center justify-center text-sm font-bold text-[#26345C] shrink-0 tabular-nums">
                    {idx + 1}
                  </div>

                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-[#26345C]/10 hidden xs:block">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#26345C] font-['Tajawal'] mb-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#26345C]/75 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Status indicator if checked */}
                {isChecked && (
                  <div className="shrink-0 text-xs font-bold">
                    {isCorrectPosition ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        صحيح
                      </span>
                    ) : (
                      <span className="text-rose-600">غيّر الموضع</span>
                    )}
                  </div>
                )}

                {/* Move Controls */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(idx, 'up')}
                    disabled={idx === 0 || isAllCorrect}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#8ED8F8]/30 disabled:opacity-30 disabled:cursor-not-allowed text-[#26345C] transition-colors cursor-pointer"
                    title="تحريك لأعلى"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(idx, 'down')}
                    disabled={idx === currentOrder.length - 1 || isAllCorrect}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#8ED8F8]/30 disabled:opacity-30 disabled:cursor-not-allowed text-[#26345C] transition-colors cursor-pointer"
                    title="تحريك لأسفل"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feedback Section */}
        {isChecked && (
          <div
            className={`p-4 rounded-2xl border-2 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right ${
              isAllCorrect
                ? 'bg-[#A8E6CF]/30 border-[#A8E6CF] text-[#134e4a]'
                : 'bg-[#FFB8D2]/30 border-[#FFB8D2] text-[#881337]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  isAllCorrect ? 'bg-[#FFD966] text-[#26345C]' : 'bg-[#FFB8D2] text-[#881337]'
                }`}
              >
                {isAllCorrect ? <Sparkles className="w-5 h-5 fill-[#26345C]" /> : <RotateCcw className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-bold text-base">
                  {isAllCorrect ? 'بَارَكَ اللهُ فِيكَ! رَتَّبْتَ الأَحْدَاثَ بِإِتْقَانٍ تَامٍّ! ⭐ (+3 نجوم)' : 'حَاوِلْ مَرَّةً أُخْرَى، لَقَدِ اقْتَرَبْتَ!'}
                </div>
                <div className="text-xs">
                  {isAllCorrect
                    ? 'أَحْدَاثُ القِصَّةِ الآنَ مُتَسَلْسِلَةٌ تَمَامًا كَمَا وَرَدَتْ فِي الحِكَايَةِ.'
                    : 'حَرِّكِ البِطَاقَاتِ الَّتِي بِاللَّوْنِ الأَحْمَرِ حَتَّى تُصْبِحَ جَمِيعُهَا صَحِيحَةً.'}
                </div>
              </div>
            </div>

            {!isAllCorrect && (
              <button
                onClick={shuffleItems}
                className="px-4 py-2 rounded-xl bg-white text-[#881337] border border-[#FFB8D2] font-bold text-xs hover:bg-rose-50 cursor-pointer shrink-0"
              >
                إِعَادَةُ الخَلْطِ
              </button>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center justify-between gap-4">
        {!isAllCorrect ? (
          <button
            onClick={handleCheckOrder}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#8ED8F8] hover:bg-[#72cef5] text-[#26345C] font-extrabold text-base shadow-sm transition-all cursor-pointer font-['Tajawal']"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>تَحَقَّقْ مِنَ التَّرْتِيبِ</span>
          </button>
        ) : (
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#FFD966] hover:bg-[#ffe185] text-[#26345C] font-extrabold text-base shadow-md transition-all cursor-pointer font-['Tajawal'] mr-auto"
          >
            <span>الانْتِقَالُ إِلَى لُعْبَةِ «اكْتَشِفِ السِّرَّ»</span>
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
