import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Modules } from "@/types/CourseInterface";

export const ChapterAccordion = ({
  chapterList,
}: {
  chapterList: Modules[];
}) => {
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
              {item.lessons.map((lesson, ind) => (
                <AccordionContent className="pl-1" key={ind}>
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
