'use client'

import { ConnectModal, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface WalletModalProps {
  showWalletPopup: boolean;
  setShowWalletPopup: Dispatch<SetStateAction<boolean>>;
  setShowMenuPopup: Dispatch<SetStateAction<boolean>>;
  formatAddress: (address: string) => string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  twitterAccount: string;
  setTwitterAccount: Dispatch<SetStateAction<string>>;
  handleSaveProfile: () => void;
}

export default function WalletModal({
  showWalletPopup,
  setShowWalletPopup,
  setShowMenuPopup,
  formatAddress,
  username,
  setUsername,
  twitterAccount,
  setTwitterAccount,
  handleSaveProfile
}: WalletModalProps) {
  const currentAccount = useCurrentAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  if (!showWalletPopup) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center md:items-center justify-center z-50">
      <div className="bg-white rounded-t-[20px] md:rounded-[30px] shadow-lg p-6 md:p-8 w-full md:w-[600px] lg:w-[700px] max-h-[90vh] md:max-h-[80vh] overflow-y-auto animate-slide-up md:animate-fade-in">
        <div className="flex justify-center mb-3 md:hidden">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Add profile</h2>
        <p className="text-gray-500 mb-6 md:text-lg">
          To get the community nft you first need to connect with the sui wallet and add your profile here. Click save when you're done.
        </p>
        
        <div className="mb-6 md:mb-8">
          {currentAccount ? (
            <button 
              className="w-full py-3 md:py-4 px-4 text-lg md:text-xl font-bold rounded-full bg-[#E3F2FD] text-[#2D90EA] flex items-center justify-center hover:bg-[#C1E1FC] transition-colors"
              onClick={() => disconnectWallet()}
            >
              <Image 
                src="/sui.png" 
                alt="Sui" 
                width={24} 
                height={24} 
                className="mr-2 md:mr-3 md:w-[28px] md:h-[28px]" 
              />
              {formatAddress(currentAccount.address)}
            </button>
          ) : (
            <ConnectModal
              trigger={
                <button className="w-full py-3 md:py-4 px-4 text-lg md:text-xl font-bold rounded-full bg-[#2D90EA] text-white flex items-center justify-center hover:bg-[#1B7CD0] transition-colors">
                  <Image 
                    src="/sui.png" 
                    alt="Sui" 
                    width={24} 
                    height={24} 
                    className="mr-2 md:mr-3 md:w-[28px] md:h-[28px]" 
                  />
                  Connect With Sui Wallet
                </button>
              }
            />
          )}
        </div>
        
        <div className="space-y-6 md:space-y-8">
          <div>
            <label className="block text-xl md:text-2xl font-medium text-gray-900 mb-1 md:mb-2">Username</label>
            <input 
              type="text"
              placeholder="Nextart"
              className="w-full p-4 md:p-5 border border-gray-300 rounded-full text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-[#2D90EA] focus:border-transparent transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!currentAccount}
            />
          </div>
          
          <div>
            <label className="block text-xl md:text-2xl font-medium text-gray-900 mb-1 md:mb-2">Your X(Twitter) account</label>
            <input 
              type="text"
              placeholder="@nextart"
              className="w-full p-4 md:p-5 border border-gray-300 rounded-full text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-[#2D90EA] focus:border-transparent transition-all"
              value={twitterAccount}
              onChange={(e) => setTwitterAccount(e.target.value)}
              disabled={!currentAccount}
            />
          </div>
        </div>
        
        <div className="mt-8 md:mt-10 space-y-3 md:space-y-4">
          <button 
            className={`w-full py-4 md:py-5 rounded-full text-xl md:text-2xl font-bold transition-colors ${
              currentAccount ? 'bg-[#FFEE32] hover:bg-[#F0E030]' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={handleSaveProfile}
            disabled={!currentAccount}
          >
            Save
          </button>
          
          <button 
            className="w-full py-4 md:py-5 border border-gray-300 rounded-full text-xl md:text-2xl font-bold hover:bg-gray-100 transition-colors"
            onClick={() => {
              setShowWalletPopup(false);
              setShowMenuPopup(true);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 