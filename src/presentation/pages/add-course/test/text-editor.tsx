"use client";

import { Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/presentation/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/presentation/ui/tabs";
import { Textarea } from "@/presentation/ui/textarea";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextEditor({ value, onChange }: TextEditorProps) {
  const [editorMode, setEditorMode] = useState<"visual" | "html">("visual");
  const [htmlContent, setHtmlContent] = useState(value);

  useEffect(() => {
    setHtmlContent(value);
  }, [value]);

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
    onChange(e.target.value);
  };

  const applyFormatting = (format: string) => {
    const editor = document.getElementById("visual-editor") as HTMLDivElement;
    if (!editor) return;

    document.execCommand(format, false);

    const newContent = editor.innerHTML;
    setHtmlContent(newContent);
    onChange(newContent);

    editor.focus();
  };

  const handleVisualEditorInput = () => {
    const editor = document.getElementById("visual-editor") as HTMLDivElement;
    if (!editor) return;

    setHtmlContent(editor.innerHTML);
    onChange(editor.innerHTML);
  };

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <Tabs
        value={editorMode}
        onValueChange={(v) => setEditorMode(v as "visual" | "html")}
        className="w-full"
      >
        <div className="bg-muted/50 border-b px-2 py-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => applyFormatting("bold")}
                disabled={editorMode === "html"}
              >
                <Bold className="h-4 w-4" />
                <span className="sr-only">Negrito</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => applyFormatting("italic")}
                disabled={editorMode === "html"}
              >
                <Italic className="h-4 w-4" />
                <span className="sr-only">Itálico</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => applyFormatting("underline")}
                disabled={editorMode === "html"}
              >
                <Underline className="h-4 w-4" />
                <span className="sr-only">Sublinhado</span>
              </Button>
              <span className="mx-2 text-muted-foreground">|</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => applyFormatting("insertUnorderedList")}
                disabled={editorMode === "html"}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">Lista não ordenada</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => applyFormatting("insertOrderedList")}
                disabled={editorMode === "html"}
              >
                <ListOrdered className="h-4 w-4" />
                <span className="sr-only">Lista ordenada</span>
              </Button>
            </div>
            <TabsList>
              <TabsTrigger value="visual">Visual</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
            </TabsList>
          </div>
        </div>
      </Tabs>

      <div className="flex-1 overflow-auto">
        <TabsContent
          value="visual"
          className="h-full m-0 data-[state=active]:flex-1"
        >
          <div
            id="visual-editor"
            contentEditable
            className="h-full min-h-[300px] p-4 focus:outline-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            onInput={handleVisualEditorInput}
          />
        </TabsContent>
        <TabsContent
          value="html"
          className="h-full m-0 data-[state=active]:flex-1"
        >
          <Textarea
            className="w-full h-full min-h-[300px] p-4 font-mono text-sm focus:outline-none resize-none"
            value={htmlContent}
            onChange={handleHtmlChange}
            placeholder="Digite ou cole o HTML aqui..."
          />
        </TabsContent>
      </div>
    </div>
  );
}
