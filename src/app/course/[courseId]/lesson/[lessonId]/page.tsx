"use client";
import { useLessonById } from "@/hooks/lessons/useLessonById";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function LessonPage() {
  const { lessonId } = useParams();

  const navigation = useRouter();

  const { data: lesson } = useLessonById(Number(lessonId));

  return (
    <div className="w-full max-h-screen flex items-center">
      <div className="flex flex-col h-full">
        <div
          className="w-full min-h-[50px] bg-dark-gray mb-4 flex items-center px-2"
          onClick={() => navigation.back()}
        >
          <ArrowLeft color="white" />
        </div>
        <div className="flex flex-col gap-4 px-3">
          <h1 className="text-2xl">{lesson?.title}</h1>
          <p>{lesson?.content}</p>
        </div>
      </div>
    </div>
  );
}
