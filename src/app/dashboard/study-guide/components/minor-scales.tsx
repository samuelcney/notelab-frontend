"use client";

import { Badge } from "@/presentation/ui/badge";
import { Button } from "@/presentation/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { MINOR_SCALES, SCALE_TYPES } from "@/utils/Constants";
import { Music } from "lucide-react";
import { useState } from "react";

export const MinorScales = () => {
  const [selectedScale, setSelectedScale] = useState(MINOR_SCALES[0]);
  const [selectedType, setSelectedType] = useState("natural");

  const getCurrentNotes = () => {
    switch (selectedType) {
      case "harmonic":
        return selectedScale.harmonic;
      case "melodic":
        return selectedScale.melodic;
      default:
        return selectedScale.natural;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {SCALE_TYPES.map((scaleType) => (
          <Card
            key={scaleType.type}
            className={`cursor-pointer transition-all ${
              selectedType === scaleType.type ? "ring-2 ring-green-500" : ""
            }`}
            onClick={() => setSelectedType(scaleType.type)}
          >
            <CardHeader className="pb-3">
              <CardTitle className={`text-green-500 flex items-center gap-2`}>
                <Music className="w-4 h-4" />
                {scaleType.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-500">{scaleType.description}</p>
              <div className="flex flex-wrap gap-1">
                {scaleType.pattern.map((interval, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-foreground"
                  >
                    {interval}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            Escala de {selectedScale.key}{" "}
            {SCALE_TYPES.find((t) => t.type === selectedType)?.name}
          </CardTitle>
          <CardDescription>
            {SCALE_TYPES.find((t) => t.type === selectedType)?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {getCurrentNotes().map((note, index) => (
              <div key={index} className="text-center">
                <Badge className="mb-1 text-lg px-4 py-2 bg-foreground text-background">
                  {note}
                </Badge>
                <div className="text-xs text-gray-500">
                  {["i", "ii", "III", "iv", "v", "VI", "VII"][index]}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Comparação - {selectedScale.key} menor</CardTitle>
            <CardDescription>
              Veja as diferenças entre os três tipos de escalas menores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {SCALE_TYPES.map((scaleType) => (
                <div
                  key={scaleType.type}
                  className="p-4 border rounded-lg border-foreground"
                >
                  <h4 className={`font-semibold text-green-500 mb-2`}>
                    {scaleType.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(
                      selectedScale[
                        scaleType.type as keyof typeof selectedScale
                      ]
                    ) &&
                      (
                        selectedScale[
                          scaleType.type as keyof typeof selectedScale
                        ] as string[]
                      ).map((note: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-foreground"
                        >
                          {note}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Todas as Escalas Menores</CardTitle>
            <CardDescription>
              Selecione uma escala para explorar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {MINOR_SCALES.map((scale) => (
                <Button
                  key={scale.key}
                  variant={
                    selectedScale.key === scale.key ? "default" : "outline"
                  }
                  onClick={() => setSelectedScale(scale)}
                  className={`h-auto p-3 text-foreground border-foreground ${
                    selectedScale.key === scale.key
                      ? "bg-green-500 text-white"
                      : "border"
                  }`}
                >
                  {scale.key} menor
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
