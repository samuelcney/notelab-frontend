"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export const ChapterAccordionSkeleton = () => {
  return (
    <Accordion type="single" collapsible>
      {[1, 2, 3].map((_, index) => (
        <AccordionItem key={index} value={`module-${index}`}>
          <AccordionTrigger>
            <Skeleton className="h-5 w-2/4" />
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 pl-1">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
