'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
}

interface MintProjectsProps {
  projects?: Project[];
}

export default function MintProjects({ 
  projects = [
    { id: 1, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 2, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 3, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 4, title: "Create project", description: "Deploy your new project in one-click." },
    { id: 5, title: "Create project", description: "Deploy your new project in one-click." },
  ]
}: MintProjectsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  
  // 计算总页数
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // 获取当前页面显示的项目
  const currentProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  
  // 页面导航
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      {/* 项目卡片 */}
      <div className="space-y-4 mb-6">
        {currentProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center mb-3">
              {/* 占位图 */}
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                {project.imageUrl ? (
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
            </div>
            
            <button className="w-full bg-[#FFFC26] text-black py-3 rounded-full font-bold text-center">
              Mint
            </button>
          </div>
        ))}
      </div>
      
      {/* 分页控件 - 修改成与设计图一致的样式 */}
      <div className="flex items-center justify-center space-x-2 pb-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center ${currentPage === 1 ? 'text-gray-400' : 'text-black'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="text-sm text-gray-500">Previous</span>
        
        {/* 页码按钮 */}
        {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                currentPage === pageNumber
                  ? 'bg-white border border-gray-200 shadow-sm font-bold'
                  : 'text-gray-600'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        
        {/* 如果有更多页面，显示省略号 */}
        {totalPages > 3 && <span className="text-gray-600">...</span>}
        
        <span className="text-sm text-gray-500">Next</span>
        
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center ${currentPage === totalPages ? 'text-gray-400' : 'text-black'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}