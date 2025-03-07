"use client";

import { useRouter } from "next/navigation";

export const CourseCard = () => {
  const navigation = useRouter();
  return (
    <div
      className="border border-light-gray w-full h-auto rounded-md cursor-pointer aspect-square"
      onClick={() => navigation.push("/course")}
    />
  );
};
