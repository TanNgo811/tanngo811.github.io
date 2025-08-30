"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/data-access/app.state";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    // Redirect based on user authentication status
    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [user, router]);

  // Return null or a loading spinner while redirecting
  return null;
}
