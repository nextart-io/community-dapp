'use client'

import PricingBanner from './PricingBanner'
import PricingOptions from './PricingOptions'

interface PricingOption {
  id: string;
  title: string;
  highlightedText: string;
  regularText: string;
  imageSrc: string;
}

interface PricingContentProps {
  pricingOptions: PricingOption[];
  onGetIt: (optionId: string) => void;
}

export default function PricingContent({ pricingOptions, onGetIt }: PricingContentProps) {
  return (
    <main className="pt-0 md:pt-20 overflow-visible">      
      <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* 移动端布局 - 垂直排列 */}
        <div className="md:hidden">
          {/* 顶部NFT横幅 */}
          <PricingBanner />

          {/* NFT选项列表 */}
          <PricingOptions options={pricingOptions} onGetIt={onGetIt} />
        </div>

        {/* 桌面端布局 - 横向排列 */}
        <div className="hidden md:flex md:flex-row md:gap-6 md:items-start mt-[23px]">
          {/* 左侧NFT横幅 */}
          <div className="md:w-1/2 lg:w-3/5">
            <PricingBanner />
          </div>

          {/* 右侧NFT选项列表 */}
          <div className="md:w-1/2 lg:w-2/5">
            <PricingOptions options={pricingOptions} onGetIt={onGetIt} />
          </div>
        </div>
      </div>
    </main>
  );
} 