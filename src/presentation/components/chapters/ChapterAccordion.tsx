import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/presentation/ui/accordion";
import { Modules } from "@/types/types";

import { useRouter } from "next/navigation";

export const ChapterAccordion = ({
  courseId,
  chapterList,
  isPresentation,
}: {
  chapterList: Modules[];
  courseId: number;
  isPresentation?: boolean;
}) => {
  const navigation = useRouter();

  if (isPresentation) {
    return (
      <>
        {chapterList.map((item, index) => (
          <Accordion type="single" collapsible key={index} value={item.name}>
            <AccordionItem value={item.name} key={item.name}>
              <AccordionTrigger>{item.name}</AccordionTrigger>
              {item.lessons.map((lesson, i) => (
                <AccordionContent className="pl-3" key={i}>
                  - {lesson.title}
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        ))}
      </>
    );
  }
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
          <Accordion type="single" collapsible key={index} value={item.name}>
            <AccordionItem value={item.name} key={item.name}>
              <AccordionTrigger className="no-underline">
                {item.name}
              </AccordionTrigger>
              {item.lessons.map((lesson, i) => (
                <AccordionContent
                  className="pl-2 cursor-pointer hover:underline"
                  key={i}
                  onClick={() =>
                    navigation.replace(
                      `/dashboard/course/${courseId}/lesson/${lesson.id}?moduleId=${item.id}`
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
