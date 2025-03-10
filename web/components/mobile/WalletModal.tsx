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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-[20px] shadow-lg p-6 w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Add profile</h2>
        <p className="text-gray-500 mb-6">
          To get the community nft you first need to connect with the sui wallet and add your profile here. Click save when you're done.
        </p>
        
        <div className="mb-6">
          {currentAccount ? (
            <button 
              className="w-full py-3 px-4 text-lg font-bold rounded-full bg-[#E3F2FD] text-[#2D90EA] flex items-center justify-center"
              onClick={() => disconnectWallet()}
            >
              <Image 
                src="/sui.png" 
                alt="Sui" 
                width={24} 
                height={24} 
                className="mr-2" 
              />
              {formatAddress(currentAccount.address)}
            </button>
          ) : (
            <ConnectModal
              trigger={
                <button className="w-full py-3 px-4 text-lg font-bold rounded-full bg-[#2D90EA] text-white flex items-center justify-center">
                  <Image 
                    src="/sui.png" 
                    alt="Sui" 
                    width={24} 
                    height={24} 
                    className="mr-2" 
                  />
                  Connect With Sui Wallet
                </button>
              }
            />
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-xl font-medium text-gray-900 mb-1">Username</label>
            <input 
              type="text"
              placeholder="Nextart"
              className="w-full p-4 border border-gray-300 rounded-full text-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!currentAccount}
            />
          </div>
          
          <div>
            <label className="block text-xl font-medium text-gray-900 mb-1">Your X(Twitter) account</label>
            <input 
              type="text"
              placeholder="@nextart"
              className="w-full p-4 border border-gray-300 rounded-full text-lg"
              value={twitterAccount}
              onChange={(e) => setTwitterAccount(e.target.value)}
              disabled={!currentAccount}
            />
          </div>
        </div>
        
        <div className="mt-8 space-y-3">
          <button 
            className={`w-full py-4 rounded-full text-xl font-bold ${
              currentAccount ? 'bg-[#FFEE32]' : 'bg-gray-200 text-gray-500'
            }`}
            onClick={handleSaveProfile}
            disabled={!currentAccount}
          >
            Save
          </button>
          
          <button 
            className="w-full py-4 border border-gray-300 rounded-full text-xl font-bold"
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