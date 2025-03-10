'use client'

import Image from 'next/image'

export default function Introduction() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-[28px] font-black mb-1 tracking-wide">NEXTART COMMUNITY</h2>
        <p className="text-xl mb-1">aims to build</p>
        <p className="text-[#FF3B30] font-semibold text-xl">a decentralized</p>
        <p className="text-[#FF3B30] font-semibold text-xl">business platform,</p>
        <p className="text-[#FF3B30] font-semibold text-xl">offering sustainable</p>
        <p className="text-[#FF3B30] font-semibold text-xl">opportunities</p>
        <p className="text-[#FF3B30] font-semibold text-xl">and fair rewards for creativity.</p>
      </div>
      
      {/* 主要图形元素 - 使用absolute定位完全匹配设计图 */}
      <div className="relative h-[500px] w-full">
        {/* 左侧自定义角色 */}
        <div className="absolute top-[50px] left-[-30px] z-10 w-[150px] h-[150px]">
          <Image 
            src="/landingpage/mascot.png" 
            alt="左侧角色" 
            width={150} 
            height={150} 
            className="object-contain"
          />
        </div>
        
        {/* 右上角人物和红色六边形组合 */}
        <div className="absolute top-[-30px] right-[-20px] z-10">
          <div className="relative">
            <Image 
              src="/landingpage/star1.png" 
              alt="红色装饰" 
              width={160} 
              height={160} 
              className="object-contain"
            />
            <div className="absolute top-[20px] left-[30px]">
              <Image 
                src="/landingpage/mascot.png" 
                alt="角色" 
                width={100} 
                height={100} 
                className="object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* 中间黄色GET YOUR COMMUNITY NFT云朵 */}
        <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 z-20">
          <div className="relative">
            <Image 
              src="/landingpage/getyourcommunitynft.png" 
              alt="云朵背景" 
              width={220} 
              height={220} 
              className="object-contain"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-xl font-black leading-tight">GET</p>
              <p className="text-xl font-black leading-tight">YOUR</p>
              <p className="text-xl font-black leading-tight">COMMUNITY</p>
              <p className="text-xl font-black leading-tight">NFT</p>
            </div>
          </div>
        </div>
        
        {/* 左下角小白人 */}
        <div className="absolute bottom-[40px] left-[10px] z-20">
          <Image 
            src="/landingpage/mascot.png" 
            alt="角色" 
            width={100} 
            height={100} 
            className="object-contain transform -rotate-12"
          />
        </div>
        
        {/* 粉色底部装饰 */}
        <div className="absolute bottom-0 right-0 z-0">
          <div className="w-[250px] h-[200px] bg-[#FFA69E] rounded-tl-[80px]"></div>
        </div>
        
        {/* 黄色圆形装饰 - 右侧 */}
        <div className="absolute top-[80px] right-[10px] z-0">
          <div className="w-[140px] h-[140px] bg-[#FFEE32] rounded-full opacity-40"></div>
        </div>
        
        {/* 黄色圆形装饰 - 右下角 */}
        <div className="absolute bottom-[20px] right-[230px] z-0">
          <div className="w-[80px] h-[80px] bg-[#FFEE32] rounded-full opacity-30"></div>
        </div>
        
        {/* 黑色箭头指向黄色区域 - 左侧箭头 */}
        <div className="absolute top-[200px] left-[30px] z-10 transform -rotate-12">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          </svg>
        </div>
        
        {/* 右下角箭头 */}
        <div className="absolute bottom-[100px] right-[60px] z-10 transform rotate-30">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          </svg>
        </div>
      </div>
    </>
  );
} 