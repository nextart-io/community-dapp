'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface MenuModalProps {
  showMenuPopup: boolean;
  setShowMenuPopup: Dispatch<SetStateAction<boolean>>;
  setShowWalletPopup: Dispatch<SetStateAction<boolean>>;
}

export default function MenuModal({
  showMenuPopup,
  setShowMenuPopup,
  setShowWalletPopup
}: MenuModalProps) {
  if (!showMenuPopup) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 max-w-[320px] md:max-w-[400px] w-full mx-4">
        <div className="mb-4 md:mb-6">
          <button 
            className="bg-[#FFEE32] w-full py-3 md:py-4 px-4 text-lg md:text-xl font-bold rounded-xl md:rounded-2xl hover:bg-[#F0E030] transition-colors"
            onClick={() => {
              setShowMenuPopup(false);
              setShowWalletPopup(true);
            }}
          >
            CONNECT WALLET
          </button>
        </div>
        <div className="space-y-2 md:space-y-3">
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 md:py-4 px-4 rounded-xl md:rounded-2xl w-full hover:bg-[#E63529] transition-colors">
            <Image 
              src="/navbar/telegram.png" 
              alt="Telegram" 
              width={24} 
              height={24} 
              className="object-contain mr-3 md:w-[28px] md:h-[28px]"
            />
          </a>
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 md:py-4 px-4 rounded-xl md:rounded-2xl w-full hover:bg-[#E63529] transition-colors">
            <Image 
              src="/navbar/twitter.png" 
              alt="Twitter" 
              width={24} 
              height={24} 
              className="object-contain mr-3 md:w-[28px] md:h-[28px]"
            />
          </a>
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 md:py-4 px-4 rounded-xl md:rounded-2xl w-full hover:bg-[#E63529] transition-colors">
            <Image 
              src="/navbar/xiaohongshu.png" 
              alt="小红书" 
              width={24} 
              height={24} 
              className="object-contain mr-3 md:w-[28px] md:h-[28px]"
            />
          </a>
        </div>
        <button 
          className="flex justify-center items-center w-full border border-gray-300 rounded-xl md:rounded-2xl py-3 md:py-4 px-4 mt-4 md:mt-6 hover:bg-gray-100 transition-colors"
          onClick={() => setShowMenuPopup(false)}
        >
          <Image 
            src="/navbar/language.png" 
            alt="语言" 
            width={24} 
            height={24} 
            className="object-contain mr-3 md:w-[28px] md:h-[28px]"
          />
        </button>
      </div>
    </div>
  );
} 