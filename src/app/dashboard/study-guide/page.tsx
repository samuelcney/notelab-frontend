"use client";

import { PageRoot } from "@/presentation/layout/PageRoot";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { Music, Piano, Volume2 } from "lucide-react";

import { Chords } from "./components/chords";
import { MajorScales } from "./components/major-scales";
import { MinorScales } from "./components/minor-scales";

export default function StudyGuidePage() {
  const tabs = [
    {
      value: "major-scale",
      label: "Escalas Maiores",
      icon: <Piano className="w-4 h-4" />,
    },
    {
      value: "minor-scales",
      label: "Escalas Menores",
      icon: <Music className="w-4 h-4" />,
    },
    {
      value: "chords",
      label: "Acordes Básicos",
      icon: <Volume2 className="w-4 h-4" />,
    },
  ];

  const tabsContent = [
    {
      value: "major-scale",
      component: <MajorScales />,
    },
    {
      value: "minor-scales",
      component: <MinorScales />,
    },
    {
      value: "chords",
      component: <Chords />,
    },
  ];

  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="min-h-screen bg-gradient-to-br p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Music className="w-8 h-8 text-green-600" />
                <h1 className="text-3xl md:text-4xl font-bold">
                  Guia de Estudo Musical
                </h1>
              </div>
              <p className="text-lg max-w-2xl mx-auto">
                Domine os fundamentos da teoria musical com este guia completo e
                interativo
              </p>
            </div>

            <Tabs defaultValue={tabs[0].value} className="w-full">
              <TabsList
                className="grid w-full grid-cols-2 md:grid-cols-3 h-auto p-1 bg-gray-300 backdrop-blur-sm"
                defaultValue={tabs[0].value}
              >
                {tabs.map((tab) => (
                  <TabsTrigger
                    value={tab.value}
                    key={tab.value}
                    className="flex flex-col gap-1 p-3 data-[state=active]:bg-green-600 data-[state=active]:text-white "
                  >
                    {tab.icon}
                    <span className="text-xs tracking-wide">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabsContent.map((content) => (
                <TabsContent
                  value={content.value}
                  key={content.value}
                  className="mt-6"
                >
                  {content.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </PageRoot>
  );
}
