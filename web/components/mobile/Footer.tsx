'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bg-black text-white py-8 px-6 rounded-3xl border border-transparent" 
         style={{ borderImage: 'linear-gradient(to bottom, #FFEE00, #FF3B30) 1', borderWidth: '2px' }}>
      <div className="mb-8">
        <div className="mb-6">
          <Image 
            src="/landingpage/nextart.png" 
            alt="NEXT ART" 
            width={200} 
            height={70} 
            className="object-contain"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <Image 
              src="/qr-code-Join wechat group.png" 
              alt="QR Code" 
              width={120} 
              height={120} 
              className="mx-auto mb-2"
            />
            <p className="text-sm">Join wechat group</p>
          </div>
          <div className="text-center">
            <Image 
              src="/qr-code-Contact assistant.png" 
              alt="QR Code" 
              width={120} 
              height={120} 
              className="mx-auto mb-2"
            />
            <p className="text-sm">Contact assistant</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-[#FFEE00] text-2xl font-bold mb-3">COMMUNITY</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#" className="text-[#FFEE00] hover:text-white text-xl">
              Financial Reports
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="mb-8">
        <h3 className="text-[#FFEE00] text-2xl font-bold mb-3">LEARN</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#" className="text-[#FFEE00] hover:text-white text-xl">
              Upcoming Co-learning
            </Link>
          </li>
          <li>
            <Link href="#" className="text-[#FFEE00] hover:text-white text-xl">
              Oncoming Co-learning
            </Link>
          </li>
          <li>
            <Link href="#" className="text-[#FFEE00] hover:text-white text-xl">
              Past Co-learning
            </Link>
          </li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-[#FFEE00] text-2xl font-bold mb-3">Follow</h3>
        <ul className="space-y-2">
          <li>
            <Link href="#" className="text-[#FFEE00] hover:text-white text-xl">
              X
            </Link>
          </li>
          <li>
            <Link href="#" className="text-[#FFEE00] hover:text-white text-xl">
              Telegram
            </Link>
          </li>
          <li>
            <Link href="#" className="text-[#FFEE00] hover:text-white text-xl">
              Xiaohongshu
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
} 