'use client'
import { getUserProfile } from '@/contracts/query'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useEffect, useState } from 'react'
import { CategorizedObjects } from '@/utils/assetsHelpers'
import MobileAssetView from '@/components/mobile/AssetView'
import DesktopAssetView from '@/components/desktop/AssetView'
import { useDevice } from '@/hooks/useDevice'

export default function Home() {
  const account = useCurrentAccount();
  const [userObjects, setUserObjects] = useState<CategorizedObjects | null>(null);
  const { isMobile } = useDevice();

  useEffect(() => {
    async function fetchUserProfile() {
      if (account?.address) {
        try {
          const profile = await getUserProfile(account.address);
          setUserObjects(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    }

    fetchUserProfile();
  }, [account]);

  return (
    <div className="min-h-screen bg-gray-100">
      {isMobile ? (
        <MobileAssetView userObjects={userObjects} />
      ) : (
        <DesktopAssetView userObjects={userObjects} />
      )}
    </div>
  );
}
