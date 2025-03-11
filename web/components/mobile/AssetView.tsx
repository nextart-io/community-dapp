'use client'

import { ConnectButton } from '@mysten/dapp-kit'
import { CategorizedObjects, calculateTotalBalance, formatBalance } from '@/utils/assetsHelpers'

interface MobileAssetViewProps {
  userObjects: CategorizedObjects | null;
}

export default function MobileAssetView({ userObjects }: MobileAssetViewProps) {
  return (
    <div className="space-y-4">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Sui DApp</h1>
        </div>
        <ConnectButton />
      </header>

      {userObjects ? (
        <>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">你的资产</h2>
            {Object.entries(userObjects.coins).map(([coinType, coins]) => {
              const totalBalance = calculateTotalBalance(coins);
              return (
                <div key={coinType} className="border-b py-2 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{coinType.split('::').pop()}</span>
                    <span className="font-medium">{formatBalance(totalBalance)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">其他对象</h2>
            <div className="space-y-2">
              {Object.entries(userObjects.objects).map(([objectType, objects]) => (
                <div key={objectType} className="border-b py-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{objectType.split('::').pop()}</span>
                    <span className="font-medium">{objects.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2">欢迎使用</h2>
          <p className="text-gray-600 mb-4">请连接钱包查看你的资产</p>
        </div>
      )}
    </div>
  );
} 