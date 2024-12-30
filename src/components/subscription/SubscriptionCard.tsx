'use client';

import { StripeProductData } from '@/lib/stripe/types/StripeProductData';
import PurchaseButton from './PurchaseButton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

/**
 * Adjust this map to match your plan names and product features you'd like to display
 */
const featuresMap: Record<string, string[]> = {
  Basic: ['Feature 1', 'Feature 2', 'Feature 3'],
  Premium: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
};

export default function SubscriptionCard({
  product,
}: {
  product: StripeProductData;
}) {
  const { id, name, metadata, price } = product;

  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{name || 'Loading...'}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-3xl font-bold'>
          {price?.formatted_price
            ? `${price.formatted_price}`
            : 'Loading price...'}
          <span className='text-sm font-normal'>/month</span>
        </p>
        <ul className='mt-4 space-y-2'>
          {featuresMap[name].map((feature: any, index: number) => (
            <li key={index} className='flex items-center'>
              <CheckCircle className='mr-2 size-4 text-primary' />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {price?.id && (
          <PurchaseButton
            priceId={price.id}
            buttonText={'Choose Plan'}
            popular={metadata.popular === 'true'}
          />
        )}
      </CardFooter>
    </Card>
  );
}
