'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { useSubscriptionModal } from '@/lib/context/SubscriptionModalContext';
import { Button } from '../ui/button';

export default function SubscriptionModalReminder() {
  const { userClaims } = useAuth();
  const { setShowSubscriptionModal } = useSubscriptionModal();

  if (userClaims?.role !== 'Free') {
    return null;
  }

  return (
    <Button
      variant='secondary'
      size='sm'
      onClick={() => {
        setShowSubscriptionModal(true);
      }}
    >
      Upgrade
    </Button>
  );
}
