import Link from "next/link";
import UserAvatar from "./UserAvatar";

export default function Header() {
  return (
    <header className="border-b">
      <div className="w-full flex items-center justify-between py-4 px-6">
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold">
            Acme Inc
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6 flex-grow justify-center">
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Blog
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline" prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex-shrink-0">
          <UserAvatar />
        </div>
      </div>
    </header>
  );
}
