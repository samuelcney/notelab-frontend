"use client";

import { useCourseStore } from "@/main/stores/courseStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/ui/card";
import { Checkbox } from "@/presentation/ui/checkbox";
import { Input } from "@/presentation/ui/input";
import { Label } from "@/presentation/ui/label";
import { RadioGroup, RadioGroupItem } from "@/presentation/ui/radio-group";
import { Separator } from "@/presentation/ui/separator";

export function CourseConfigForm() {
  const {
    course,
    setPrice,
    setPromotionalPrice,
    setIssueCertificate,
    setTypeCourse,
  } = useCourseStore();

  return (
    <Card className="mt-4 shadow-none">
      <CardHeader>
        <CardTitle>Configurações do Curso</CardTitle>
        <CardDescription>
          Configure as opções de disponibilidade, preço e certificação do seu
          curso.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Preço e Pagamento
          </h3>
          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Tipo de Curso</Label>
              <p className="text-sm text-muted-foreground">
                Defina se o curso será gratuito ou pago.
              </p>
            </div>
            <RadioGroup
              value={course.typeCourse}
              onValueChange={(value: "free" | "paid") => setTypeCourse(value)}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="freeCourse" />
                <Label htmlFor="free">Gratuito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="paid" />
                <Label htmlFor="paidCourse">Pago</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={course.price}
                onChange={(e) => setPrice(Number(e.target.value))}
                disabled={course.typeCourse === "free"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo-price">Preço Promocional (R$)</Label>
              <Input
                id="promo-price"
                type="number"
                placeholder="0.00"
                value={course.promotionalPrice}
                onChange={(e) => setPromotionalPrice(Number(e.target.value))}
                disabled={course.typeCourse === "free"}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Certificação</h3>
          <Separator />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="certificate"
              checked={course.issueCertificate}
              onCheckedChange={(checked) =>
                setIssueCertificate(checked as boolean)
              }
            />
            <div className="grid gap-1.5">
              <Label htmlFor="certificate">Emitir Certificado</Label>
              <p className="text-sm text-muted-foreground">
                Os alunos receberão um certificado ao concluir o curso.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
