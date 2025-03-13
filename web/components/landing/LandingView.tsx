'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import { useState } from 'react'

// 导入拆分后的组件
import Header from './Header'
import Introduction from './Introduction'
import Activities from './Activities'
import CoPartners from './CoPartners'
import NFTWall from './NFTWall'
import Donate from './Donate'
import Footer from './Footer'
import WalletModal from './WalletModal'
import MenuModal from './MenuModal'

interface ResponsiveViewProps {
  userObjects: CategorizedObjects | null;
}

export default function ResponsiveView({ userObjects }: ResponsiveViewProps) {
  // 移动端逻辑
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [username, setUsername] = useState('');
  const [twitterAccount, setTwitterAccount] = useState('');
  
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
        username: username,
        twitter: twitterAccount
      });
    } else {
      alert("请先连接钱包");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-sans">
      {/* 响应式Header组件 */}
      <Header 
        setShowMenuPopup={setShowMenuPopup} 
        setShowWalletPopup={setShowWalletPopup} 
      />

      {/* 主要内容 - 响应式布局 */}
      <main className="px-3 md:px-6 lg:px-8 pt-0 md:pt-20 max-w-7xl mx-auto">      
        {/* 移动端组件 - 适应更大屏幕 */}
        <div className={userObjects ? 'mt-8' : ''}>
          {/* 介绍区域 */}
          <Introduction />
          
          {/* 活动区域 */}
          <Activities />
          
          {/* 合作伙伴区域 */}
          <CoPartners />
          
          {/* NFT墙 */}
          <NFTWall />
          
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