'use client';

import { useEffect, useRef, useState } from 'react';
import SubscriptionCardContainer from './SubscriptionCardContainer';
import { StripeProductData } from '@/lib/stripe/types/StripeProductData';
import { useSubscriptionModal } from '@/lib/context/SubscriptionModalContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function SubscriptionModal({
  products,
}: {
  products: StripeProductData[];
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { showSubscriptionModal, setShowSubscriptionModal } =
    useSubscriptionModal();
  const [showPricing, setShowPricing] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pricing = localStorage.getItem('showPricing');
      if (!pricing) return;

      setShowPricing(pricing);
    }
  }, []);

  useEffect(() => {
    if (showPricing === 'true') {
      setShowSubscriptionModal(true);

      if (typeof window !== 'undefined') {
        localStorage.setItem('showPricing', 'false');
        setShowPricing('false');
      }
    }
  }, [showPricing]);

  useEffect(() => {
    if (showSubscriptionModal && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [showSubscriptionModal, modalRef]);

  return (
    <>
      <Dialog
        open={showSubscriptionModal}
        onOpenChange={(open) => setShowSubscriptionModal(open)}
      >
        <DialogContent className='sm:max-w-5xl'>
          <DialogHeader>
            <DialogTitle className='text-center'>Upgrade Now</DialogTitle>
          </DialogHeader>

          <SubscriptionCardContainer products={products} />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant='outline'
                onClick={() => setShowSubscriptionModal(false)}
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
