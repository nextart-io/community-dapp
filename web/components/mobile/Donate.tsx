'use client'

import Image from 'next/image'

export default function Donate() {
  // 捐赠地址
  const donationAddress = "0x3f4373c29de186e1ccebfb223fb4350e457cf689b08e60aadbc26e82ddbcd9a5";
  
  // 自动计算地址拆分点，确保地址平均分为两部分
  const midPoint = Math.ceil(donationAddress.length / 2);
  
  // 自动分割地址为两部分
  const addressFirstPart = donationAddress.substring(0, midPoint);
  const addressSecondPart = donationAddress.substring(midPoint);
  
  // 复制捐赠地址到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(donationAddress)
      .then(() => {
        alert('捐赠地址已复制到剪贴板');
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
  };
  
  return (
    <div className="mb-8 flex justify-center">
      <div className="bg-[#FFFC26] rounded-3xl p-3 overflow-hidden w-[400px] max-w-full">
        {/* 标题部分 */}
        <div className="flex items-center mb-4">
          <Image 
            src="/card-donateus/emoji-moneymouthface.png" 
            alt="Money Face" 
            width={40} 
            height={40} 
            className="mr-3"
          />
          <h3 className="text-2xl font-bold text-[#333]">DONATE US</h3>
        </div>
        
        {/* 地址部分 */}
        <div className="bg-[#3A3A00] text-white rounded-full py-3 px-4 flex items-center justify-between">
          <div className="flex items-center flex-1 min-w-0">
            <Image 
              src="/card-donateus/sui.png" 
              alt="Sui" 
              width={28} 
              height={28} 
              className="mr-2 flex-shrink-0"
            />
            <div className="text-xs leading-tight break-all mr-2 flex-1 min-w-0">
              <div>{addressFirstPart}</div>
              <div>{addressSecondPart}</div>
            </div>
            <button 
              onClick={copyToClipboard}
              className="flex-shrink-0 ml-1"
              aria-label="复制地址"
            >
              <Image 
                src="/card-donateus/Copy.png" 
                alt="Copy" 
                width={24} 
                height={24} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 