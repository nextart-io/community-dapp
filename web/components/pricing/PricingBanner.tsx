'use client'

import Image from 'next/image'

export default function PricingBanner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-6 mt-6">
      <Image
        src="/pricing/NFT mobile.png"
        alt="GET YOUR COMMUNITY NFT"
        width={400}
        height={200}
        className="w-full object-cover rounded-2xl md:hidden"
      />
      <div className="hidden md:block relative rounded-2xl overflow-hidden">
        <div className="relative h-[400px] lg:h-[440px]">
          <Image
            src="/pricing/NFT desktop.png"
            alt="GET YOUR COMMUNITY NFT"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
} 