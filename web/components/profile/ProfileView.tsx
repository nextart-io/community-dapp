'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import { useState } from 'react'

// 导入组件
import Header from '../landing/Header'
import Footer from '../landing/Footer'
import Donate from '../landing/Donate'
import WalletModal from '../landing/WalletModal'
import MenuModal from '../landing/MenuModal'
import ProfileCard from './ProfileCard'
import MintProjects from './MintProjects'
import ProfileEditModal from './ProfileEditModal'

interface ProfileViewProps {
  userObjects: CategorizedObjects | null;
}

export default function ProfileView({ userObjects }: ProfileViewProps) {
  console.log("userObjects", userObjects);
  // 移动端逻辑
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [username, setUsername] = useState('NEXTART');
  const [twitterAccount, setTwitterAccount] = useState('');
  const [bio] = useState('');
  const [avatarUrl] = useState('/profile/avatar.png');
  const [showEditForm, setShowEditForm] = useState(false);
  
  // 使用钩子获取当前连接的账户
  const currentAccount = useCurrentAccount();

  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleSaveProfile = () => {
    if (currentAccount) {
      setShowWalletPopup(false);
      console.log("保存资料", {
        wallet: currentAccount.address,
        username,
        twitter: twitterAccount,
        bio,
        avatarUrl
      });
      setShowEditForm(false);
    } else {
      alert("请先连接钱包");
    }
  };

  return (
    <div className="relative min-h-screen bg-white font-sans">
      {/* 响应式Header组件 */}
      <Header 
        setShowMenuPopup={setShowMenuPopup} 
        setShowWalletPopup={setShowWalletPopup} 
      />

      {/* 主要内容 - 响应式布局 */}
      <main className="pt-0 md:pt-20 overflow-visible">      
        <div className="px-3 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* 个人资料页面 */}
          <div className="py-8">
            {currentAccount ? (
              <div className="lg:flex lg:space-x-8 lg:items-start">
                {/* 左侧 - Mint项目 (桌面端) */}
                <div className="lg:flex-grow lg:w-2/3 order-2 lg:order-1">
                  {/* 在桌面端显示的Mint项目 */}
                  <div className="hidden lg:block">
                    <MintProjects />
                  </div>
                </div>
                
                {/* 右侧 - 个人资料卡片 (桌面端) */}
                <div className="lg:w-1/3 order-1 lg:order-2 lg:sticky lg:top-24">
                  <ProfileCard 
                    address={currentAccount.address}
                    username={username}
                    avatarUrl={avatarUrl}
                    onEditClick={() => setShowEditForm(true)}
                  />
                </div>
                
                {/* 移动端上下布局 - 仅在移动端显示Mint项目 */}
                <div className="lg:hidden mt-6 w-full">
                  <MintProjects />
                </div>
                
                {/* 个人资料编辑弹窗 */}
                <ProfileEditModal
                  username={username}
                  setUsername={setUsername}
                  twitterAccount={twitterAccount}
                  setTwitterAccount={setTwitterAccount}
                  address={currentAccount.address}
                  onSave={handleSaveProfile}
                  onCancel={() => setShowEditForm(false)}
                  isOpen={showEditForm}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">请先连接钱包以查看个人资料</p>
                <button
                  onClick={() => setShowWalletPopup(true)}
                  className="bg-[#FFEE32] px-8 py-3 rounded-xl font-bold hover:bg-[#F0E030] transition-colors"
                >
                  连接钱包
                </button>
              </div>
            )}
          </div>

          {/* 捐赠区域 */}
          <Donate />
        </div>
      </main>
      
      {/* 页脚 */}
      <Footer />

      {/* 弹窗组件 */}
      <MenuModal 
        showMenuPopup={showMenuPopup}
        setShowMenuPopup={setShowMenuPopup}
        setShowWalletPopup={setShowWalletPopup}
      />

      <WalletModal 
        showWalletPopup={showWalletPopup}
        setShowWalletPopup={setShowWalletPopup}
        setShowMenuPopup={setShowMenuPopup}
        formatAddress={formatAddress}
        username={username}
        setUsername={setUsername}
        twitterAccount={twitterAccount}
        setTwitterAccount={setTwitterAccount}
        handleSaveProfile={handleSaveProfile}
      />
    </div>
  );
}