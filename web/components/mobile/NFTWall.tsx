'use client'

import Image from 'next/image'
import { useState } from 'react'

interface NFTItem {
  id: number;
  price: string;
  name: string;
  address: string;
  likes: number;
  image?: string;
}

export default function NFTWall() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  // 示例NFT数据
  const nfts: NFTItem[] = [
    {
      id: 1,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    },
    {
      id: 2,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    },
    {
      id: 3,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    },
    {
      id: 4,
      price: "27.56",
      name: "Courtyard",
      address: "0xbb4..d387",
      likes: 999
    }
  ];
  
  return (
    <div className="mb-8">
      <div className="bg-black text-white p-4 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black">MEMEBERS NFT WALL</h2>
          <div className="bg-[#FFFC26] rounded-full w-12 h-12 flex items-center justify-center">
            <Image 
              src="/landingpage/activites/solar_list-bold-duotone.png" 
              alt="列表" 
              width={48} 
              height={48} 
              className="object-contain"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-black p-4 rounded-b-2xl">
        {/* 双列滚动区域 */}
        <div className="flex gap-3 h-[500px]">
          {/* 左列 - 向下滚动 */}
          <div 
            className="flex-1 overflow-hidden relative"
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
          >
            <div 
              className="space-y-3 animate-scroll-down"
              style={{
                animationPlayState: isHovered1 ? "paused" : "running"
              }}
            >
              {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                <NFTCard 
                  key={`nft-left-${nft.id}-${index}`} 
                  nft={nft} 
                />
              ))}
            </div>
          </div>

          {/* 右列 - 向上滚动 */}
          <div 
            className="flex-1 overflow-hidden relative"
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            <div 
              className="space-y-3 animate-scroll-up"
              style={{
                animationPlayState: isHovered2 ? "paused" : "running"
              }}
            >
              {[...nfts, ...nfts, ...nfts].map((nft, index) => (
                <NFTCard 
                  key={`nft-right-${nft.id}-${index}`} 
                  nft={nft} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* 底部说明文字 */}
        <div className="mt-6 bg-white rounded-3xl p-6 pb-4 text-center relative">
          <p className="text-sm leading-relaxed font-bold mb-16">
            Co-learning, co-creating,
            <br />
            and co-exhibiting
            <br />
            emphasize collaboration in learning,
            <br />
            creating, and showcasing.
            <br />
            Together,
            <br />
            they form a cycle that fosters innovation,
            <br />
            reflection, and sustainable practices.
          </p>
          <div className="absolute bottom-6 right-4 translate-y-1/3">
            <Image 
              src="/landingpage/mascot.png" 
              alt="Mascot" 
              width={120} 
              height={120} 
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface NFTCardProps {
  nft: NFTItem;
}

function NFTCard({ nft }: NFTCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      {/* NFT图片 */}
      <div className="relative aspect-square bg-white">
        <Image 
          src="/landingpage/star1.png"
          alt={`NFT ${nft.id}`}
          fill
          className="object-cover"
        />
      </div>
      
      {/* NFT信息 */}
      <div className="p-3 space-y-2">
        <div className="flex items-start gap-2">
          <Image 
            src="/landingpage/members/ethereum.png"
            alt="ETH"
            width={16}
            height={16}
            className="mt-1"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm">{nft.price}<sup>ETH</sup></span>
            <span className="text-xs text-gray-500">Recent Prices</span>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full mt-0.5"></div>
          <div className="flex flex-col">
            <span className="text-sm">{nft.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{nft.address}</span>
              <Image 
                src="/landingpage/members/tabler_copy.png"
                alt="Copy"
                width={12}
                height={12}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center bg-[#FFFC26] rounded-full py-1">
          <Image 
            src="/landingpage/members/like.png"
            alt="likes"
            width={16}
            height={16}
            className="mr-1"
          />
          <span className="text-sm font-medium">{nft.likes}</span>
        </div>
      </div>
    </div>
  );
} 