"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "@/redux/store";

export default function RoleProtectedRoute({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (!allowedRoles.includes(user.role)) {
      // Redirect to their own dashboard if they try to access another
      if (user.role === "admin") router.replace("/dashboard/admin");
      else if (user.role === "agent") router.replace("/dashboard/agent");
      else router.replace("/dashboard/customer");
    }
  }, [user, router, allowedRoles]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
