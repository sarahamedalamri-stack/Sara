import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#26345C]/10 bg-[#FFF9F0] py-8 text-[#26345C]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
        <div className="flex flex-col gap-1">
          <div className="text-base font-bold text-[#26345C] font-['Tajawal'] flex items-center justify-center sm:justify-start gap-1.5">
            <span>منصة «أبطال القراءة»</span>
            <span className="text-xs font-normal text-[#26345C]/70">
              • سلطنة عُمان
            </span>
          </div>
          <p className="text-xs text-[#26345C]/70">
            بيئة تفاعلية هادفة لتعزيز القراءة والفهم القرائي بالقصص والألعاب التعليمية
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#26345C] bg-[#B8A5F8]/20 px-3.5 py-1.5 rounded-full border border-[#B8A5F8]/40">
            <Heart className="w-4 h-4 text-[#FFB8D2] fill-[#FFB8D2]" />
            <span>جميع الحقوق محفوظة © أ. ساره العامري</span>
          </div>
          <span className="text-[11px] text-[#26345C]/60">
            صُمِّم بكل حُب لدعم أبطال وبطلات القراءة في عُمان
          </span>
        </div>
      </div>
    </footer>
  );
};
