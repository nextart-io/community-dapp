'use client'

import Image from 'next/image'
import { useState } from 'react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  role: string;
  twitterHandle: string;
  links: string[];
  verified?: boolean;
}

export default function CoPartners() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  
  // 示例合作伙伴数据
  const partners: Partner[] = [
    {
      id: 1,
      name: "Mindfrog.Sui",
      logo: "/mindfrog.png",
      role: "Project Director | Sui Developer | Cooking Project",
      twitterHandle: "@MindfrogCrypto",
      links: ["@SuiSecurity", "@pumpsui", "@nextart_io"],
      verified: true
    },
    {
      id: 2,
      name: "Mindfrog.Sui",
      logo: "/mindfrog.png",
      role: "Project Director | Sui Developer | Cooking Project",
      twitterHandle: "@MindfrogCrypto",
      links: ["@SuiSecurity", "@pumpsui", "@nextart_io"],
      verified: true
    },
    {
      id: 3,
      name: "SuiDev.io",
      logo: "/mindfrog.png",
      role: "Head of Development | Smart Contract Expert",
      twitterHandle: "@SuiDev",
      links: ["@SuiNetwork", "@MystenLabs"],
      verified: true
    }
  ];
  
  return (
    <div className="mb-8">
      <div className="bg-black text-white p-4 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black">CO-PARTERNER</h2>
          <Image 
            src="/landingpage/activites/solar_list-bold-duotone.png" 
            alt="列表" 
            width={48} 
            height={48} 
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="bg-[#444444] p-4 rounded-b-2xl">
        {/* 第一行滚动 - 从左向右 */}
        <div 
          className="py-3 overflow-hidden relative"
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <div 
            className="flex space-x-4 animate-scroll-left"
            style={{
              animationPlayState: isHovered1 ? "paused" : "running"
            }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <TwitterCard 
                key={`row1-${partner.id}-${index}`} 
                partner={partner} 
              />
            ))}
          </div>
        </div>
        
        {/* 第二行滚动 - 从右向左 */}
        <div 
          className="py-3 overflow-hidden relative"
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          <div 
            className="flex space-x-4 animate-scroll-right"
            style={{
              animationPlayState: isHovered2 ? "paused" : "running"
            }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <TwitterCard 
                key={`row2-${partner.id}-${index}`} 
                partner={partner} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TwitterCardProps {
  partner: Partner;
}

function TwitterCard({ partner }: TwitterCardProps) {
  return (
    <div className="bg-white rounded-3xl p-3 flex flex-col min-w-[320px]">
      <div className="flex items-center">
        <Image 
          src={partner.logo} 
          alt={partner.name} 
          width={48} 
          height={48} 
          className="rounded-full mr-3"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-[15px] text-[#0f1419]">
              {partner.name}
            </h3>
            {partner.verified && (
              <Image 
                src="/mindfrog.png" 
                alt="已验证" 
                width={16} 
                height={16} 
              />
            )}
            <Image 
              src="/mindfrog.png" 
              alt="Sui" 
              width={16} 
              height={16} 
            />
          </div>
          <p className="text-[13px] text-[#536471]">{partner.twitterHandle}</p>
        </div>
        <div className="text-xl text-[#536471]">𝕏</div>
      </div>
      
      <p className="text-[13px] text-[#0f1419] mt-1 truncate">{partner.role}</p>
      <p className="text-[13px] text-[#1d9bf0] truncate whitespace-nowrap">
        {partner.links.map((link, index) => (
          <span key={index} className="hover:underline cursor-pointer">
            {link}{index < partner.links.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>
    </div>
  );
} 