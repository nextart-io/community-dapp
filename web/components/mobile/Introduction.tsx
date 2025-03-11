'use client'

import Image from 'next/image'

export default function Introduction() {
  return (
    <>
        <div className="mb-10">
          <h2 className="text-[28px] font-black mb-1">NEXTART COMMUNITY</h2>
          <p className="text-xl font-semibold mb-1">aims to build</p>
          <p className="text-[#FF3B30] font-semibold text-2xl">a decentralized</p>
          <p className="text-[#FF3B30] font-semibold text-2xl">business platform,</p>
          <p className="text-[#FF3B30] font-semibold text-2xl">offering sustainable</p>
          <p className="text-[#FF3B30] font-semibold text-2xl">opportunities</p>
          <p className="text-[#FF3B30] font-semibold text-2xl">and fair rewards for creativity.</p>
        </div>

        {/* 主要图形元素区域 */}
        <div className="relative h-[340px] w-full">
          {/* 左侧橙色角色 */}
          <div className="absolute left-[-30px] top-[-80px] w-[150px]">
            <Image
              src="/landingpage/introduction/xiaoren.png"
              alt="左侧角色"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          {/* 右上角红色六边形和白色角色 */}
          <div className="absolute top-[-50px] right-[5px] z-10">
            <div className="relative">
              <Image
                src="/landingpage/introduction/red.png"
                alt="红色装饰"
                width={160}
                height={180}
                className="object-contain"
              />
            </div>
          </div>

          {/* 中间黄色GET YOUR COMMUNITY NFT */}
          <div className="absolute left-[60%] top-[-48px] transform -translate-x-1/2 z-20 w-[380px] h-[380px]">
            <Image
              src="/landingpage/introduction/communitynft.png"
              alt="云朵背景"
              fill
              className="object-contain"
            />
          </div>

          {/* 左下角白色角色 */}
          <div className="absolute bottom-[30px] left-[-20px] z-20">
            <Image
              src="/landingpage/introduction/white.png"
              alt="角色"
              width={130}
              height={130}
              className="object-contain"
            />
          </div>

          {/* 粉色底部装饰 */}
          <div className="absolute bottom-[30px] right-[-10px] z-0">
            <Image
              src="/landingpage/introduction/pink.png"
              alt="粉色装饰"
              width={250}
              height={300}
              className="object-contain"
            />
          </div>

          {/* 黄色圆形装饰 - 右侧 */}
          <div className="absolute top-[55px] right-[-110px] z-0">
            <div className="w-[167px] h-[167px] bg-[#FFFC26] rounded-full opacity-40"></div>
          </div>

        </div>
    </>
  );
} 