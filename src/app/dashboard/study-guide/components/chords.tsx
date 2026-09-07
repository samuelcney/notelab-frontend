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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { ALL_NOTES, CHORDS_PROGRESSION, CHORDS_TYPES } from "@/utils/Constants";
import { Piano, Volume2 } from "lucide-react";
import { useState } from "react";

export const Chords = () => {
  const [selectedKey, setSelectedKey] = useState("C");
  const [selectedChord, setSelectedChord] = useState(CHORDS_TYPES.triads[0]);

  type Chord = {
    name: string;
    symbol: string;
    formula: string;
    example: string;
    notes: string[];
  };

  const transposeChord = (chord: Chord, fromKey: string, toKey: string) => {
    const fromIndex = ALL_NOTES.indexOf(fromKey);
    const toIndex = ALL_NOTES.indexOf(toKey);
    const interval = (toIndex - fromIndex + 12) % 12;

    return {
      ...chord,
      example: chord.example.replace(fromKey, toKey),
      notes: chord.notes.map((note: string) => {
        const noteIndex = ALL_NOTES.indexOf(note.replace(/[♭#]/g, ""));
        const newIndex = (noteIndex + interval) % 12;
        return ALL_NOTES[newIndex];
      }),
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Piano className="w-5 h-5 text-green-600" />
            Selecione a Tonalidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
            {ALL_NOTES.map((key) => (
              <Button
                key={key}
                className={
                  selectedKey === key
                    ? "bg-green-600 text-white"
                    : "text-foreground border border-border bg-background"
                }
                onClick={() => setSelectedKey(key)}
                size="sm"
              >
                {key}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="triads" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="triads">Tríades</TabsTrigger>
          <TabsTrigger value="sevenths">Acordes com 7ª</TabsTrigger>
          <TabsTrigger value="extensions">Extensões</TabsTrigger>
        </TabsList>

        <TabsContent value="triads" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CHORDS_TYPES.triads.map((chord, index) => {
              const transposedChord = transposeChord(chord, "C", selectedKey);
              return (
                <Card
                  key={index}
                  className={`cursor-pointer transition-shadow hover:shadow-md ${
                    selectedChord.name === chord.name
                      ? "ring-2 ring-green-500"
                      : ""
                  }`}
                  onClick={() => setSelectedChord(transposedChord)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`${
                        selectedChord.name === chord.name
                          ? `text-green-700`
                          : ""
                      }`}
                    >
                      {transposedChord.example}
                    </CardTitle>
                    <CardDescription>{chord.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1 text-foreground">
                        Fórmula:
                      </div>
                      <Badge variant="outline" className="border-border">
                        {chord.formula}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1 text-foreground">
                        Notas:
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {transposedChord.notes.map(
                          (note: string, noteIndex: number) => (
                            <Badge
                              key={noteIndex}
                              className="bg-foreground text-background"
                            >
                              {note}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="sevenths" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CHORDS_TYPES.sevenths.map((chord, index) => {
              const transposedChord = transposeChord(chord, "C", selectedKey);
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`${
                        selectedChord.name === chord.name
                          ? `text-green-700`
                          : ""
                      }`}
                    >
                      {transposedChord.example}
                    </CardTitle>
                    <CardDescription>{chord.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1 text-foreground">
                        Fórmula:
                      </div>
                      <Badge variant="outline" className="border-border">
                        {chord.formula}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1 text-foreground">
                        Notas:
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {transposedChord.notes.map(
                          (note: string, noteIndex: number) => (
                            <Badge
                              key={noteIndex}
                              className="bg-foreground text-background"
                            >
                              {note}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="extensions" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CHORDS_TYPES.extensions.map((chord, index) => {
              const transposedChord = transposeChord(chord, "C", selectedKey);
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle
                      className={`${
                        selectedChord.name === chord.name
                          ? `text-green-700`
                          : ""
                      }`}
                    >
                      {transposedChord.example}
                    </CardTitle>
                    <CardDescription>{chord.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1 text-foreground">
                        Fórmula:
                      </div>
                      <Badge variant="outline" className="border-border">
                        {chord.formula}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1 text-foreground">
                        Notas:
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {transposedChord.notes.map(
                          (note: string, noteIndex: number) => (
                            <Badge
                              key={noteIndex}
                              className="bg-foreground text-background"
                            >
                              {note}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-green-600" />
            Progressões Harmônicas em {selectedKey}
          </CardTitle>
          <CardDescription>
            Progressões populares transpostas para a tonalidade selecionada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {CHORDS_PROGRESSION.map((progression, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg border-border"
              >
                <h4 className="font-semibold mb-2 text-foreground">
                  {progression.name}
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  {progression.description}
                </p>
                <div className="flex gap-2 mb-3">
                  {progression.chords.map((chord, chordIndex) => (
                    <Badge
                      key={chordIndex}
                      variant="outline"
                      className="border-border"
                    >
                      {chord
                        .replace("C", selectedKey)
                        .replace(
                          "F",
                          ALL_NOTES[(ALL_NOTES.indexOf(selectedKey) + 5) % 12]
                        )
                        .replace(
                          "G",
                          ALL_NOTES[(ALL_NOTES.indexOf(selectedKey) + 7) % 12]
                        )
                        .replace(
                          "Am",
                          ALL_NOTES[(ALL_NOTES.indexOf(selectedKey) + 9) % 12] +
                            "m"
                        )
                        .replace(
                          "Dm",
                          ALL_NOTES[(ALL_NOTES.indexOf(selectedKey) + 2) % 12] +
                            "m"
                        )}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
