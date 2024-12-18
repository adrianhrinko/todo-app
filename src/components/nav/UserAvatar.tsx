"use client";

import { useAuth } from "@/lib/context/AuthContext";
import signout from "@/lib/firebase/signout";
import Link from "next/link";
import SubscriptionModalReminder from "../subscription/SubscriptionModalReminder";
import { useRouter } from "next/navigation";

export default function UserAvatar() {
  const { currentUser, isLoadingAuth } = useAuth();
  const router = useRouter();

  if (isLoadingAuth) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  if (!currentUser) {
    return (
      <Link href="login" className="btn btn-accent">
        <span>Login</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
        aria-haspopup="true"
      >
        {currentUser.displayName && <span>{currentUser.displayName[0]}</span>}
      </button>
      <div className="absolute right-0 mt-2 w-52 rounded-md border bg-popover p-2 shadow-lg">
        <div className="mb-4">
          <SubscriptionModalReminder />
        </div>
        <nav className="flex flex-col space-y-1">
          <Link 
            href="/app/dashboard"
            className="rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/app/settings" 
            className="rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Settings
          </Link>
          <button
            onClick={() =>
              signout(async () => {
                router.push("/login");
              })
            }
            className="text-left rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
