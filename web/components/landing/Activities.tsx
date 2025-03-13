'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ActivityItem {
  id: number;
  title: string;
  dateRange: string;
  type: 'upcoming' | 'oncoming' | 'past';
  color?: string;
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
      type: 'oncoming',
      color: 'from-blue-400 to-blue-600'
    },
    { 
      id: 2, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming',
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 3, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 4, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming',
      color: 'from-red-400 to-red-600'
    },
    { 
      id: 5, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'oncoming',
      color: 'from-purple-400 to-purple-600'
    },
    { 
      id: 6, 
      title: 'Web3 Co-learning', 
      dateRange: '2024.10.11~2024.11.16', 
      type: 'past',
      color: 'from-green-400 to-green-600'
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
    <div className="mb-8 md:mb-16 lg:mb-20 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* 标题部分 */}
      <div className="bg-black text-white py-4 px-5 md:py-6 rounded-t-3xl md:rounded-none">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-wide">ACTIVITES</h2>
            <div className="bg-[#FFFC26] rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
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
          <div className="flex justify-between text-lg md:text-xl font-bold md:justify-start md:space-x-16 lg:space-x-24">
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
      </div>
      
      {/* 活动内容 */}
      <div className="bg-black pt-6 pb-10 px-5 md:py-8 lg:py-10 relative min-h-[320px] md:min-h-[250px] rounded-b-3xl md:rounded-none">
        <div className="max-w-7xl mx-auto relative md:px-6 lg:px-8">
          {/* 左右导航箭头 */}
          <button 
            className="absolute left-2 md:left-5 top-1/2 transform -translate-y-1/2 text-white text-4xl md:text-5xl z-10"
            onClick={handlePrevPage}
          >
            &lt;
          </button>
          
          {/* 移动端使用垂直堆叠布局 */}
          <div className="space-y-5 md:hidden">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-center transition-transform hover:scale-105">
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

          {/* 桌面端使用水平轮播布局 */}
          <div className="hidden md:flex md:space-x-6 md:overflow-x-hidden">
            {filteredActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="min-w-[220px] relative rounded-3xl overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-80`}>
                  <div className="absolute inset-0 bg-[url('/landingpage/activites/icon.png')] bg-cover mix-blend-overlay"></div>
                </div>
                <div className="relative p-5 text-white">
                  <h3 className="text-2xl font-bold">{activity.title}</h3>
                  <p className="text-base mt-2">{activity.dateRange}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="absolute right-2 md:right-5 top-1/2 transform -translate-y-1/2 text-white text-4xl md:text-5xl z-10"
            onClick={handleNextPage}
          >
            &gt;
          </button>
          
          {/* 分页指示器 */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <div 
                key={index} 
                className={`w-4 h-4 md:w-3 md:h-3 rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-white' : 'bg-gray-600'}`}
                onClick={() => setCurrentPage(index + 1)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 