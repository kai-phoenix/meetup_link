"use client";

import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { ProfileImageLink } from "./ProfileImageLink";
import { useAuth } from "./AuthContext";

export function Header() {
  const { isLoggedIn } = useAuth();

  return (
    <header className="bg-cyan-500 px-4 py-4 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href={isLoggedIn ? "/events" : "/"} className="text-2xl font-bold text-white">
          Meetup Link
        </Link>
        {isLoggedIn && (
          <nav aria-label="ユーザーメニュー" className="flex items-center gap-4">
            <ProfileImageLink />
            <LogoutButton />
          </nav>
        )}
      </div>
    </header>
  );
}
