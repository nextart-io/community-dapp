'use client'

import { ConnectButton } from '@mysten/dapp-kit'
import { CategorizedObjects, calculateTotalBalance, formatBalance } from '@/utils/assetsHelpers'

interface DesktopAssetViewProps {
  userObjects: CategorizedObjects | null;
}

export default function DesktopAssetView({ userObjects }: DesktopAssetViewProps) {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">Sui DApp</h1>
            <ConnectButton />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {userObjects ? (
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">资产概览</h2>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(userObjects.coins).map(([coinType, coins]) => {
                    const totalBalance = calculateTotalBalance(coins);
                    return (
                      <div key={coinType} className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {coinType.split('::').pop()}
                        </h3>
                        <p className="text-2xl font-bold mt-2">{formatBalance(totalBalance)}</p>
                        <p className="text-sm text-gray-500 mt-1">数量: {coins.length}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">其他对象</h2>
                <div className="space-y-4">
                  {Object.entries(userObjects.objects).map(([objectType, objects]) => (
                    <div key={objectType} className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {objectType.split('::').pop()}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        总数: {objects.length}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {objectType.split('::')[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              欢迎使用 Nextjs Sui Dapp
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              请连接钱包以查看你的资产
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 