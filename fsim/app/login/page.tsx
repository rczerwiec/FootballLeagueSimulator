"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";
import { isAuthSkipped, isAuthSkippedFromEnv } from "@/lib/auth/authConfig";
import LogIn from "@/features/login/LogIn";
import Spinner from "@/components/Spinner/Spinner";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    if (isAuthSkipped()) {
      router.replace("/kluby");
      return;
    }

    const auth = getClientAuth();
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/kluby");
    });
    return () => unsubscribe();
  }, [router]);

  if (!mounted) {
    return <Spinner />;
  }

  if (isAuthSkippedFromEnv() || isAuthSkipped()) {
    return <Spinner />;
  }

  return (
    <div className="AppFlex">
      <div className="Content">
        <LogIn onSkip={() => router.push("/kluby")} />
      </div>
    </div>
  );
}
