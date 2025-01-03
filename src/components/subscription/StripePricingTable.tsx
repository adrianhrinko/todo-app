'use client';

import { useAuth } from '@/lib/context/AuthContext';
import React, { useEffect, useRef, useState } from 'react';

type StripePricingTableElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    'pricing-table-id': string;
    'publishable-key': string;
    'client-reference-id': string;
    'customer-session-client-secret': string;
  },
  HTMLElement
>;

declare global {
  interface JSX {
    IntrinsicElements: {
      'stripe-pricing-table': StripePricingTableElement;
    };
  }
}

interface StripePricingTableProps {
  pricingTableId: string;
  publishableKey: string;
}

const StripePricingTable: React.FC<StripePricingTableProps> = ({
  pricingTableId,
  publishableKey,
}) => {
  const { currentUser } = useAuth();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [customerSessionClientSecret, setCustomerSessionClientSecret] =
    useState<string | null>(null);

  const getCustomerSessionClientSecret = async () => {
    try {
      const response = await fetch('/api/stripe/customerSession');
      if (!response.ok) {
        throw new Error('Failed to fetch customer session');
      }
      const data = await response.json();
      setCustomerSessionClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error fetching customer session:', error);
    }
  };

  useEffect(() => {
    getCustomerSessionClientSecret();
  }, []);

  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/pricing-table.js';
      script.async = true;
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  if (!currentUser || !customerSessionClientSecret) {
    return <div>Please sign in to show embedded pricing table</div>;
  }

  return (
    <div className='w-full'>
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <stripe-pricing-table
              pricing-table-id="${pricingTableId}"
              publishable-key="${publishableKey}"
              client-reference-id="${currentUser?.uid ?? ''}"
              customer-session-client-secret="${customerSessionClientSecret}"
            ></stripe-pricing-table>
          `,
        }}
      />
    </div>
  );
};

export default StripePricingTable;
