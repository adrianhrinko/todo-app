"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { db } from "@/lib/firebase/firebaseClient";
import getStripe from "@/lib/stripe/getStripe";
import {
  DocumentReference,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";

export default function PurchaseButton({
  buttonText,
  priceId,
  popular = false,
}: any) {
  const { currentUser, userRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [checkoutSessionDocRef, setCheckoutSessionDocRef] =
    useState<DocumentReference | null>(null);
  const router = useRouter();

  const onClickBuy = async () => {
    if (!currentUser) {
      router.push("/login?showPricing=true");
      return;
    }

    if (!priceId) return console.error("No priceId provided");

    const docRef = await addDoc(
      collection(db, "users", currentUser.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin + "/app/dashboard", // Redirect after successful payment
        cancel_url: window.location.origin + "/", // Redirect after cancellation
      }
    );

    setCheckoutSessionDocRef(docRef);
    setLoading(true);
  };

  useEffect(() => {
    if (!checkoutSessionDocRef) return;

    const unsubscribe = onSnapshot(checkoutSessionDocRef, async (doc) => {
      const data = doc.data();
      if (data?.sessionId) {
        setLoading(false);
        const stripe = await getStripe();
        if (!stripe) return setLoading(false);

        setCheckoutSessionDocRef(null);
        setLoading(false);
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      }
    });

    return () => unsubscribe();
  }, [checkoutSessionDocRef]);

  return (
    <button
      disabled={userRole === ""}
      onClick={onClickBuy}
      className={`btn ${popular ? "btn-primary" : "btn-secondary"}`}
    >
      {loading ? "Loading..." : buttonText}
    </button>
  );
}
