"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import getCookies from "@/utils/getCookies";
import MainPage from "@/pages/MainPage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Get the token from cookies on client side
    const cookies = getCookies(["token"]);
    const token = cookies.token;

    if (token) {
      // If token exists, redirect to dashboard
      router.push("/dashboard");
    }
    // else do nothing, show landing page
  }, [router]);

  return (
    <div>
      <MainPage />
    </div>
  );
}
