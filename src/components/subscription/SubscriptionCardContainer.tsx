"use client";

import { StripeProductData } from "@/lib/stripe/types/StripeProductData";
import SubscriptionCard from "./SubscriptionCard";

export default function SubscriptionCardContainer({
  products,
}: {
  products: StripeProductData[];
}) {
  return (
    <>
    {products.map((product: StripeProductData) => {
      return <SubscriptionCard key={product.id} product={product} />;
    })}
    </>
  );


}
