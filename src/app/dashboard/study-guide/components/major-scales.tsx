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
import { MAJOR_SCALES, SCALE_PATTERN } from "@/utils/Constants";
import { Piano } from "lucide-react";
import { useState } from "react";

export const MajorScales = () => {
  const [selectedScale, setSelectedScale] = useState(MAJOR_SCALES[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Piano className="w-5 h-5 text-green-600" />
            Padrão da Escala Maior
          </CardTitle>
          <CardDescription>
            Todas as escalas maiores seguem o mesmo padrão de intervalos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="flex flex-col mb-4">
              <h4 className="font-semibold text-foreground">
                Fórmula T-T-S-T-T-T-S:
              </h4>
              <h5 className="text-xs text-gray-500">(T: tom | S: semitom)</h5>
            </span>

            <div className="space-y-2">
              {SCALE_PATTERN.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2  rounded"
                >
                  <span className="text-sm text-foreground">
                    Grau {index + 1} → {index + 2 <= 7 ? index + 2 : 1}
                  </span>
                  <Badge
                    variant={step.interval === "T" ? "default" : "secondary"}
                    className={`${
                      step.interval === "T"
                        ? "bg-foreground text-background"
                        : "text-foreground bg-background"
                    }`}
                  >
                    {step.interval}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-green-600 mb-2">
              Graus da Escala:
            </h4>
            <div className="text-sm space-y-1">
              <div>I - Tônica</div>
              <div>II - Supertônica</div>
              <div>III - Mediante</div>
              <div>IV - Subdominante</div>
              <div>V - Dominante</div>
              <div>VI - Superdominante</div>
              <div>VII - Sensível</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Escala de {selectedScale.key} Maior</CardTitle>
          <CardDescription>
            {selectedScale.accidentals === "Nenhum acidente"
              ? selectedScale.accidentals
              : `Acidentes: ${selectedScale.accidentals}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedScale.notes.map((note, index) => (
              <div key={index} className="text-center">
                <Badge className="mb-1 text-lg px-4 py-2 bg-foreground text-background">
                  {note}
                </Badge>
                <div className="text-xs text-gray-500">
                  {["I", "II", "III", "IV", "V", "VI", "VII"][index]}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-3 bg-foreground rounded-lg">
              <h4 className="font-semibold text-green-600">
                Sustenidos: {selectedScale.sharps}
              </h4>
            </div>
            <div className="p-3 bg-foreground rounded-lg">
              <h4 className="font-semibold text-red-600">
                Bemóis: {selectedScale.flats}
              </h4>
            </div>
          </div>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Todas as Escalas Maiores</CardTitle>
              <CardDescription>
                Clique em uma escala para ver os detalhes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {MAJOR_SCALES.map((scale) => (
                  <Button
                    key={scale.key}
                    onClick={() => setSelectedScale(scale)}
                    className={`h-auto p-3 flex flex-col items-start border bg-background ${
                      selectedScale.key === scale.key
                        ? "bg-green-500 text-white"
                        : "border-border"
                    }`}
                  >
                    <div className="font-semibold text-foreground">
                      {scale.key} Maior
                    </div>
                    <div className="text-xs opacity-70 text-foreground">
                      {scale.sharps > 0 && `${scale.sharps}#`}
                      {scale.flats > 0 && `${scale.flats}b`}
                      {scale.sharps === 0 && scale.flats === 0 && "Natural"}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
