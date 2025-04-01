"use client";
import { useGetLessonsByModuleId } from "@/main/hooks/lessons/useGetLessonByModuleId";
import { useGetModuleById } from "@/main/hooks/modules/useGetModuleById";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function LessonPage() {
  const { lessonId, courseId } = useParams();

  const searchParams = useSearchParams();
  const moduleId = searchParams.get("moduleId");

  const navigation = useRouter();

  const { data: lessons } = useGetLessonsByModuleId(Number(moduleId));
  const { data: module } = useGetModuleById(Number(moduleId));

  return (
    <div className="max-w-[100vw] h-full flex items-center flex-col overflow-hidden">
      <div className="flex flex-col h-full w-full">
        <div className="w-full min-h-[80px] bg-dark-gray flex items-center px-5 gap-5 border-b">
          <ArrowLeft
            color="white"
            onClick={() => navigation.push(`/course/${courseId}`)}
            className="cursor-pointer"
          />

          <h1 className="text-white text-2xl">{module?.name}</h1>
        </div>

        <div className="flex w-full h-full">
          <div className="flex-1 h-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/-ElGAUrbqUY?si=6PcW-G184a39sowI"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="w-full min-h-[80px] bg-dark-gray" />
          </div>

          <div className="flex w-[35%] flex-col h-full bg-dark-gray overflow-y-auto">
            <div className="flex flex-col">
              {lessons?.map((lesson) => (
                <span
                  className="cursor-pointer hover:underline text-xl border-b-2 py-6 px-5 flex items-center gap-3 text-white"
                  key={lesson.id}
                  onClick={() =>
                    navigation.push(
                      `/course/${courseId}/lesson/${lesson.id}?moduleId=${moduleId}`
                    )
                  }
                >
                  <span
                    className="w-[6px] h-[6px] bg-white rounded-full"
                    key={lesson.title}
                  />
                  {lesson.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
