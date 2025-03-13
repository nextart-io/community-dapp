'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface HeaderProps {
  setShowMenuPopup: Dispatch<SetStateAction<boolean>>;
  setShowWalletPopup: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setShowMenuPopup, setShowWalletPopup }: HeaderProps) {
  return (
    <header className="w-full bg-white z-50">
      {/* 移动端Header */}
      <div className="flex justify-between items-center p-5 md:hidden">
        <div className="flex items-center">
          <Image 
            src="/navbar/logo.png" 
            alt="NEXT ART" 
            width={150} 
            height={40} 
            className="object-contain"
          />
        </div>
        <button 
          className="p-0 bg-[#FFFC26] rounded-full w-12 h-12 flex items-center justify-center"
          onClick={() => setShowMenuPopup(true)}
        >
          <Image 
            src="/landingpage/activites/solar_list-bold-duotone.png" 
            alt="菜单" 
            width={48} 
            height={48} 
            className="object-contain"
          />
        </button>
      </div>

      {/* 桌面端Header */}
      <div className="hidden md:block fixed top-0 left-0 right-0 bg-white shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image 
                src="/navbar/logo.png" 
                alt="NEXT ART" 
                width={180} 
                height={48} 
                className="object-contain"
              />
            </div>
            
            {/* 桌面端显示的菜单内容 */}
            <div className="flex items-center space-x-4">

              {/* 连接钱包按钮 */}
              <button 
                className="bg-[#FFEE32] py-2 px-4 text-base font-bold rounded-full hover:bg-[#F0E030] transition-colors"
                onClick={() => setShowWalletPopup(true)}
              >
                CONNECT WALLET
              </button>

              {/* 社交媒体图标 */}
              <div className="flex items-center space-x-2">
                <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white p-2 rounded-full hover:bg-[#E63529] transition-colors">
                  <Image 
                    src="/navbar/telegram.png" 
                    alt="Telegram" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </a>
                <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white p-2 rounded-full hover:bg-[#E63529] transition-colors">
                  <Image 
                    src="/navbar/twitter.png" 
                    alt="Twitter" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </a>
                <a href="#" className="flex justify-center items-center bg-[#FF3B30] text-white p-2 rounded-full hover:bg-[#E63529] transition-colors">
                  <Image 
                    src="/navbar/xiaohongshu.png" 
                    alt="小红书" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </a>
                <button 
                  className="flex justify-center items-center border border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-colors"
                  aria-label="切换语言"
                >
                  <Image 
                    src="/navbar/language.png" 
                    alt="语言" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 