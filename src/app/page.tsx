"use client";
import { AuthLayout } from "@/components/AuthLayout/AuthLayout";
import { LoginLayout } from "@/components/AuthLayout/LoginLayout";
import ImageSlideshow from "@/components/ImageSlideshow/ImageSlideShow";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthView = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div
      className={`w-full flex ${
        isLogin ? "flex-row" : "flex-row-reverse"
      } h-screen relative`}
    >
      <div className="flex flex-1 relative">
        <ImageSlideshow />
      </div>
      <div className="flex-1 h-full bg-background flex items-center justify-center">
        {isLogin ? (
          <AuthLayout.Login ontoggle={toggleAuthView} />
        ) : (
          <AuthLayout.Register ontoggle={toggleAuthView} />
        )}
      </div>
    </div>
  );
}
