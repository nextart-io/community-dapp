'use client'

import Image from 'next/image'

interface ProfileCardProps {
  address: string;
  username: string;
  avatarUrl?: string;
  totalCredits?: number;
  growthRate?: number;
  monthlyStats?: number[];
  onEditClick?: () => void;
}

export default function ProfileCard({
  address,
  username,
  avatarUrl = '/profile/avatar.png',
  totalCredits = 12345.67,
  growthRate = 20.1,
  monthlyStats = [20, 40, 30, 25, 35, 40, 45, 35, 40, 45, 50],
  onEditClick
}: ProfileCardProps) {
  
  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `0x${address.substring(0, 4)}_${address.substring(address.length - 4)}`;
  };

  return (
    <div className="w-full bg-black rounded-2xl p-5 text-white mb-8">
      <h2 className="text-xl font-bold mb-4">Profile&Event</h2>
      
      {/* 用户信息区域 */}
      <div className="flex flex-col items-center mb-5">
        {/* 头像 */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
          <Image 
            src={avatarUrl} 
            alt="Profile Avatar" 
            width={80} 
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* 用户名 */}
        <h3 className="text-xl font-bold mb-1">{username || 'NEXTART'}</h3>
        
        {/* 地址 */}
        <p className="text-sm text-gray-400 mb-3">@{username?.toLowerCase() || 'nextart'}</p>
        <div className="flex items-center mb-3">
          <Image 
            src="/profile/sui.png" 
            alt="SUI" 
            width={16} 
            height={16}
            className="mr-1"
          />
          <span className="text-sm text-blue-400">{formatAddress(address)}</span>
        </div>
        
        {/* 编辑按钮 */}
        <button 
          className="bg-[#FFFC26] text-black px-4 py-1 rounded-full font-medium text-sm mb-4"
          onClick={onEditClick}
        >
          Edit
        </button>
        
        {/* 总积分统计 */}
        <div className="w-full mb-1">
          <p className="text-sm text-gray-400">Total credits</p>
          <p className="text-3xl font-bold text-[#FFFC26]">{totalCredits.toLocaleString()}</p>
          <p className="text-sm text-green-400">+{growthRate}% from last month</p>
        </div>
        
        {/* 图表 */}
        <div className="w-full h-16 flex items-end justify-between mt-2">
          {monthlyStats.map((value, index) => (
            <div 
              key={index}
              className="bg-[#FFFC26] w-[7%]"
              style={{ height: `${value * 2}px` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}