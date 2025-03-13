'use client'

import Image from 'next/image'

export default function Introduction() {
  return (
    <>
        <div className="mb-10 md:mb-16 lg:mb-20 md:max-w-3xl md:mx-auto lg:text-center">
          <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-black mb-1 md:mb-2">NEXTART COMMUNITY</h2>
          <p className="text-xl md:text-2xl font-semibold mb-1 md:mb-2">aims to build</p>
          <p className="text-[#FF3B30] font-semibold text-2xl md:text-3xl">a decentralized</p>
          <p className="text-[#FF3B30] font-semibold text-2xl md:text-3xl">business platform,</p>
          <p className="text-[#FF3B30] font-semibold text-2xl md:text-3xl">offering sustainable</p>
          <p className="text-[#FF3B30] font-semibold text-2xl md:text-3xl">opportunities</p>
          <p className="text-[#FF3B30] font-semibold text-2xl md:text-3xl">and fair rewards for creativity.</p>
        </div>

        {/* 主要图形元素区域 */}
        <div className="relative h-[340px] md:h-[420px] lg:h-[500px] w-full max-w-5xl mx-auto">
          {/* 左侧橙色角色 */}
          <div className="absolute left-[-30px] md:left-[0px] lg:left-[50px] top-[-80px] md:top-[-50px] w-[150px] md:w-[180px] lg:w-[200px]">
            <Image
              src="/landingpage/introduction/xiaoren.png"
              alt="左侧角色"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>

          {/* 右上角红色六边形和白色角色 */}
          <div className="absolute top-[-50px] md:top-[-30px] right-[5px] md:right-[50px] lg:right-[100px] z-10">
            <div className="relative">
              <Image
                src="/landingpage/introduction/red.png"
                alt="红色装饰"
                width={160}
                height={180}
                className="object-contain md:w-[180px] md:h-[200px] lg:w-[200px] lg:h-[220px]"
              />
            </div>
          </div>

          {/* 中间黄色GET YOUR COMMUNITY NFT */}
          <div className="absolute left-[60%] md:left-1/2 top-[-48px] md:top-[0px] transform -translate-x-1/2 z-20 w-[380px] h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
            <Image
              src="/landingpage/introduction/communitynft.png"
              alt="云朵背景"
              fill
              className="object-contain"
            />
          </div>

          {/* 左下角白色角色 */}
          <div className="absolute bottom-[30px] md:bottom-[50px] left-[-20px] md:left-[20px] lg:left-[80px] z-20">
            <Image
              src="/landingpage/introduction/white.png"
              alt="角色"
              width={130}
              height={130}
              className="object-contain md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]"
            />
          </div>

          {/* 粉色底部装饰 */}
          <div className="absolute bottom-[30px] md:bottom-[50px] right-[-10px] md:right-[20px] lg:right-[80px] z-0">
            <Image
              src="/landingpage/introduction/pink.png"
              alt="粉色装饰"
              width={250}
              height={300}
              className="object-contain md:w-[280px] md:h-[330px] lg:w-[320px] lg:h-[380px]"
            />
          </div>

          {/* 黄色圆形装饰 - 右侧 */}
          <div className="absolute top-[55px] md:top-[100px] right-[-110px] md:right-[-50px] lg:right-[0px] z-0">
            <div className="w-[167px] h-[167px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] bg-[#FFFC26] rounded-full opacity-40"></div>
          </div>

        </div>
    </>
  );
} 