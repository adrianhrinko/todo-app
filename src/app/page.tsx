import StripePricingTable from "@/components/subscription/StripePricingTable";
import SubscriptionCardContainer from "@/components/subscription/SubscriptionCardContainer";
import { Button } from "@/components/ui/button";
import fetchStripeProducts from "@/lib/stripe/fetchStripeProducts";
import { Check,} from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function Home() {
  const { products } = await fetchStripeProducts();

  return (
    <main className="flex-1">
        <section className="w-full py-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to Acme Inc</h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We provide the best solutions for your business.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Check className="h-12 w-12" />
                <h2 className="text-2xl font-bold">Fast Delivery</h2>
                <p className="text-gray-500 dark:text-gray-400">We ensure quick delivery of our products.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Check className="h-12 w-12" />
                <h2 className="text-2xl font-bold">Secure Payment</h2>
                <p className="text-gray-500 dark:text-gray-400">We provide secure payment options for our customers.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Check className="h-12 w-12" />
                <h2 className="text-2xl font-bold">24/7 Support</h2>
                <p className="text-gray-500 dark:text-gray-400">We provide 24/7 support to all our customers.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">Pricing</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 mt-8">
              {products.length > 0 ? (
              <SubscriptionCardContainer
                products={products}
              />
              ) : (
                <p>No subscription plans available at the moment.</p>
              )}

              {/*
              This is an example of how to use the StripePricingTable component.
              <StripePricingTable
                pricingTableId="prctbl_1OgCflCLPADkTljcIdzPukni"
                publishableKey="pk_test_51NyS5wCLPADkTljcNsxH5B71sfFMfC1t47MFQv3JAcFWnV0yVBcfV6hvhR18igcbz1Y0IG79EtCA3vXoZ9Vjax6W008Q95NrMj"
              />*/}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Waiting List</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be the first to know when we launch new features and updates.
            </p>
            <form className="flex max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="rounded-r-none" />
              <Button type="submit" className="rounded-l-none">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>
  );
}

