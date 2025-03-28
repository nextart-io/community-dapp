'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Introduction() {
  return (
    <div className="mb-10 md:mb-16 lg:mb-24 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 md:px-6 lg:px-8">
        {/* 移动端布局：上下结构 */}
        <div className="md:hidden">
          <div className="mb-8">
            <h2 className="text-[28px] font-black mb-1">NEXTART COMMUNITY</h2>
            <p className="text-xl font-semibold mb-1">aims to build</p>
            <p className="text-[#FF3B30] font-semibold text-2xl">a decentralized</p>
            <p className="text-[#FF3B30] font-semibold text-2xl">business platform,</p>
            <p className="text-[#FF3B30] font-semibold text-2xl">offering sustainable</p>
            <p className="text-[#FF3B30] font-semibold text-2xl">opportunities</p>
            <p className="text-[#FF3B30] font-semibold text-2xl">and fair rewards for creativity.</p>
          </div>

          {/* 主要图形元素区域 - 移动端 */}
          <div className="relative h-[340px] w-full">
            {/* 左侧橙色角色 */}
            <div className="absolute left-[-30px] top-[-80px] w-[150px]">
              <Image
                src="/landingpage/introduction/xiaoren.png"
                alt="左侧角色"
                width={200}
                height={200}
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
              <Link href="/pricing" className="cursor-pointer">
                <Image
                  src="/landingpage/introduction/communitynft.png"
                  alt="云朵背景"
                  fill
                  className="object-contain"
                />
              </Link>
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
        </div>

        {/* 桌面端布局：左右结构 */}
        <div className="hidden md:flex items-center justify-between">
          {/* 左侧文字部分 */}
          <div className="md:w-[45%] lg:w-[40%] md:mt-8">
            <h2 className="md:text-left text-[36px] lg:text-[42px] font-black mb-2 lg:mb-3">NEXTART COMMUNITY</h2>
            <p className="md:text-left text-2xl lg:text-3xl font-semibold mb-2 lg:mb-3">aims to build</p>
            <div className="text-[#FF3B30] font-semibold md:text-left">
              <p className="text-3xl lg:text-4xl">a decentralized business platform,</p>
              <p className="text-3xl lg:text-4xl mt-1">offering sustainable opportunities</p>
              <p className="text-3xl lg:text-4xl mt-1">and fair rewards for creativity.</p>
            </div>
          </div>

          {/* 右侧图形元素区域 */}
          <div className="relative md:w-[55%] lg:w-[60%] md:h-[420px] lg:h-[520px]">
            {/* 左侧橙色角色 */}
            <div className="absolute md:left-[0] lg:left-[50px] md:top-[-50px] lg:top-[-30px] md:w-[180px] lg:w-[200px]">
              <Image
                src="/landingpage/introduction/xiaoren.png"
                alt="左侧角色"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>

            {/* 右上角红色六边形和白色角色 */}
            <div className="absolute md:top-[-30px] lg:top-[-20px] md:right-[50px] lg:right-[100px] z-10">
              <div className="relative">
                <Image
                  src="/landingpage/introduction/red.png"
                  alt="红色装饰"
                  width={180}
                  height={200}
                  className="object-contain md:w-[180px] md:h-[200px] lg:w-[220px] lg:h-[240px]"
                />
              </div>
            </div>

            {/* 中间黄色GET YOUR COMMUNITY NFT */}
            <div className="absolute md:left-[50%] md:top-[0] transform -translate-x-1/2 z-20 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
              <Link href="/pricing" className="cursor-pointer">
                <Image
                  src="/landingpage/introduction/communitynft.png"
                  alt="云朵背景"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>

            {/* 左下角白色角色 */}
            <div className="absolute md:bottom-[50px] lg:bottom-[70px] md:left-[20px] lg:left-[80px] z-20">
              <Image
                src="/landingpage/introduction/white.png"
                alt="角色"
                width={150}
                height={150}
                className="object-contain md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]"
              />
            </div>

            {/* 粉色底部装饰 */}
            <div className="absolute md:bottom-[50px] lg:bottom-[70px] md:right-[20px] lg:right-[80px] z-0">
              <Image
                src="/landingpage/introduction/pink.png"
                alt="粉色装饰"
                width={280}
                height={330}
                className="object-contain md:w-[280px] md:h-[330px] lg:w-[320px] lg:h-[380px]"
              />
            </div>

            {/* 黄色圆形装饰 - 右侧 */}
            <div className="absolute md:top-[100px] lg:top-[120px] md:right-[-50px] lg:right-[0] z-0">
              <div className="md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] bg-[#FFFC26] rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 