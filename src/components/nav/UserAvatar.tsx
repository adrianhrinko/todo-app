"use client";

import { useAuth } from "@/lib/context/AuthContext";
import signout from "@/lib/firebase/signout";
import Link from "next/link";
import SubscriptionModalReminder from "../subscription/SubscriptionModalReminder";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserAvatar() {
  const { currentUser, isLoadingAuth } = useAuth();
  const router = useRouter();

  if (isLoadingAuth) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  if (!currentUser) {
    return (
      <Link href="login">
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
          Login
        </button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          {currentUser.displayName && <span>{currentUser.displayName[0]}</span>}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end">
        <div className="mb-4 px-2">
          <SubscriptionModalReminder />
        </div>
        <DropdownMenuItem asChild>
          <Link href="/app/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/app/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            signout(async () => {
              router.push("/login");
            })
          }
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
