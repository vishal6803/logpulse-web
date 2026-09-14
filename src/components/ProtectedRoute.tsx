"use client";

import { useAuth } from "@/hooks/queries/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/login"); // If no cookie/invalid, kick them out
    }
  }, [isLoading, isError, router]);

  if (isLoading) return <div>Checking Authorization...</div>;

  return data?.success ? <>{children}</> : null;
}
