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
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-[320px] w-full mx-4">
        <div className="mb-4">
          <button 
            className="bg-[#FFEE32] w-full py-3 px-4 text-lg font-bold rounded-xl"
            onClick={() => {
              setShowMenuPopup(false);
              setShowWalletPopup(true);
            }}
          >
            CONNECT WALLET
          </button>
        </div>
        <div className="space-y-2">
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 px-4 rounded-xl w-full">
            <Image 
              src="/navbar/telegram.png" 
              alt="Telegram" 
              width={24} 
              height={24} 
              className="object-contain mr-3"
            />
          </a>
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 px-4 rounded-xl w-full">
            <Image 
              src="/navbar/twitter.png" 
              alt="Twitter" 
              width={24} 
              height={24} 
              className="object-contain mr-3"
            />
          </a>
          <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white py-3 px-4 rounded-xl w-full">
            <Image 
              src="/navbar/xiaohongshu.png" 
              alt="小红书" 
              width={24} 
              height={24} 
              className="object-contain mr-3"
            />
          </a>
        </div>
        <button 
          className="flex justify-center items-center w-full border border-gray-300 rounded-xl py-3 px-4 mt-4"
          onClick={() => setShowMenuPopup(false)}
        >
          <Image 
            src="/navbar/language.png" 
            alt="语言" 
            width={24} 
            height={24} 
            className="object-contain mr-3"
          />
        </button>
      </div>
    </div>
  );
} 