'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface HeaderProps {
  setShowMenuPopup: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setShowMenuPopup }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-5">
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
        className="p-0 bg-[#FFEE32] rounded-full w-12 h-12 flex items-center justify-center"
        onClick={() => setShowMenuPopup(true)}
      >
        <Image 
          src="/landingpage/activites/solar_list-bold-duotone.png" 
          alt="菜单" 
          width={24} 
          height={24} 
          className="object-contain"
        />
      </button>
    </header>
  );
} 