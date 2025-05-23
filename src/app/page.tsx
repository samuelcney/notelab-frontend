"use client";
import { useCurrentUser } from "@/main/hooks/auth/use-current-user";
import { redirect } from "next/navigation";

export default function RedirectPage() {
  const user = useCurrentUser();

  const isLoggedIn = !!user;

  redirect(isLoggedIn ? "/dashboard/home" : "/login");
}
