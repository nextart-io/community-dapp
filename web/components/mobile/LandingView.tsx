'use client'

import { useCurrentAccount } from '@mysten/dapp-kit'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import { useState, useEffect } from 'react'

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

interface MobileLandingViewProps {
  userObjects: CategorizedObjects | null;
}

export default function MobileLandingView({ userObjects }: MobileLandingViewProps) {
  const [showMenuPopup, setShowMenuPopup] = useState(false);
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [username, setUsername] = useState('');
  const [twitterAccount, setTwitterAccount] = useState('');
  
  // 使用钩子获取当前连接的账户
  const currentAccount = useCurrentAccount();

  // 处理地址显示格式
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // 当用户连接钱包并有资产数据时，显示个人资料弹窗
  useEffect(() => {
    if (userObjects && !showWalletPopup && !showMenuPopup) {
      setShowProfilePopup(true);
    }
  }, [userObjects, showWalletPopup, showMenuPopup]);

  const handleSaveProfile = () => {
    // 这里处理保存逻辑
    if (currentAccount) {
      setShowWalletPopup(false);
      // 可以在这里添加保存资料的API调用
      console.log("保存资料", {
        wallet: currentAccount.address,
        username: username,
        twitter: twitterAccount
      });
    } else {
      // 如果未连接钱包，提示用户先连接钱包
      alert("请先连接钱包");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-sans">
      {/* 顶部导航 */}
      <Header setShowMenuPopup={setShowMenuPopup} />

      {/* 主要内容 */}
      <main className="px-3 pt-0">
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
      </main>
      
      {/* 页脚 */}
      <Footer />

      {/* 菜单弹窗 */}
      <MenuModal 
        showMenuPopup={showMenuPopup}
        setShowMenuPopup={setShowMenuPopup}
        setShowWalletPopup={setShowWalletPopup}
      />

      {/* 钱包连接弹窗 */}
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