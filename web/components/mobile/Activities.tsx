'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ActivityItem {
  id: number;
  title: string;
  dateRange: string;
  type: 'upcoming' | 'oncoming' | 'past';
}

export default function Activities() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'oncoming' | 'past'>('oncoming');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  // 示例活动数据
  const activities: ActivityItem[] = [
    { 
      id: 1, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'upcoming'
    },
    { 
      id: 2, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming'
    },
    { 
      id: 3, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming'
    },
    { 
      id: 4, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming'
    },
    { 
      id: 5, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming'
    },
    { 
      id: 6, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'past'
    },
  ];

  // 过滤活动数据
  const filteredActivities = activities.filter(item => item.type === activeTab);
  
  // 处理翻页
  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="rounded-3xl overflow-hidden mb-8">
      {/* 标题部分 */}
      <div className="bg-black text-white py-4 px-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl font-black tracking-wide">ACTIVITES</h2>
          <div className="bg-[#FFFC26] rounded-full w-12 h-12 flex items-center justify-center">
            <Image 
              src="/landingpage/activites/solar_list-bold-duotone.png"
              alt="menu icon"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
        
        {/* 选项卡 */}
        <div className="flex justify-between text-lg font-bold">
          <button 
            className={`transition-colors ${activeTab === 'upcoming' ? 'text-[#FFEE32]' : 'text-[#8A891B]'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            UPCOMING
          </button>
          <button 
            className={`transition-colors ${activeTab === 'oncoming' ? 'text-[#FFEE32]' : 'text-[#8A891B]'}`}
            onClick={() => setActiveTab('oncoming')}
          >
            ONCOMING
          </button>
          <button 
            className={`transition-colors ${activeTab === 'past' ? 'text-[#FFEE32]' : 'text-[#8A891B]'}`}
            onClick={() => setActiveTab('past')}
          >
            PAST
          </button>
        </div>
      </div>
      
      {/* 活动内容 */}
      <div className="bg-black pt-6 pb-10 px-5 relative">
        {/* 左右导航箭头 */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl"
          onClick={handlePrevPage}
        >
          &lt;
        </button>
        
        <div className="space-y-5">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <div className="mr-4">
                <Image 
                  src="/landingpage/activites/icon.png" 
                  alt="活动图标" 
                  width={80} 
                  height={80} 
                  className="object-contain"
                />
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-bold">{activity.title}</h3>
                <p className="text-xl">{activity.dateRange}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl"
          onClick={handleNextPage}
        >
          &gt;
        </button>
        
        {/* 分页指示器 */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <div 
              key={index} 
              className={`w-4 h-4 rounded-full ${currentPage === index + 1 ? 'bg-white' : 'bg-gray-600'}`}
              onClick={() => setCurrentPage(index + 1)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
} 