"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";
import { isAuthSkipped, isAuthSkippedFromEnv } from "@/lib/auth/authConfig";
import Navbar from "@/components/Navbar/Navbar";
import Spinner from "@/components/Spinner/Spinner";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [skipAuth, setSkipAuth] = useState(isAuthSkippedFromEnv());
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(
    isAuthSkippedFromEnv() ? true : undefined
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const skip = isAuthSkipped();
    setSkipAuth(skip);
    if (skip) {
      setLoggedIn(true);
      return;
    }

    const auth = getClientAuth();
    if (!auth) {
      setLoggedIn(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      if (!user && pathname !== "/login") {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router, pathname]);

  if (!mounted) {
    return <Spinner />;
  }

  if (!skipAuth && loggedIn === undefined) {
    return <Spinner />;
  }

  if (!skipAuth && !loggedIn) {
    return null;
  }

  return (
    <div className="AppFlex">
      <Navbar />
      <div className="Content">{children}</div>
    </div>
  );
}
