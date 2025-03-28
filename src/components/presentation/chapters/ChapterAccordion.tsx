"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Modules } from "@/types/CourseInterface";
import { useRouter } from "next/navigation";

export const ChapterAccordion = ({
  courseId,
  chapterList,
}: {
  chapterList: Modules[];
  courseId: number;
}) => {
  const navigation = useRouter();
  return (
    <>
      {chapterList.length <= 0 ? (
        <div className="w-full h-full justify-center flex items-center">
          <p className="text-lg font-semibold">
            Ops... Parece que os módulos e aulas ainda não foram adicionados.
          </p>
        </div>
      ) : (
        chapterList.map((item, index) => (
          <Accordion type="single" collapsible key={index}>
            <AccordionItem value={item.name} key={item.name}>
              <AccordionTrigger>{item.name}</AccordionTrigger>
              {item.lessons.map((lesson, i) => (
                <AccordionContent
                  className="pl-2 cursor-pointer hover:underline"
                  key={i}
                  onClick={() =>
                    navigation.push(
                      `/course/${courseId}/lesson/${lesson.id}?moduleId=${item.id}`
                    )
                  }
                >
                  - {lesson.title}
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        ))
      )}
    </>
  );
};
